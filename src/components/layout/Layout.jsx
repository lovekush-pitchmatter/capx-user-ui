import React, { useState } from "react";
import Sidebar from "../common/SideBar";
import Header from "../common/Header";
import Footer from "../common/Footer";

const Layout = ({ children }) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="min-h-screen flex bg-white dark:bg-zinc-900 ">
      <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />
      <main className="flex-1 sm:p-4 p-2 space-y-4 flex flex-col">
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
