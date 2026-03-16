import React from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "@/componenets/Layout";
import LandingPage from "@/componenets/LandingPage";
import Tools from "@/pages/Tools";
import ScrollToTop from "@/componenets/ScrollToTop";
import DataWaster from "@/pages/Tools/DataWaster";
import PasswordGenerator from "@/pages/Tools/PasswordGenerator";
import BlackPage from "@/pages/Tools/BlackPage";
import SpeedTest from "@/pages/Tools/SpeedTest";
import URLShortner from "@/pages/Tools/URLShortner";
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
        </Route>
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/terms" element={<Terms />} />
        {/* <Route path="/tools" element={<Tools />} />
        <Route path="/tools/data-waster" element={<DataWaster />} />
        <Route
          path="/tools/password-generator"
          element={<PasswordGenerator />}
        />
        <Route path="/tools/black-page" element={<BlackPage />} />
        <Route path="/tools/speed-test" element={<SpeedTest />} />
        <Route path="/tools/url-shortner" element={<URLShortner />} /> */}
        <Route path="*" element={<Custom404 />} />
      </Routes>
    </>
  );
};

export default App;
