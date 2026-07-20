import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";

export default function PageLayout() {
  return (
    <>
      <Header />
      
      <main>
        <Outlet />
      </main>
    </>
  );
}
