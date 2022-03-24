import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "../Header";
import Home from "../../pages/Home";
import Profile from "../../pages/Profile";

const index = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </BrowserRouter>
  );
};

export default index;
