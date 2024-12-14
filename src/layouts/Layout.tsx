import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";
import React from "react";
import { Outlet } from "react-router";

const Layout: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header onSearch={() => {}} onFilterChange={() => {}} />
      <main className="flex-1 overflow-auto">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
