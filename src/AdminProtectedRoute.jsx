import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const AdminProtectedRoute = () => {
    const { token, user, isLoggedIn } = useSelector((state) => state.auth);

    // Check if token exists and user has admin role
    // Adjust 'user.role' based on your actual API response structure
    const isAdmin = user && (user.role === "admin" || user.isAdmin === true);

    if (!token || !isLoggedIn || !isAdmin) {
        // return <Navigate to="/login"/>;
        return(
            <div>You are not Permitted for this</div>
        )
    }

    return <Outlet />; // Renders the child routes
};

export default AdminProtectedRoute;