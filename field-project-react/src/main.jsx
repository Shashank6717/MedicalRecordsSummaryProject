import { createRoot } from "react-dom/client";
import { AuthProvider } from "./components/AuthContext.jsx";
import App from "./App.jsx";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <App />
  </AuthProvider>
);
