// const express = require('express');
// const multer = require('multer');
// const cors = require('cors');
// const path = require('path');
// const axios = require('axios'); // For making HTTP requests
// const fs = require('fs'); // For handling file system operations

// // Setup for the server
// const app = express();
// const port = 5000;

// // Enable CORS for all origins (or restrict it to specific origins if needed)
// app.use(cors());

// // File upload setup with validation
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, 'uploads/'); // Folder to save the uploaded files
//   },
//   filename: function (req, file, cb) {
//     cb(null, Date.now() + path.extname(file.originalname)); // Save with a unique name
//   }
// });

// // File filter function to allow only jpg, jpeg, png
// const fileFilter = (req, file, cb) => {
//   const allowedTypes = /jpg|jpeg|png/;
//   const fileType = allowedTypes.test(path.extname(file.originalname).toLowerCase());

//   if (fileType) {
//     cb(null, true); // Accept the file
//   } else {
//     cb(new Error('Only .jpg, .jpeg, and .png files are allowed'), false); // Reject the file
//   }
// };

// const upload = multer({
//   storage: storage,
//   fileFilter: fileFilter
// });

// // Example API endpoint for Google Cloud Vision or Gemini
// const API_KEY = 'AIzaSyDLpPdodDU5zcwLmRIMDwukDnCs1dbX95g'; // Replace with your actual API Key
// // const API_URL = 'https://vision.googleapis.com/v1/images'; // Replace with actual endpoint
// const apiUrl = `https://vision.googleapis.com/v1/images:annotate?key=${API_KEY}`; // Replace with your actual API key


// // File upload endpoint
// app.post('/upload', upload.single('file'), async (req, res) => {
//   try {
//     const file = req.file;

//     if (!file) {
//       return res.status(400).json({ error: 'No file uploaded' });
//     }

//     const filePath = file.path; // The path to the uploaded file
//     const mimeType = file.mimetype; // MIME type of the uploaded file

//     console.log('File uploaded:', filePath);

//     // Step 1: Send the image to the API for processing
//     const formData = new FormData();
//     formData.append('file', fs.createReadStream(filePath)); // Attach the file to form data

//     // Create a proper API request payload (example for Google Vision)
//     const requestBody = {
//       requests: [
//         {
//           image: {
//             content: fs.readFileSync(filePath, 'base64') // Encode the image as base64
//           },
//           features: [
//             { type: 'TEXT_DETECTION', maxResults: 1 }
//           ]
//         }
//       ]
//     };

//     // Make an API request to send the image for processing
//     const apiResponse = await axios.post(API_URL, requestBody, {
//       headers: {
//         'Authorization': `Bearer ${API_KEY}`,
//         'Content-Type': 'application/json',
//       },
//     });

//     console.log('API Response:', apiResponse.data);

//     // Extract text from the API response (based on Google Vision response format)
//     const extractedText = apiResponse.data.responses[0]?.fullTextAnnotation?.text || 'No text extracted';

//     // Step 2: Return the extracted text and summary (optional)
//     const summary = extractedText.slice(0, 100) + '...'; // Creating a simple summary (first 100 characters)

//     res.json({
//       extractedText,
//       summary,
//     });

//   } catch (error) {
//     console.error('Error processing image:', error);
//     res.status(500).json({ error: 'An error occurred during processing.' });
//   }
// });

// // Start the server
// app.listen(port, () => {
//   console.log(`Server running at http://localhost:${port}`);
// });


const express = require('express');
const multer = require('multer');
const cors = require('cors');
const path = require('path');
const { GoogleAIFileManager } = require('@google/generative-ai/server');
const { GoogleGenerativeAI } = require('@google/generative-ai');

// Setup for the server
const app = express();
const port = 5000;

// Enable CORS for all origins
app.use(cors()); // This will allow all origins. You can restrict it to specific domains if needed.

// File upload setup with validation
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Folder to save the uploaded file
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // Save with a unique name
  }
});

// File filter function to allow only jpg, jpeg, png
const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpg|jpeg|png/;
  const fileType = allowedTypes.test(path.extname(file.originalname).toLowerCase());

  if (fileType) {
    cb(null, true); // Accept the file
  } else {
    cb(new Error('Only .jpg, .jpeg, and .png files are allowed'), false); // Reject the file
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter
});

// Replace this with your actual API key
const API_KEY = 'AIzaSyDLpPdodDU5zcwLmRIMDwukDnCs1dbX95g';
const fileManager = new GoogleAIFileManager(API_KEY);

// File upload endpoint for a single file
app.post('/upload', upload.single('file'), async (req, res) => {
  try {
    const file = req.file; // The uploaded file
    const filePath = file.path; // The path to the uploaded file
    const mimeType = file.mimetype;

    if (!file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    // Upload the file to Gemini's server
    const uploadResult = await fileManager.uploadFile(filePath, {
      mimeType,
      displayName: file.originalname,
    });

    // Process the image with Gemini Vision API
    const genAI = new GoogleGenerativeAI(API_KEY);
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    const result = await model.generateContent([
      'Tell me about this image.',
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
    const summary = `Summary for ${file.originalname}: ${extractedText.slice(0, 300)}...`; // Simple example of truncating the text

    // Send response back to the client
    res.json({ extractedText, summary });
  } catch (error) {
    console.error('Error processing image:', error);
    res.status(500).json({ error: 'An error occurred during processing.' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
