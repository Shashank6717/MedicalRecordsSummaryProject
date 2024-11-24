import './App.css'
import './index.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import MedicalHistory from './components/MedicalHistory';
import PredictiveAnalytics from './components/PredictiveAnalytics';
import Signup from './components/Signup';
import Login from './components/Login';
import HomePage from './components/HomePage';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          {/* Define routes for different pages */}
          <Route path="/" element={<HomePage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/history" element={<MedicalHistory />} />
          <Route path="/predictive" element={<PredictiveAnalytics />} />
          <Route path="/signup" element={<Signup/>}/>
          <Route path='/login' element={<Login/>}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;