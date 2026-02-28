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

const App = () => {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<LandingPage />} />
        </Route>
        <Route path="/tools" element={<Tools />} />
        <Route path="/data-waster" element={<DataWaster />} />
        <Route path="/password-generator" element={<PasswordGenerator />} />
        <Route path="/black-page" element={<BlackPage />} />
        <Route path="/speed-test" element={<SpeedTest />} />
        <Route path="/url-shortner" element={<URLShortner />} />
      </Routes>
    </>
  );
};

export default App;
