import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "@/componenets/Navbar";
import Footer from "@/componenets/Footer";
import { BackToTopButton } from "@/componenets/ScrollToTop";

const Layout = () => {
  return (
    <div className="flex min-h-screen flex-col bg-paper">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <BackToTopButton />
    </div>
  );
};

export default Layout;
