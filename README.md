# Healthcare Portal

A modern healthcare management system with AI-powered document analysis using Google's Gemini AI.

![Healthcare Portal](https://img.shields.io/badge/Healthcare-Portal-blue)
![React](https://img.shields.io/badge/Frontend-React-61DAFB)
![Firebase](https://img.shields.io/badge/Auth-Firebase-FFCA28)
![Express](https://img.shields.io/badge/Backend-Express-000000)
![Gemini AI](https://img.shields.io/badge/AI-Gemini-4285F4)

## 🌟 Features

- **User Authentication**: Secure login and registration with Firebase
- **Dashboard**: Personalized healthcare dashboard with key metrics
- **Medical History**: View and manage medical records
- **AI-Powered Document Analysis**: Upload and analyze medical documents using Google's Gemini AI
- **Predictive Analytics**: Advanced analysis of medical data
- **Responsive Design**: Beautiful UI that works on all devices

## 📋 Project Structure

```
Healthcare-Portal/
├── field-project-react/     # Frontend React application
│   ├── src/
│   │   ├── components/      # React components
│   │   ├── firebaseConfig.js # Firebase configuration
│   │   └── ...
│   └── ...
└── backend/                 # Backend Express server
    ├── index.js             # Main server file
    ├── uploads/             # Directory for uploaded files
    └── ...
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Firebase account
- Google Gemini API key

### Installation

#### Backend Setup

1. Navigate to the backend directory:

   ```
   cd backend
   ```

2. Install dependencies:

   ```
   npm install
   ```

3. Create a `.env` file in the backend directory with your Gemini API key:

   ```
   GEMINI_API_KEY=your_gemini_api_key_here
   ```

4. Start the backend server:
   ```
   npm start
   ```
   The server will run on http://localhost:5000

#### Frontend Setup

1. Navigate to the frontend directory:

   ```
   cd field-project-react
   ```

2. Install dependencies:

   ```
   npm install
   ```

3. Start the React development server:
   ```
   npm start
   ```
   The application will open in your browser at http://localhost:3000

## 🔧 Usage

### Authentication

- Register a new account or log in with existing credentials
- User data is securely stored in Firebase

### Dashboard

- View your health metrics and recent records
- Quick access to all features

### Medical History

- View your complete medical history
- Filter and search through records

### Document Analysis

- Upload medical documents (prescriptions, reports, etc.)
- AI-powered analysis provides detailed insights
- Two ways to analyze documents:
  - Quick analysis from the Dashboard
  - Detailed analysis in the Predictive Analytics section

### Predictive Analytics

- Upload documents for in-depth AI analysis
- View comprehensive results with formatted output

## 🔒 Security

- User authentication handled by Firebase
- API keys stored in environment variables
- Secure file upload with validation

## 🛠️ Technologies Used

### Frontend

- React.js
- React Router
- Firebase Authentication
- Tailwind CSS
- Lucide React (icons)

### Backend

- Express.js
- Multer (file uploads)
- Google Generative AI (Gemini)
- dotenv (environment variables)

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📞 Contact

If you have any questions or feedback, please reach out to us.

---

Made with ❤️ for better healthcare management
