import React, { useState } from 'react';
import { Link } from 'react-router-dom'; 
import { 
  Activity, 
  FileText, 
  Upload, 
  Settings, 
  ChartBar, 
  Heart, 
  Calendar,
  AlertCircle 
} from 'lucide-react';

const Dashboard = () => {
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
                className="flex items-center gap-3 py-3 px-4 rounded-lg transition duration-300 ease-in-out hover:bg-white/10 group"
              >
                <ChartBar className="w-5 h-5 text-blue-200 group-hover:text-white" />
                <span>Predictive Analytics</span>
              </Link>
            </li>
            <li>
              <Link
                to="/upload"
                className="flex items-center gap-3 py-3 px-4 rounded-lg transition duration-300 ease-in-out hover:bg-white/10 group"
              >
                <Upload className="w-5 h-5 text-blue-200 group-hover:text-white" />
                <span>Upload Records</span>
              </Link>
            </li>
            <li>
              <Link
                to="/settings"
                className="flex items-center gap-3 py-3 px-4 rounded-lg transition duration-300 ease-in-out hover:bg-white/10 group"
              >
                <Settings className="w-5 h-5 text-blue-200 group-hover:text-white" />
                <span>Settings</span>
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      {/* Main Content */}
      <div className="ml-64 p-8">
        <header className="mb-10 text-center">
          <div className="inline-flex items-center justify-center p-2 bg-blue-600/10 rounded-full mb-4">
            <Activity className="w-6 h-6 text-blue-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Welcome Back, Dr. Smith
          </h1>
          <p className="text-gray-600">
            Your medical dashboard is updated with the latest patient insights
          </p>
        </header>

        {/* Stats Overview */}
        <div className="grid grid-cols-3 gap-6 mb-8">
          <div className="bg-gradient-to-br from-pink-500 to-rose-500 p-6 rounded-2xl text-white shadow-lg">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-pink-100">Total Patients</p>
                <h3 className="text-3xl font-bold mt-1">1,234</h3>
              </div>
              <span className="bg-white/20 p-2 rounded-lg">
                <Heart className="w-6 h-6" />
              </span>
            </div>
          </div>
          <div className="bg-gradient-to-br from-blue-500 to-indigo-500 p-6 rounded-2xl text-white shadow-lg">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-blue-100">Appointments Today</p>
                <h3 className="text-3xl font-bold mt-1">28</h3>
              </div>
              <span className="bg-white/20 p-2 rounded-lg">
                <Calendar className="w-6 h-6" />
              </span>
            </div>
          </div>
          <div className="bg-gradient-to-br from-emerald-500 to-teal-500 p-6 rounded-2xl text-white shadow-lg">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-emerald-100">Critical Cases</p>
                <h3 className="text-3xl font-bold mt-1">5</h3>
              </div>
              <span className="bg-white/20 p-2 rounded-lg">
                <AlertCircle className="w-6 h-6" />
              </span>
            </div>
          </div>
        </div>

        {/* Cards Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Patient Records Card */}
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <div className="flex items-center gap-3 mb-4">
              <span className="p-2 bg-blue-100 rounded-lg">
                <FileText className="w-5 h-5 text-blue-600" />
              </span>
              <h3 className="text-xl font-semibold text-gray-800">Recent Patients</h3>
            </div>
            <div className="space-y-4">
              {[
                { name: 'John Doe', condition: 'Fever & Cold', date: '10/10/2024', status: 'Stable' },
                { name: 'Jane Smith', condition: 'Diabetes Checkup', date: '09/09/2024', status: 'Review' },
                { name: 'Mike Johnson', condition: 'Hypertension', date: '08/08/2024', status: 'Critical' }
              ].map((patient, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition duration-300">
                  <div>
                    <h4 className="font-medium text-gray-800">{patient.name}</h4>
                    <p className="text-sm text-gray-500">{patient.condition}</p>
                  </div>
                  <div className="text-right">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      patient.status === 'Critical' ? 'bg-red-100 text-red-600' :
                      patient.status === 'Review' ? 'bg-yellow-100 text-yellow-600' :
                      'bg-green-100 text-green-600'
                    }`}>
                      {patient.status}
                    </span>
                    <p className="text-xs text-gray-500 mt-1">{patient.date}</p>
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full mt-6 px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 transition duration-300 shadow-md">
              View All Records
            </button>
          </div>

          {/* Analytics Card */}
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <div className="flex items-center gap-3 mb-4">
              <span className="p-2 bg-purple-100 rounded-lg">
                <ChartBar className="w-5 h-5 text-purple-600" />
              </span>
              <h3 className="text-xl font-semibold text-gray-800">Analytics Overview</h3>
            </div>
            <div className="space-y-4">
              <div className="bg-gradient-to-r from-purple-500 to-indigo-500 p-4 rounded-xl text-white">
                <p className="text-purple-100">AI Predictions Accuracy</p>
                <h4 className="text-2xl font-bold mt-1">98.5%</h4>
              </div>
              <div className="bg-gradient-to-r from-pink-500 to-rose-500 p-4 rounded-xl text-white">
                <p className="text-pink-100">Patient Recovery Rate</p>
                <h4 className="text-2xl font-bold mt-1">94.2%</h4>
              </div>
            </div>
            <button className="w-full mt-6 px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 transition duration-300 shadow-md">
              View Analytics
            </button>
          </div>

          {/* Upload Card */}
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <FileUpload />
          </div>
        </div>
      </div>
    </div>
  );
};

const FileUpload = () => {
  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = () => {
    if (file) {
      console.log('Uploading file:', file.name);
      alert(`File "${file.name}" uploaded successfully!`);
    } else {
      alert('Please select a file to upload.');
    }
  };

  return (
    <>
      <div className="flex items-center gap-3 mb-4">
        <span className="p-2 bg-teal-100 rounded-lg">
          <Upload className="w-5 h-5 text-teal-600" />
        </span>
        <h3 className="text-xl font-semibold text-gray-800">Upload Records</h3>
      </div>
      
      <div className="mt-4 p-4 border-2 border-dashed border-gray-200 rounded-xl text-center">
        <input
          type="file"
          onChange={handleFileChange}
          className="hidden"
          id="file-upload"
        />
        <label
          htmlFor="file-upload"
          className="cursor-pointer block p-4 text-gray-600 hover:text-gray-800 transition duration-300"
        >
          <Upload className="w-8 h-8 mx-auto mb-2 text-gray-400" />
          <p className="font-medium">Click to upload</p>
          <p className="text-sm text-gray-500">or drag and drop files here</p>
        </label>
      </div>

      {file && (
        <div className="mt-4 p-3 bg-teal-50 rounded-lg">
          <p className="text-sm text-teal-600 font-medium">Selected: {file.name}</p>
        </div>
      )}

      <button
        onClick={handleUpload}
        className="w-full mt-6 px-4 py-2 bg-gradient-to-r from-teal-600 to-emerald-600 text-white rounded-lg hover:from-teal-700 hover:to-emerald-700 transition duration-300 shadow-md disabled:opacity-50"
        disabled={!file}
      >
        Upload Medical Records
      </button>
    </>
  );
};

export default Dashboard;
