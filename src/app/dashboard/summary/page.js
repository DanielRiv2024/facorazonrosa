"use client";
import { useState, useEffect } from "react";
import Navbar from "../../../app/navigation/navbar";
import TopBar from "../../../app/navigation/topbar";
import { getUserFromCookies } from "@/app/utils/auth";
import { useRouter } from "next/navigation";

export default function SummaryPage() {
  const [showNavbar, setShowNavbar] = useState(true);

  return (
    <div className="min-h-screen flex flex-col bg-black">
      <div
        className={`text-white transition-all duration-300 ${
          showNavbar ? "translate-x-0" : "-translate-x-full"
        } fixed top-0 left-0 h-full p-4`}
      >
        <Navbar />
      </div>

      {/* Contenido Principal */}
      <div
        className={`flex-1 flex-col transition-all duration-300 ${
          showNavbar ? "" : "ml-0"
        }`}
      >
        {/* Barra superior con menú y breadcrumbs */}
        <TopBar
          showNavbar={showNavbar}
          toggleNavbar={() => setShowNavbar(!showNavbar)}
        />

        <div className="h-px bg-white opacity-50"></div>
        <div className="p-4">
          <p>Summary</p>
        </div>
      </div>
    </div>
  );
}
