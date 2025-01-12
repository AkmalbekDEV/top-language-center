import { jwtVerify } from "jose";
import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import refreshAuthToken from "../../utils/refreshAuthToken";

const ForVocabularyTestRoute = () => {
  const [isAuthorized, setIsAuthorized] = useState(null);
  // Get the username from the JWT to compare with allowed roles
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const verifyToken = async () => {
      const testToken = localStorage.getItem("testToken");
      const refreshToken = localStorage.getItem("refreshToken");
      const secretKey = new TextEncoder().encode(
        import.meta.env.VITE_APP_SECRET_KEY
      );

      // If no token exists, user isn't logged in
      if (!testToken) {
        setIsAuthorized(false);
        return;
      }

      try {
        // Decode and verify the token
        const { payload } = await jwtVerify(testToken, secretKey);

        // Extract the role from the payload
        const tokenRole = payload.role;
        setUserRole(tokenRole);

        // Check if the role starts with 'test' prefix
        // This ensures only users with test roles can access this route
        if (!tokenRole.startsWith('test')) {
          setIsAuthorized(false);
          return;
        }

        // If we get here, the role is valid
        setIsAuthorized(true);

      } catch (err) {
        // Handle expired token
        if (err.code === "ERR_JWT_EXPIRED") {
          try {
            const newToken = await refreshAuthToken(refreshToken, secretKey);
            localStorage.setItem("testToken", newToken);

            // Verify the new token's role as well
            const { payload } = await jwtVerify(newToken, secretKey);
            if (!payload.role.startsWith('test')) {
              setIsAuthorized(false);
              return;
            }

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

  // Loading state
  if (isAuthorized === null) {
    return <div>Loading...</div>;
  }

  // Unauthorized users get redirected to login
  if (!isAuthorized) {
    return <Navigate to="/login" />;
  }

  // Authorized users can access the protected route
  return <Outlet />;
};

export default ForVocabularyTestRoute;