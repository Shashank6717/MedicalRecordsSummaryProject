// import React, { createContext, useContext, useState, useEffect } from 'react';
// import { auth } from '../firebaseConfig';  // Make sure to import firebase auth configuration
// import { signOut } from 'firebase/auth';

// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const unsubscribe = auth.onAuthStateChanged((user) => {
//       setUser(user);
//       setLoading(false);
//     });

//     return unsubscribe;
//   }, []);

//   const logout = () => {
//     signOut(auth);
//   };

//   return (
//     <AuthContext.Provider value={{ user, loading, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => useContext(AuthContext);
import React, { createContext, useContext, useState, useEffect } from 'react';
import { auth } from '../firebaseConfig'; // Import Firebase config

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(setUser); // Listen to auth state changes
    return () => unsubscribe();
  }, []);

  const logout = () => {
    auth.signOut();
  };

  return (
    <AuthContext.Provider value={{ user, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
