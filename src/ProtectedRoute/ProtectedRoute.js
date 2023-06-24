import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getLocalStorageData } from "../utils";

const UserProtectedRoutes = ({ element }) => {
  const navigate = useNavigate();
  useEffect(() => {
    const { token, email } = getLocalStorageData();
    if (token && email) {
      navigate("/dashboard");
    } else if (!token || !email) {
      navigate("/login");
    }
  }, []);
  return <>{element}</>;
};

export default UserProtectedRoutes;
