import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "../components/Login";
import Home from "../components/Home";
import PrivateRoute from "./PrivateRoute";
import NotFound from "./NotFound";
const AppRouters = () => {
  return (
    <>
      <Routes>
        <Route>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
        </Route>
        <Route path="/users" element={<PrivateRoute />}></Route>
        <Route path="*" element={<NotFound/>}></Route>
      </Routes>
      
    </>
  );
};

export default AppRouters;
