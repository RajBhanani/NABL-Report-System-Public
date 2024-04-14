import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";

import { useVerifyUserMutation } from "../redux/slices/api slices/usersApiSlice";

const PrivateRoute = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isTokenValid, setValidToken] = useState(false);
  const [verifyUser] = useVerifyUserMutation();

  useEffect(() => {
    const verifyUserToken = async () => {
      try {
        const response = await verifyUser();
        if (response?.data?.message === "valid token") {
          setValidToken(true);
          setIsLoading(false);
        } else {
          setIsLoading(false);
        }
      } catch (error) {
        console.log("error");
      }
    };
    if (isLoading) verifyUserToken();
  }, []);
  return isLoading ? null : isTokenValid ? (
    <Outlet />
  ) : (
    <Navigate to="/" replace />
  );
};

export default PrivateRoute;
