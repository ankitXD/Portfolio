import React from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./componenets/Layout";
import LandingPage from "./componenets/LandingPage";
import ScrollToTop, { BackToTopButton } from "./componenets/ScrollToTop";

const App = () => {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<LandingPage />} />
        </Route>
      </Routes>
      <BackToTopButton />
    </>
  );
};

export default App;
