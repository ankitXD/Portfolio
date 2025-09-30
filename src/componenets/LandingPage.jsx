import React from "react";
import HeroSection from "../pages/HeroSection";
import AboutMe from "../pages/AboutMe";
import Skills from "../pages/Skills";
import WorkExperience from "../pages/WorkExperience"
import Projects from "../pages/Projects"
import FreelanceServices from "../pages/FreelanceServices"
import GetInTouch from "../pages/GetInTouch"

const LandingPage = () => {
  return (
    <div>
      <HeroSection />
      <Projects />
      {/* <Skills /> */}
      <AboutMe />
      <WorkExperience />
      <FreelanceServices />
      <GetInTouch />
    </div>
  );
};

export default LandingPage;
