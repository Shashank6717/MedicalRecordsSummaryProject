import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { db } from '../firebaseConfig'; // Import your Firestore config
import { doc, setDoc } from 'firebase/firestore';

const PersonalInfo = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { userId } = location.state; // Retrieve the UID from location state
  const [loading, setLoading] = useState(false);

  // Initialize react-hook-form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      // Save personal information to Firestore with the userId as the document ID
      const userRef = doc(db, 'users', userId); // Use UID as the document ID
      await setDoc(userRef, {
        fullName: data.fullName,
        age: data.age,
      });

      // Once data is stored, navigate to the dashboard with the user's name
      navigate('/dashboard', { state: { name: data.fullName } });
    } catch (error) {
      console.error('Error saving personal info:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-4">Enter Your Personal Info</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Full Name */}
          <div className="mb-4">
            <label className="block text-gray-700">Full Name</label>
            <input
              type="text"
              {...register('fullName', { required: 'Full name is required' })}
              className={`w-full p-2 border rounded ${
                errors.fullName ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.fullName && (
              <p className="text-red-500 text-sm">{errors.fullName.message}</p>
            )}
          </div>

          {/* Age */}
          <div className="mb-4">
            <label className="block text-gray-700">Age</label>
            <input
              type="number"
              {...register('age', { required: 'Age is required', min: 1 })}
              className={`w-full p-2 border rounded ${
                errors.age ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.age && (
              <p className="text-red-500 text-sm">{errors.age.message}</p>
            )}
          </div>

          <button
            type="submit"
            className={`w-full text-white p-2 rounded transition duration-300 ${
              loading ? 'bg-gray-400' : 'bg-blue-500 hover:bg-blue-600'
            }`}
            disabled={loading}
          >
            {loading ? 'Saving...' : 'Save Info'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default PersonalInfo;
