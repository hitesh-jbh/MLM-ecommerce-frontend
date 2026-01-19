// import React from "react";
// import { useSelector } from "react-redux";
// import { Navigate, Outlet, useLocation } from "react-router-dom";

// const AdminProtectedRoute = () => {
//     const { token, user, isLoggedIn, isLoading } = useSelector((state) => state.auth);
//     const location = useLocation();

//     // 1. Handle Loading State
//     // Crucial for page refreshes so Redux has time to re-hydrate from storage
//     if (isLoading) {
//         return <div>Loading permissions...</div>; 
//     }

//     // 2. Define allowed roles (Admin and Super Admin)
//     const allowedRoles = ["admin", "super_admin"];
    
//     // Normalize the role string to lowercase to prevent "Admin" vs "admin" bugs
//     const userRole = user?.role?.toLowerCase();
//     const hasAccess = allowedRoles.includes(userRole) || user?.isAdmin === true;

//     // 3. Logic for Redirects
//     if (!token || !isLoggedIn) {
//         // Redirect to login but keep the current location in state
//         return <Navigate to="/login" state={{ from: location }} replace />;
//     }

//     if (!hasAccess) {
//         // Redirect to a neutral page or show an unauthorized message
//         return <Navigate to="/unauthorized" replace />;
//     }

//     // 4. 
    
//     return <Outlet />;
// };

// export default AdminProtectedRoute;


import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';

const AdminProtectedRoute = ({ children }) => {
  const { user, isLoggedIn, token } = useSelector((state) => state.auth);
  const location = useLocation();

  // 1. Check if we are still loading the user profile
  // If you have a 'loading' state in your authSlice, use it here
  if (token && !user) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-white">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-4 border-black border-t-transparent rounded-full animate-spin"></div>
          <p className="text-xs font-bold uppercase tracking-widest text-gray-400">Verifying Admin Session...</p>
        </div>
      </div>
    );
  }

  // 2. Check if logged in
  if (!isLoggedIn || !token) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // 3. Check for Admin Role
  const isAdmin = user?.role === 'super_admin' || user?.role === 'admin';
  
  if (!isAdmin) {
    // Redirect to home if they are a regular customer trying to access /admin
    return <Navigate to="/" replace />;
  }

  return children;
};

export default AdminProtectedRoute;