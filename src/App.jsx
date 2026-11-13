import React from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "@/componenets/Layout";
import LandingPage from "@/componenets/LandingPage";
import ScrollToTop from "@/componenets/ScrollToTop";
import Custom404 from "@/componenets/Custom404";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Terms from "./pages/Terms";
import Services from "./pages/Services";
import ServiceDetail from "./pages/ServiceDetail";

const App = () => {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<LandingPage />} />
          <Route path="/services" element={<Services />} />
          <Route path="/services/:slug" element={<ServiceDetail />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<Terms />} />
        </Route>
        <Route path="*" element={<Custom404 />} />
      </Routes>
    </>
  );
};

export default App;
