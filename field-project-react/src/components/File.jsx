// // import React, { useState } from 'react';
// // import axios from 'axios';

// // const FileUpload = () => {
// //   const [file, setFile] = useState(null); // To hold the selected file
// //   const [uploadStatus, setUploadStatus] = useState(''); // To display upload status
// //   const [extractedText, setExtractedText] = useState(''); // To display extracted text
// //   const [summary, setSummary] = useState(''); // To display summary

// //   // Handle file selection
// //   const handleFileChange = (event) => {
// //     setFile(event.target.files[0]);
// //     setUploadStatus(''); // Reset upload status
// //   };

// //   // Handle file upload
// //   const handleUpload = async () => {
// //     if (!file) {
// //       alert('Please select a file to upload!');
// //       return;
// //     }

// //     const formData = new FormData();
// //     formData.append('file', file);

// //     try {
// //       setUploadStatus('Uploading...');

// //       // Send the file to the backend API for processing
// //       const response = await axios.post('http://localhost:5000/upload', formData, {
// //         headers: {
// //           'Content-Type': 'multipart/form-data',
// //         },
// //       });

// //       // Display the result (extracted text) from the server
// //       setExtractedText(response.data.extractedText);
// //       setSummary(response.data.summary);
// //       setUploadStatus('File uploaded and processed successfully!');
// //     } catch (error) {
// //       console.error('Error uploading file:', error);
// //       setUploadStatus(`Failed to upload the file: ${error.message}`);
// //     }
// //   };

// //   return (
// //     <div className="p-6 bg-white rounded-lg shadow-md">
// //       <h2 className="text-2xl font-bold text-gray-800 mb-4">Upload a File</h2>

// //       {/* File Input */}
// //       <div className="mb-4">
// //         <input
// //           type="file"
// //           onChange={handleFileChange}
// //           accept=".png, .jpg, .jpeg" // Only allows PNG, JPG, and JPEG files
// //           className="block w-full text-sm text-gray-500
// //                      file:mr-4 file:py-2 file:px-4
// //                      file:rounded-full file:border-0
// //                      file:text-sm file:font-semibold
// //                      file:bg-blue-50 file:text-blue-700
// //                      hover:file:bg-blue-100"
// //         />
// //       </div>

// //       {/* Upload Button */}
// //       <button
// //         onClick={handleUpload}
// //         className="bg-blue-500 text-white px-6 py-2 rounded-lg shadow-md hover:bg-blue-600 transition duration-300"
// //       >
// //         Upload
// //       </button>

// //       {/* Upload Status */}
// //       {uploadStatus && (
// //         <div className="mt-4 p-3 text-sm rounded-lg bg-gray-50 border">
// //           {uploadStatus}
// //         </div>
// //       )}

// //       {/* Display Extracted Text */}
// //       {extractedText && (
// //         <div className="mt-4">
// //           <p className="font-semibold text-gray-800">Extracted Text from Image:</p>
// //           <div className="p-4 bg-gray-100 rounded-lg shadow-md overflow-auto max-h-60 border border-gray-300">
// //             <pre className="whitespace-pre-wrap text-gray-700">{extractedText}</pre>
// //           </div>
// //         </div>
// //       )}

// //       {/* Display Summary */}
// //       {summary && (
// //         <div className="mt-4">
// //           <p className="font-semibold text-gray-800">Summary:</p>
// //           <p className="p-4 bg-gray-100 rounded-lg shadow-md">{summary}</p>
// //         </div>
// //       )}
// //     </div>
// //   );
// // };

// // export default FileUpload;


// import React, { useState } from 'react';
// import axios from 'axios';

// const FileUpload = () => {
//   const [file, setFile] = useState(null); // To hold the selected file
//   const [uploadStatus, setUploadStatus] = useState(''); // To display upload status
//   const [extractedText, setExtractedText] = useState(''); // To display extracted text
//   const [summary, setSummary] = useState(''); // To display summary

//   // Handle file selection
//   const handleFileChange = (event) => {
//     setFile(event.target.files[0]);
//     setUploadStatus(''); // Reset upload status
//   };

//   // Handle file upload
//   const handleUpload = async () => {
//     if (!file) {
//       alert('Please select a file to upload!');
//       return;
//     }

//     const formData = new FormData();
//     formData.append('file', file);

