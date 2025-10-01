import React from "react";
import HeroSection from "../pages/HeroSection";
import AboutMe from "../pages/AboutMe";
import Projects from "../pages/Projects"
import GetInTouch from "../pages/GetInTouch"
import Skills from "../pages/Skills";
import WorkExperience from "../pages/WorkExperience"
import FreelanceServices from "../pages/FreelanceServices"

const LandingPage = () => {
  return (
    <div>
      <HeroSection />
      <Projects />
      <AboutMe />
      <GetInTouch />
      {/* <Skills /> */}
      {/* <WorkExperience /> */}
      {/* <FreelanceServices /> */}
    </div>
  );
};

export default LandingPage;
