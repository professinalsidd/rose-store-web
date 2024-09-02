import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export default function AdminRoute({ Component }) {
  const userSignIn = useSelector((state) => state.userSignIn);
  const { userInfo } = userSignIn;
  if (!userInfo.isAdmin) {
    return <Navigate to="signin" />;
  }
  return <Component></Component>;
}
