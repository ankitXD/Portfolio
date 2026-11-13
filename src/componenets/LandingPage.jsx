import React from "react";
import HeroSection from "@/pages/HeroSection";
import Projects from "@/pages/Projects";
import Stack from "@/pages/Stack";
import AboutMe from "@/pages/AboutMe";
import GetInTouch from "@/pages/GetInTouch";

const LandingPage = () => {
  return (
    <div>
      <HeroSection />
      <Projects />
      <Stack />
      <AboutMe />
      <GetInTouch />
    </div>
  );
};

export default LandingPage;
