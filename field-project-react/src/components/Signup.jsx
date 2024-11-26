// import React, { useState } from 'react';
// import { useForm } from 'react-hook-form';
// import { createUserWithEmailAndPassword } from 'firebase/auth';
// import { auth, db } from '../firebaseConfig'; // Import Firestore configuration
// import { useNavigate } from 'react-router-dom';
// import { doc, setDoc } from 'firebase/firestore';

// const Signup = () => {
//   const {
//     register,
//     handleSubmit,
//     watch,
//     formState: { errors },
//   } = useForm();
//   const password = watch("password");
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   const onSubmit = async (data) => {
//     setLoading(true);
//     try {
//       // Create a user with email and password
//       const userCredential = await createUserWithEmailAndPassword(auth, data.email, data.password);
//       const user = userCredential.user;
//       const userId = user.uid;

//       // Store additional user details in Firestore
//       await setDoc(doc(db, 'users', userId), {
//         fullName: data.fullName,
//         email: data.email,
//         age: data.age, // You can add any other fields here
//       });

//       alert('Account created successfully!');
      
//       // Navigate to the dashboard and pass user data
//       navigate('/dashboard', { state: { name: data.fullName, age: data.age } });

//     } catch (error) {
//       alert(`Signup failed: ${error.message}`);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100">
//       <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
//         <h2 className="text-2xl font-bold text-center mb-4">Create an Account</h2>
//         <form onSubmit={handleSubmit(onSubmit)}>
//           {/* Full Name */}
//           <div className="mb-4">
//             <label className="block text-gray-700">Full Name</label>
//             <input
//               type="text"
//               {...register("fullName", {
//                 required: "Full name is required",
//               })}
//               className={`w-full p-2 border rounded ${errors.fullName ? "border-red-500" : "border-gray-300"}`}
//               placeholder="Enter your full name"
//             />
//             {errors.fullName && <p className="text-red-500 text-sm">{errors.fullName.message}</p>}
//           </div>

//           {/* Email */}
//           <div className="mb-4">
//             <label className="block text-gray-700">Email</label>
//             <input
//               type="email"
//               {...register("email", {
//                 required: "Email is required",
//                 pattern: {
//                   value: /\S+@\S+\.\S+/,
//                   message: "Enter a valid email address",
//                 },
//               })}
//               className={`w-full p-2 border rounded ${errors.email ? "border-red-500" : "border-gray-300"}`}
//               placeholder="Enter your email"
//             />
//             {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
//           </div>

//           {/* Password */}
//           <div className="mb-4">
//             <label className="block text-gray-700">Password</label>
//             <input
//               type="password"
//               {...register("password", {
//                 required: "Password is required",
//                 minLength: {
//                   value: 6,
//                   message: "Password must be at least 6 characters long",
//                 },
//               })}
//               className={`w-full p-2 border rounded ${errors.password ? "border-red-500" : "border-gray-300"}`}
//               placeholder="Enter a password"
//             />
//             {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
//           </div>

//           {/* Confirm Password */}
//           <div className="mb-4">
//             <label className="block text-gray-700">Confirm Password</label>
//             <input
//               type="password"
//               {...register("confirmPassword", {
//                 required: "Confirm password is required",
//                 validate: (value) => value === password || "Passwords do not match",
//               })}
//               className={`w-full p-2 border rounded ${errors.confirmPassword ? "border-red-500" : "border-gray-300"}`}
//               placeholder="Confirm your password"
//             />
//             {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword.message}</p>}
//           </div>

//           {/* Age */}
//           <div className="mb-4">
//             <label className="block text-gray-700">Age</label>
//             <input
//               type="number"
//               {...register("age", {
//                 required: "Age is required",
//                 min: {
//                   value: 1,
//                   message: "Age must be a positive number",
//                 },
//               })}
//               className={`w-full p-2 border rounded ${errors.age ? "border-red-500" : "border-gray-300"}`}
//               placeholder="Enter your age"
//             />
//             {errors.age && <p className="text-red-500 text-sm">{errors.age.message}</p>}
//           </div>

//           <button
//             type="submit"
//             className={`w-full text-white p-2 rounded transition duration-300 ${
//               loading ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600"
//             }`}
//             disabled={loading}
//           >
//             {loading ? 'Signing Up...' : 'Sign Up'}
//           </button>

//           <div className="text-center mt-4">
//             <span className="text-gray-600">Already have an account?</span>{' '}
//             <a href="/login" className="text-blue-500">Log In</a>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Signup;
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../firebaseConfig';
import { useNavigate } from 'react-router-dom';
import { doc, setDoc } from 'firebase/firestore';
import { Loader2, Mail, User, Lock, Calendar } from 'lucide-react';

const Signup = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const password = watch("password");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, data.email, data.password);
      const user = userCredential.user;
      const userId = user.uid;

      await setDoc(doc(db, 'users', userId), {
        fullName: data.fullName,
        email: data.email,
        age: data.age,
      });
      navigate('/dashboard', { state: { name: data.fullName, age: data.age } });
    } catch (error) {
      alert(`Signup failed: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="bg-white/80 backdrop-blur-lg p-8 rounded-2xl shadow-2xl w-full max-w-md border border-white/20">
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Create Account
          </h2>
          <p className="text-gray-600 mt-2">Join our community today</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Full Name Input */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <User className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              {...register("fullName", {
                required: "Full name is required",
              })}
              className={`w-full pl-10 pr-4 py-3 rounded-lg border ${
                errors.fullName 
                  ? "border-red-300 focus:border-red-500 focus:ring focus:ring-red-200" 
                  : "border-gray-200 focus:border-blue-500 focus:ring focus:ring-blue-200"
              } transition-all duration-200 bg-white/50`}
              placeholder="Full Name"
            />
            {errors.fullName && (
              <p className="mt-1 text-red-500 text-sm">{errors.fullName.message}</p>
            )}
          </div>

          {/* Email Input */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Mail className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: "Enter a valid email address",
                },
              })}
              className={`w-full pl-10 pr-4 py-3 rounded-lg border ${
                errors.email 
                  ? "border-red-300 focus:border-red-500 focus:ring focus:ring-red-200" 
                  : "border-gray-200 focus:border-blue-500 focus:ring focus:ring-blue-200"
              } transition-all duration-200 bg-white/50`}
              placeholder="Email Address"
            />
            {errors.email && (
              <p className="mt-1 text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>

          {/* Password Input */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Lock className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters long",
                },
              })}
              className={`w-full pl-10 pr-4 py-3 rounded-lg border ${
                errors.password 
                  ? "border-red-300 focus:border-red-500 focus:ring focus:ring-red-200" 
                  : "border-gray-200 focus:border-blue-500 focus:ring focus:ring-blue-200"
              } transition-all duration-200 bg-white/50`}
              placeholder="Password"
            />
            {errors.password && (
              <p className="mt-1 text-red-500 text-sm">{errors.password.message}</p>
            )}
          </div>

          {/* Confirm Password Input */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Lock className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="password"
              {...register("confirmPassword", {
                required: "Confirm password is required",
                validate: (value) => value === password || "Passwords do not match",
              })}
              className={`w-full pl-10 pr-4 py-3 rounded-lg border ${
                errors.confirmPassword 
                  ? "border-red-300 focus:border-red-500 focus:ring focus:ring-red-200" 
                  : "border-gray-200 focus:border-blue-500 focus:ring focus:ring-blue-200"
              } transition-all duration-200 bg-white/50`}
              placeholder="Confirm Password"
            />
            {errors.confirmPassword && (
              <p className="mt-1 text-red-500 text-sm">{errors.confirmPassword.message}</p>
            )}
          </div>

          {/* Age Input */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Calendar className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="number"
              {...register("age", {
                required: "Age is required",
                min: {
                  value: 1,
                  message: "Age must be a positive number",
                },
              })}
              className={`w-full pl-10 pr-4 py-3 rounded-lg border ${
                errors.age 
                  ? "border-red-300 focus:border-red-500 focus:ring focus:ring-red-200" 
                  : "border-gray-200 focus:border-blue-500 focus:ring focus:ring-blue-200"
              } transition-all duration-200 bg-white/50`}
              placeholder="Age"
            />
            {errors.age && (
              <p className="mt-1 text-red-500 text-sm">{errors.age.message}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg 
              font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 
              focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 
              disabled:cursor-not-allowed disabled:hover:transform-none disabled:hover:shadow-lg"
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <Loader2 className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" />
                Creating Account...
              </span>
            ) : (
              'Create Account'
            )}
          </button>

          <div className="text-center mt-6">
            <p className="text-gray-600">
              Already have an account?{' '}
              <a 
                href="/login" 
                className="text-blue-600 hover:text-blue-700 font-medium transition-colors duration-200"
              >
                Log In
              </a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;