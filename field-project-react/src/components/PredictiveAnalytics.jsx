import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "./AuthContext";
import {
  Activity,
  FileText,
  Upload,
  Settings,
  ChartBar,
  Heart,
  Calendar,
  AlertCircle,
  LogOut,
} from "lucide-react";
import AnalysisComponent from "./AnalysisComponent";
import axios from "axios";

const PredictiveAnalytics = () => {
  const { user, userData, logout } = useAuth();
  const [file, setFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState("");
  const [extractedText, setExtractedText] = useState("");
  const [summary, setSummary] = useState("");

  // Handle file selection
  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
    setUploadStatus("");
  };

  // Handle file upload - keeping the Gemini AI analyzing functionality intact
  const handleUpload = async () => {
    if (!file) {
      alert("Please select a file to upload!");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

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

      // Display the result (extracted text and summary) from Gemini API
      setExtractedText(response.data.extractedText);
      setSummary(response.data.summary);
      setUploadStatus("File uploaded and processed successfully!");
    } catch (error) {
      console.error("Error uploading file:", error);
      setUploadStatus(`Failed to upload the file: ${error.message}`);
    }
  };

  if (!user || !userData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      {/* Sidebar */}
      <div className="w-64 bg-gradient-to-b from-indigo-600 to-blue-700 text-white shadow-xl fixed h-full">
        <div className="p-6 text-center border-b border-indigo-500/30">
          <Heart className="w-10 h-10 mx-auto mb-2 text-pink-300" />
          <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-100 to-pink-100">
            MediCare AI
          </h1>
        </div>
        <nav className="mt-8">
          <ul className="space-y-2 px-4">
            <li>
              <Link
                to="/dashboard"
                className="flex items-center gap-3 py-3 px-4 rounded-lg transition duration-300 ease-in-out hover:bg-white/10 group"
              >
                <Activity className="w-5 h-5 text-blue-200 group-hover:text-white" />
                <span>Dashboard</span>
              </Link>
            </li>
            <li>
              <Link
                to="/history"
                className="flex items-center gap-3 py-3 px-4 rounded-lg transition duration-300 ease-in-out hover:bg-white/10 group"
              >
                <FileText className="w-5 h-5 text-blue-200 group-hover:text-white" />
                <span>Medical History</span>
              </Link>
            </li>
            <li>
              <Link
                to="/predictive"
                className="flex items-center gap-3 py-3 px-4 rounded-lg bg-white/10 transition duration-300 ease-in-out group"
              >
                <ChartBar className="w-5 h-5 text-white" />
                <span>Predictive Analytics</span>
              </Link>
            </li>
            <li>
              <button
                onClick={logout}
                className="flex items-center gap-3 py-3 px-4 rounded-lg transition duration-300 ease-in-out hover:bg-white/10 group w-full text-left"
              >
                <LogOut className="w-5 h-5 text-blue-200 group-hover:text-white" />
                <span>Logout</span>
              </button>
            </li>
          </ul>
        </nav>
      </div>

      {/* Main Content */}
      <div className="ml-64 p-8">
        <header className="mb-10">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Predictive Analytics
          </h1>
          <p className="text-gray-600">
            Upload medical documents for AI-powered analysis
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Upload Section */}
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <div className="flex items-center gap-3 mb-4">
              <span className="p-2 bg-blue-100 rounded-lg">
                <Upload className="w-5 h-5 text-blue-600" />
              </span>
              <h3 className="text-xl font-semibold text-gray-800">
                Upload Medical Document
              </h3>
            </div>

            <div className="mb-4">
              <input
                type="file"
                onChange={handleFileChange}
                accept=".png, .jpg, .jpeg"
                className="block w-full text-sm text-gray-500
                         file:mr-4 file:py-2 file:px-4
                         file:rounded-full file:border-0
                         file:text-sm file:font-semibold
                         file:bg-blue-50 file:text-blue-700
                         hover:file:bg-blue-100"
              />
            </div>

            <button
              onClick={handleUpload}
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-2 rounded-lg shadow-md hover:from-blue-700 hover:to-indigo-700 transition duration-300"
            >
              Analyze Document
            </button>

            {uploadStatus && (
              <div className="mt-4 p-3 text-sm rounded-lg bg-gray-50 border">
                {uploadStatus}
              </div>
            )}
          </div>

          {/* Analysis Results Section */}
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <div className="flex items-center gap-3 mb-4">
              <span className="p-2 bg-purple-100 rounded-lg">
                <ChartBar className="w-5 h-5 text-purple-600" />
              </span>
              <h3 className="text-xl font-semibold text-gray-800">
                Analysis Results
              </h3>
            </div>

            {summary || extractedText ? (
              <AnalysisComponent
                summary={summary}
                extractedText={extractedText}
              />
            ) : (
              <div className="text-center py-8 text-gray-500">
                <p>Upload a document to see AI-powered analysis results</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PredictiveAnalytics;
