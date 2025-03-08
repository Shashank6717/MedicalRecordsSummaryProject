import React, { useState } from "react";
import axios from "axios";

const FileUpload = () => {
  const [file, setFile] = useState(null); // To hold the selected file
  const [uploadStatus, setUploadStatus] = useState(""); // To display upload status
  const [summary, setSummary] = useState(""); // To display the summary
  const [showSummary, setShowSummary] = useState(false);

  // Function to format the summary text by removing markdown symbols
  const formatSummary = (text) => {
    if (!text) return "";

    // Remove markdown bold/italic symbols
    let formatted = text.replace(/\*\*/g, "");
    formatted = formatted.replace(/\*/g, "");

    // Remove markdown headers
    formatted = formatted.replace(/#{1,6}\s+/g, "");

    // Replace markdown lists with bullet points
    formatted = formatted.replace(/- /g, "• ");

    return formatted;
  };

  // Handle file selection
  const handleFileChange = (event) => {
    setFile(event.target.files[0]); // Save the selected file
    setUploadStatus(""); // Reset upload status
    setShowSummary(false);
  };

  // Handle file upload - keeping the Gemini AI analyzing functionality intact
  const handleUpload = async () => {
    if (!file) {
      alert("Please select a file to upload!");
      return;
    }

    const formData = new FormData();
    formData.append("file", file); // Append the file to FormData

    try {
      setUploadStatus("Uploading...");

      // Send the file to the backend API for processing
      const response = await axios.post(
        "http://localhost:5000/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      // Display the result from Gemini API
      setSummary(response.data.summary);
      setUploadStatus("File uploaded and processed successfully!");
      setShowSummary(true);
    } catch (error) {
      console.error("Error uploading file:", error);
      setUploadStatus(`Failed to upload the file: ${error.message}`);
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Upload a File</h2>

      {/* File Input */}
      <div className="mb-4">
        <input
          type="file"
          onChange={handleFileChange}
          accept=".png, .jpg, .jpeg" // Only allows PNG, JPG, and JPEG files
          className="block w-full text-sm text-gray-500
                     file:mr-4 file:py-2 file:px-4
                     file:rounded-full file:border-0
                     file:text-sm file:font-semibold
                     file:bg-blue-50 file:text-blue-700
                     hover:file:bg-blue-100"
        />
      </div>

      {/* Upload Button */}
      <button
        onClick={handleUpload}
        className="w-full bg-gradient-to-r from-green-600 to-teal-600 text-white px-4 py-2 rounded-lg hover:from-green-700 hover:to-teal-700 transition duration-300 shadow-md"
      >
        Quick Upload & Analyze
      </button>

      {/* Upload Status */}
      {uploadStatus && (
        <div className="mt-4 p-3 text-sm rounded-lg bg-gray-50 border">
          {uploadStatus}
        </div>
      )}

      {/* Show a brief summary if available */}
      {showSummary && summary && (
        <div className="mt-4">
          <p className="font-semibold text-gray-800">Quick Summary:</p>
          <div className="p-4 bg-gradient-to-r from-green-50 to-teal-50 rounded-lg text-sm text-gray-700 max-h-32 overflow-hidden border border-green-100">
            {formatSummary(summary).substring(0, 150)}...
            <div className="text-right mt-2">
              <span className="text-xs text-teal-600 italic">
                See full analysis in Predictive Analytics
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FileUpload;
