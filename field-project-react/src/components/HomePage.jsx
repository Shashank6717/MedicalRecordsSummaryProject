import React from 'react';
import { Activity, Heart, Upload, Brain, Menu, X, Sparkles } from 'lucide-react';
import {Link} from 'react-router-dom';

function App() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navigation */}
      <nav className="backdrop-blur-md bg-white/80 shadow-lg fixed w-full z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <div className="relative">
                <Heart className="h-8 w-8 text-accent-500 animate-float" />
                <Sparkles className="h-4 w-4 text-primary-500 absolute -top-1 -right-1" />
              </div>
              <span className="ml-2 text-xl font-bold bg-gradient-to-r from-primary-500 to-accent-500 text-transparent bg-clip-text">
                HealthCare+
              </span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-600 hover:text-primary-500 transition-colors">Home</Link>
            <Link to="/about" className="text-gray-600 hover:text-primary-500 transition-colors">About Us</Link>
            <Link to="/login" className="text-gray-600 hover:text-primary-500 transition-colors">Sign In</Link>
            <Link to="/signup" className="animated-gradient text-white px-6 py-2 rounded-full hover:shadow-lg transition-all duration-300">
              Sign Up
            </Link>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={toggleMenu}
                className="text-gray-600 hover:text-gray-900 focus:outline-none"
              >
                {isMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden backdrop-blur-md bg-white/90">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <a href="#" className="block px-3 py-2 text-gray-600 hover:text-primary-500">Home</a>
              <a href="#" className="block px-3 py-2 text-gray-600 hover:text-primary-500">About Us</a>
              <a href="#" className="block px-3 py-2 text-gray-600 hover:text-primary-500">Sign In</a>
              <a href="#" className="block px-3 py-2 text-accent-500 font-semibold">Sign Up</a>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="pt-28 pb-16 md:pt-36">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold hero-gradient mb-6 leading-tight">
              Your Health Journey<br />Starts Here
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Take control of your health with our comprehensive platform. Track, manage, and improve your wellbeing with AI-powered insights.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button className="animated-gradient text-white px-8 py-4 rounded-full hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
                Sign Up Now
              </button>
              <button className="px-8 py-4 rounded-full border-2 border-primary-500 text-primary-600 hover:bg-primary-50 transition-all duration-300 transform hover:-translate-y-1">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center hero-gradient mb-12">
            Why Choose HealthCare+
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="feature-card">
              <Activity className="h-12 w-12 text-primary-500 mb-4" />
              <h3 className="text-xl font-semibold mb-2 text-gray-800">Health Tracking</h3>
              <p className="text-gray-600">
                Monitor your vital signs, activities, and health metrics in real-time with our advanced tracking system.
              </p>
            </div>
            <div className="feature-card">
              <Upload className="h-12 w-12 text-accent-500 mb-4" />
              <h3 className="text-xl font-semibold mb-2 text-gray-800">Medical Records</h3>
              <p className="text-gray-600">
                Securely upload and manage your medical records in one centralized location.
              </p>
            </div>
            <div className="feature-card">
              <Brain className="h-12 w-12 text-primary-500 mb-4" />
              <h3 className="text-xl font-semibold mb-2 text-gray-800">AI Insights</h3>
              <p className="text-gray-600">
                Receive personalized health insights and recommendations powered by advanced AI technology.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white/80 backdrop-blur-md mt-auto border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <Heart className="h-6 w-6 text-accent-500" />
                <span className="ml-2 text-lg font-bold bg-gradient-to-r from-primary-500 to-accent-500 text-transparent bg-clip-text">
                  HealthCare+
                </span>
              </div>
              <p className="text-gray-600">
                Making healthcare management simple and accessible for everyone.
              </p>
            </div>
            <div>
              <h4 className="text-gray-900 font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-600 hover:text-primary-500">Home</a></li>
                <li><a href="#" className="text-gray-600 hover:text-primary-500">About Us</a></li>
                <li><a href="#" className="text-gray-600 hover:text-primary-500">Services</a></li>
                <li><a href="#" className="text-gray-600 hover:text-primary-500">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-gray-900 font-semibold mb-4">Legal</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-600 hover:text-primary-500">Privacy Policy</a></li>
                <li><a href="#" className="text-gray-600 hover:text-primary-500">Terms of Service</a></li>
                <li><a href="#" className="text-gray-600 hover:text-primary-500">Cookie Policy</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-gray-900 font-semibold mb-4">Contact Us</h4>
              <ul className="space-y-2">
                <li className="text-gray-600">support@healthcare-plus.com</li>
                <li className="text-gray-600">1-800-HEALTH-PLUS</li>
                <li className="text-gray-600">123 Healthcare Street</li>
                <li className="text-gray-600">Medical City, MC 12345</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-200 mt-8 pt-8 text-center text-gray-600">
            <p>&copy; {new Date().getFullYear()} HealthCare+. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