//     try {
//       setUploadStatus('Uploading...');

//       // Send the file to the backend API for processing
//       const response = await axios.post('http://localhost:5000/upload', formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//       });

//       // Display the result (extracted text) from the server
//       setExtractedText(response.data.extractedText);
//       setSummary(response.data.summary);
//       setUploadStatus('File uploaded and processed successfully!');
//     } catch (error) {
//       console.error('Error uploading file:', error);
//       setUploadStatus(`Failed to upload the file: ${error.message}`);
//     }
//   };

//   return (
//     <div className="p-6 bg-white rounded-lg shadow-md">
//       <h2 className="text-2xl font-bold text-gray-800 mb-4">Upload a File</h2>

//       {/* File Input */}
//       <div className="mb-4">
//         <input
//           type="file"
//           onChange={handleFileChange}
//           accept=".png, .jpg, .jpeg" // Only allows PNG, JPG, and JPEG files
//           className="block w-full text-sm text-gray-500
//                      file:mr-4 file:py-2 file:px-4
//                      file:rounded-full file:border-0
//                      file:text-sm file:font-semibold
//                      file:bg-blue-50 file:text-blue-700
//                      hover:file:bg-blue-100"
//         />
//       </div>

//       {/* Upload Button */}
//       <button
//         onClick={handleUpload}
//         className="bg-blue-500 text-white px-6 py-2 rounded-lg shadow-md hover:bg-blue-600 transition duration-300"
//       >
//         Upload
//       </button>

//       {/* Upload Status */}
//       {uploadStatus && (
//         <div className="mt-4 p-3 text-sm rounded-lg bg-gray-50 border">
//           {uploadStatus}
//         </div>
//       )}

//       {/* Display Extracted Text */}
//       {extractedText && (
//         <div className="mt-4">
//           <p className="font-semibold text-gray-800">Extracted Text from Image:</p>
//           <div className="p-4 bg-gray-100 rounded-lg shadow-md overflow-auto max-h-60 border border-gray-300">
//             <pre className="whitespace-pre-wrap text-gray-700">{extractedText}</pre>
//           </div>
//         </div>
//       )}

//       {/* Display Summary */}
//       {summary && (
//         <div className="mt-4">
//           <p className="font-semibold text-gray-800">Summary:</p>
//           <p className="p-4 bg-gray-100 rounded-lg shadow-md">{summary}</p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default FileUpload;


import React, { useState } from 'react';
import axios from 'axios';

const FileUpload = () => {
  const [file, setFile] = useState(null); // To hold the selected file
  const [uploadStatus, setUploadStatus] = useState(''); // To display upload status
  const [extractedText, setExtractedText] = useState(''); // To display extracted text
  const [summary, setSummary] = useState(''); // To display the summary

  // Handle file selection
  const handleFileChange = (event) => {
    setFile(event.target.files[0]); // Save the selected file
    setUploadStatus(''); // Reset upload status
  };

  // Handle file upload
  const handleUpload = async () => {
    if (!file) {
      alert('Please select a file to upload!');
      return;
    }

    const formData = new FormData();
    formData.append('file', file); // Append the file to FormData

    try {
      setUploadStatus('Uploading...');

      // Send the file to the backend API for processing
      const response = await axios.post('http://localhost:5000/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      // Display the result (extracted text and summary) from Gemini API
      setExtractedText(response.data.extractedText);
      setSummary(response.data.summary);
      setUploadStatus('File uploaded and processed successfully!');
    } catch (error) {
      console.error('Error uploading file:', error);
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
        className="bg-blue-500 text-white px-6 py-2 rounded-lg shadow-md hover:bg-blue-600 transition duration-300"
      >
        Upload
      </button>

      {/* Upload Status */}
      {uploadStatus && (
        <div className="mt-4 p-3 text-sm rounded-lg bg-gray-50 border">
          {uploadStatus}
        </div>
      )}

      {/* Display Extracted Text and Summary */}
      

      {summary && (
        <div className="mt-4">
          <p className="font-semibold text-gray-800">Summary:</p>
          <div className="p-4 bg-gray-200 rounded-lg shadow-md overflow-auto max-h-60 border border-gray-300">
            <pre className="whitespace-pre-wrap text-gray-700">{summary}</pre>
          </div>
        </div>
      )}
    </div>
  );
};

export default FileUpload;
