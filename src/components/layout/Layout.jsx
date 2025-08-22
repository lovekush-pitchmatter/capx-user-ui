import React, { useState } from "react";
import Sidebar from "../common/SideBar";
import Header from "../common/Header";
import Footer from "../common/Footer";

const Layout = ({ children }) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-white text-black" style={{ backgroundColor: "#ffffff" }}>
      
      <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />
      <main className="flex-1 p-2 sm:p-4 space-y-4 flex flex-col w-full">
        <Header isOpen={isOpen} />

        <div className="flex flex-col justify-between h-full">
          {children}
          <Footer />
        </div>
      </main>
    </div>
  );
};

export default Layout;
