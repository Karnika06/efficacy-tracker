import React from "react"
import { Route, Redirect, Navigate, Outlet } from "react-router-dom";

const AuthRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem("token");
  return isAuthenticated
  ? children
  : <Navigate to='/' replace />;
};

export default AuthRoute;

// For password route

// export const ProtectRoute = ({ children }) => {
//   const username = "swsd"
//   if(!username){
//     return <Navigate to={'/'} replace = {true}></Navigate>
//   }
//   return children
// }