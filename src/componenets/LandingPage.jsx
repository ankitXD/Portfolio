import React from "react";
import HeroSection from "../pages/HeroSection";
import AboutMe from "../pages/AboutMe";
import Projects from "../pages/Projects";
import GetInTouch from "../pages/GetInTouch";

const LandingPage = () => {
  return (
    <div>
      <HeroSection />
      <Projects />
      <AboutMe />
      <GetInTouch />
    </div>
  );
};

export default LandingPage;
