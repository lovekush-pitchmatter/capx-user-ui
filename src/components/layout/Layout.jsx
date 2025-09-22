import React, { useState } from "react";
import ErrorBoundary from "../ErrorBoundary";
import Sidebar from "../common/SideBar";
import Header from "../common/Header";
import Footer from "../common/Footer";

const Layout = ({ children, menu_one, menu_two }) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <ErrorBoundary>
      <div className="min-h-screen flex flex-col lg:flex-row bg-white text-black" style={{ backgroundColor: "#ffffff" }}>
        
        <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />
        <main className="flex-1 p-2 sm:p-4 space-y-4 flex flex-col w-full">
          <Header isOpen={isOpen} menu_one={menu_one} menu_two={menu_two} />

          <div className="flex flex-col justify-between h-full">
            {children}
            <Footer />
          </div>
        </main>
      </div>
    </ErrorBoundary>
  );
};

export default Layout;
