import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const AdminProtectedRoute = () => {
    const { token, user, isLoggedIn, isLoading } = useSelector((state) => state.auth);
    const location = useLocation();

    // 1. Handle Loading State
    // Crucial for page refreshes so Redux has time to re-hydrate from storage
    if (isLoading) {
        return <div>Loading permissions...</div>; 
    }

    // 2. Define allowed roles (Admin and Super Admin)
    const allowedRoles = ["admin", "super_admin"];
    
    // Normalize the role string to lowercase to prevent "Admin" vs "admin" bugs
    const userRole = user?.role?.toLowerCase();
    const hasAccess = allowedRoles.includes(userRole) || user?.isAdmin === true;

    // 3. Logic for Redirects
    if (!token || !isLoggedIn) {
        // Redirect to login but keep the current location in state
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    if (!hasAccess) {
        // Redirect to a neutral page or show an unauthorized message
        return <Navigate to="/unauthorized" replace />;
    }

    // 4. 
    
    return <Outlet />;
};

export default AdminProtectedRoute;



// import React, { useEffect } from "react";
// import { useSelector } from "react-redux";
// import { Navigate, Outlet, useLocation } from "react-router-dom";

// const AdminProtectedRoute = () => {
//     const auth = useSelector((state) => state.auth);
//     const { token, user, isLoggedIn, isLoading } = auth;
//     const location = useLocation();

//     // --- Debugging Logs ---
//     useEffect(() => {
//         console.group("Access Control Debug");
//         console.log("Role:", user?.role);
//         console.log("Is Authenticated:", isLoggedIn);
//         console.groupEnd();
//     }, [user, isLoggedIn]);

//     // 1. Wait for loading to finish (prevents accidental redirects during refresh)
//     if (isLoading) {
//         return <div>Checking permissions...</div>;
//     }

//     // 2. Define allowed roles
//     const allowedRoles = ["admin", "super_admin"];
    
//     // 3. Check if user role matches or if isAdmin boolean is true
//     const hasAccess = 
//         (user?.role && allowedRoles.includes(user.role.toLowerCase())) || 
//         user?.isAdmin === true ||
//         user?.role === "super_admin"; // Safety check for underscore case

//     // 4. Redirect if not logged in
//     if (!token || !isLoggedIn) {
//         return <Navigate to="/login" state={{ from: location }} replace />;
//     }

//     // 5. Show message if logged in but role is insufficient
//     if (!hasAccess) {
//         return (
//             <div style={{ textAlign: "center", marginTop: "50px", color: "red" }}>
//                 <h2>Access Denied</h2>
//                 <p>Your current role ({user?.role}) does not have permission to view this page.</p>
//                 <button onClick={() => window.history.back()}>Go Back</button>
//             </div>
//         );
//     }

//     // 6. Access granted
//     return <Outlet />;
// };

// export default AdminProtectedRoute;

