import { jwtVerify } from "jose";
import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import refreshAuthToken from "../../utils/refreshAuthToken";

const AdminRoute = () => {
  const [isAuthorized, setIsAuthorized] = useState(null);

  useEffect(() => {
    const verifyToken = async () => {
      const token = localStorage.getItem("token");
      const refreshToken = localStorage.getItem("refreshToken");
      const secretKey = new TextEncoder().encode(
        import.meta.env.VITE_APP_SECRET_KEY
      );
      if (!token) {
        setIsAuthorized(false);
        return;
      }
      try {
        const { payload } = await jwtVerify(token, secretKey);
        if (payload.role !== "admin" && payload.role !== "student") {
          setIsAuthorized(false);
          return;
        }

        setIsAuthorized(true);
      } catch (err) {
        if (err.code === "ERR_JWT_EXPIRED") {
          try {
            const newToken = await refreshAuthToken(refreshToken, secretKey);
            localStorage.setItem("token", newToken);
            setIsAuthorized(true);
          } catch (refreshErr) {
            setIsAuthorized(false);
          }
        } else {
          setIsAuthorized(false);
        }
      }
    };
    verifyToken();
  }, []);
  if (isAuthorized === null) {
    return <div>Loading...</div>;
  }
  if (!isAuthorized) {
    return <Navigate to="/login" />;
  }
  return <Outlet />;
};

export default AdminRoute;
