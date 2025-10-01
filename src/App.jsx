import React from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./componenets/Layout";
import LandingPage from "./componenets/LandingPage";
import ScrollToTop from "./componenets/ScrollToTop";

const App = () => {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<LandingPage />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
