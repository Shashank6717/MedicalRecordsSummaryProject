const express = require("express");
const multer = require("multer");
const cors = require("cors");
const path = require("path");
const dotenv = require("dotenv");
const { GoogleAIFileManager } = require("@google/generative-ai/server");
const { GoogleGenerativeAI } = require("@google/generative-ai");

// Load environment variables
dotenv.config();

// Setup for the server
const app = express();
const port = 5000;

// Enable CORS for all origins
app.use(cors());

// Create uploads directory if it doesn't exist
const fs = require("fs");
const uploadsDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}

// File upload setup with validation
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Folder to save the uploaded files
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // Save with a unique name
  },
});

// File filter function to allow only jpg, jpeg, png
const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpg|jpeg|png/;
  const fileType = allowedTypes.test(
    path.extname(file.originalname).toLowerCase()
  );

  if (fileType) {
    cb(null, true); // Accept the file
  } else {
    cb(new Error("Only .jpg, .jpeg, and .png files are allowed"), false); // Reject the file
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
});

// Get API key from environment variables
const API_KEY = process.env.GEMINI_API_KEY;
const fileManager = new GoogleAIFileManager(API_KEY);

// File upload endpoint for a single file
app.post("/upload", upload.single("file"), async (req, res) => {
  try {
    const file = req.file; // The uploaded file
    const filePath = file.path; // The path to the uploaded file
    const mimeType = file.mimetype;

    if (!file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    // Upload the file to Gemini's server
    const uploadResult = await fileManager.uploadFile(filePath, {
      mimeType,
      displayName: file.originalname,
    });

    // Process the image with Gemini Vision API
    const genAI = new GoogleGenerativeAI(API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const result = await model.generateContent([
      "Analyze this prescription meticulously and give me the details of the medicine and the dosage and also the health condition of the patient and the doctor's name and the date of the prescription keep the summary brief and intiuitive and concise and also it should give doctor the clear situation of the patient",
      {
        fileData: {
          fileUri: uploadResult.file.uri,
          mimeType,
        },
      },
    ]);

    // Extracted text from Gemini API response
    const extractedText = result.response.text();

    // Create a summary from the extracted text
    const summary = `Summary for ${file.originalname}: ${extractedText}`; // Simple example of truncating the text

    // Send response back to the client
    res.json({ extractedText, summary });
  } catch (error) {
    console.error("Error processing image:", error);
    res.status(500).json({ error: "An error occurred during processing." });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
  console.log(`API key loaded: ${API_KEY ? "Yes" : "No"}`);
});
