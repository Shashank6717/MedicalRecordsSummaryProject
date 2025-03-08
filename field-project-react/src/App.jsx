import "./App.css";
import "./index.css";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import MedicalHistory from "./components/MedicalHistory";
import PredictiveAnalytics from "./components/PredictiveAnalytics";
import Signup from "./components/Signup";
import Login from "./components/Login";
import HomePage from "./components/HomePage";
import { AuthProvider } from "./components/AuthContext"; // Import AuthProvider
import PrivateRouter from "./components/PrivateRouter"; // Import PrivateRouter
import PersonalInfo from "./components/personalInfo";

function App() {
  return (
    <AuthProvider>
      <Router>
        <div>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<HomePage />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/personal-info" element={<PersonalInfo />} />

            {/* Protected Routes */}
            <Route
              path="/dashboard"
              element={
                <PrivateRouter>
                  <Dashboard />
                </PrivateRouter>
              }
            />
            <Route
              path="/history"
              element={
                <PrivateRouter>
                  <MedicalHistory />
                </PrivateRouter>
              }
            />
            <Route
              path="/predictive"
              element={
                <PrivateRouter>
                  <PredictiveAnalytics />
                </PrivateRouter>
              }
            />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
