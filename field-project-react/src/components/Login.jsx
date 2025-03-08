import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import {
  Activity,
  Heart,
  Upload,
  Brain,
  Menu,
  X,
  Sparkles,
} from "lucide-react";

const Login = (props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [loginError, setLoginError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    setLoading(true);
    setLoginError("");
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
      const user = userCredential.user;
      const userDocRef = doc(db, "users", user.uid);
      const userDocSnap = await getDoc(userDocRef);

      if (userDocSnap.exists()) {
        // Navigate to dashboard without passing state - we'll get it from AuthContext
        navigate("/dashboard");
      } else {
        console.log("No such document found!");
        setLoginError("User data not found. Please try again.");
      }
    } catch (error) {
      setLoginError("Invalid email or password. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-cyan-50 via-teal-100 to-blue-200 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTYiIGhlaWdodD0iMTAwIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxwYXRoIGQ9Ik0yOCA2NkwwIDUwTDAgMTZMMjggMEw1NiAxNkw1NiA1MEwyOCA2NkwyOCAxMDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzBEOUNCNyIgc3Ryb2tlLW9wYWNpdHk9IjAuMDUiIHN0cm9rZS13aWR0aD0iMiIvPjwvc3ZnPg==')] opacity-50"></div>

      <div className="relative bg-white/80 backdrop-blur-md p-8 rounded-3xl shadow-2xl w-full max-w-md transform transition-all hover:scale-[1.01] border border-teal-100">
        <div className="flex justify-center gap-3">
          <div className="relative self-center">
            <Heart className="h-8 w-8 text-accent-500 animate-float" />
            <Sparkles className="h-4 w-4 text-primary-500 absolute -top-1 -right-1" />
          </div>
          <h2 className="text-3xl font-bold text-center mb-6 bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent mt-4">
            Healthcare Portal
          </h2>
        </div>

        {loginError && (
          <div className="mb-4 p-3 bg-red-50/80 border-l-4 border-red-500 rounded">
            <p className="text-red-700 text-sm">{loginError}</p>
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div>
            <label className="block text-teal-900 font-medium mb-2">
              Email
            </label>
            <input
              type="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: "Enter a valid email address",
                },
              })}
              className={`w-full p-3 border rounded-xl bg-white/70 backdrop-blur-sm transition-all focus:ring-2 focus:ring-teal-400 ${
                errors.email ? "border-red-500" : "border-teal-100"
              }`}
              placeholder="Enter your email"
            />
            {errors.email && (
              <p className="mt-1 text-red-500 text-sm">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-teal-900 font-medium mb-2">
              Password
            </label>
            <input
              type="password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters long",
                },
              })}
              className={`w-full p-3 border rounded-xl bg-white/70 backdrop-blur-sm transition-all focus:ring-2 focus:ring-teal-400 ${
                errors.password ? "border-red-500" : "border-teal-100"
              }`}
              placeholder="Enter your password"
            />
            {errors.password && (
              <p className="mt-1 text-red-500 text-sm">
                {errors.password.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            className={`w-full p-3 rounded-xl text-white font-medium transition-all transform hover:translate-y-[-1px] ${
              loading
                ? "bg-gray-400"
                : "bg-gradient-to-r from-teal-500 to-cyan-600 hover:shadow-lg hover:shadow-teal-200"
            }`}
            disabled={loading}
          >
            {loading ? "Logging In..." : "Log In"}
          </button>

          <div className="text-center mt-6">
            <span className="text-teal-900">Don't have an account?</span>{" "}
            <a
              href="/signup"
              className="font-medium text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-cyan-600 hover:opacity-80 transition-opacity"
            >
              Sign Up
            </a>
          </div>
        </form>
        {/* Decorative bottom element */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-teal-500 via-cyan-500 to-teal-500 rounded-b-3xl"></div>
      </div>
    </div>
  );
};

export default Login;
