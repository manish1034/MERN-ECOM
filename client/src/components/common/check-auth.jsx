import { useLocation, Navigate } from "react-router-dom";

function CheckAuth({isAuthenticated, user, children}) {
    const location = useLocation();
    const isAuthPage = location.pathname.includes("/login") || location.pathname.includes("/register");

    if (!isAuthenticated && !isAuthPage) {
        return <Navigate to="/auth/login" />;
    }
    if (isAuthenticated && isAuthPage) {
        return <Navigate to={user?.role === "admin" ? "/admin/dashboard" : "/shop/home"} />;
    }
    if (isAuthenticated && user?.role !== "admin" && location.pathname.includes("/admin")) {
        return <Navigate to="/unauth-page" />;
    }
    if (isAuthenticated && user?.role === "admin" && location.pathname.includes("/shop")) {
        return <Navigate to="/admin/dashboard" />;
    }
    return children;
}

export default CheckAuth;