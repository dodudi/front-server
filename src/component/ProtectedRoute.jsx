import { Navigate } from "react-router-dom";
import { useState, useEffect } from "react";

const ProtectedRoute = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    const validateToken = async () => {
      const accessToken = localStorage.getItem("access_token");

      if (!accessToken) {
        setIsValid(false);
        setIsLoading(false);
        return;
      }

      try {
        // Replace with your API endpoint for token validation
        const response = await fetch("your-api-endpoint/validate-token", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        if (response.ok) {
          // Token is valid
          const data = await response.json();
          setIsValid(true);
        } else {
          // Token is invalid or expired
          localStorage.removeItem("access_token"); // Remove the invalid token
          setIsValid(false);
        }
      } catch (error) {
        console.error("Error validating token:", error);
        setIsValid(false);
      } finally {
        setIsLoading(false);
      }
    };

    validateToken();
  }, []);

  // Show loading state while checking token
  if (isLoading) {
    return <div>Loading...</div>; // Or a more sophisticated loading component
  }

  // If token is invalid, redirect to login
  if (!isValid) {
    return <Navigate to="/" replace />;
  }

  // If token is valid, render the children
  return children;
};

export default ProtectedRoute;
