import React, { useContext } from "react";
import { UserContext } from "../../Context/userContext";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
    const { userToken } = useContext(UserContext);
    if (userToken) {
        return children;
    } else {
        return <Navigate to={"/login"} />;
    }
}
