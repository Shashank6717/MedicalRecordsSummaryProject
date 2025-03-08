import React from "react";

const AnalysisComponent = ({ summary, extractedText }) => {
  // Function to format the summary text by removing markdown symbols
  const formatSummary = (text) => {
    if (!text) return "";

    // Replace markdown bold/italic symbols
    let formatted = text.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
    formatted = formatted.replace(/\*(.*?)\*/g, "<em>$1</em>");

    // Replace markdown headers
    formatted = formatted.replace(/#{3,6}\s+(.*?)(?:\n|$)/g, "<h4>$1</h4>");
    formatted = formatted.replace(/#{2}\s+(.*?)(?:\n|$)/g, "<h3>$1</h3>");
    formatted = formatted.replace(/#{1}\s+(.*?)(?:\n|$)/g, "<h2>$1</h2>");

    // Replace markdown lists
    formatted = formatted.replace(/- (.*?)(?:\n|$)/g, "• $1\n");

    // Replace line breaks
    formatted = formatted.replace(/\n/g, "<br />");

    return formatted;
  };

  return (
    <div>
      {/* Display Summary from Gemini AI */}
      {summary && (
        <div className="mt-4">
          <p className="font-semibold text-gray-800 text-lg mb-2">Summary:</p>
          <div className="p-5 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg shadow-md overflow-auto max-h-[400px] border border-blue-100">
            <div
              className="text-gray-700 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: formatSummary(summary) }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default AnalysisComponent;
