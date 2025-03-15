"use client";
import { useState } from "react";
import { useRouter } from "next/navigation"; // Importa useRouter
import TopBar from "@/app/navigation/topbar";
import Navbar from "@/app/navigation/navbar";
import BillingTopBar from "./billingtopbar";
import billingfake from "@/app/fakedata/billingfake";
import BillingTable from "./BillingTable";

export default function ProductsPage() {
  const [showNavbar, setShowNavbar] = useState(true);
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col bg-black">
      <div
        className={`text-white w-64 transition-all duration-300 ${
          showNavbar ? "translate-x-0" : "translate-x-[-100%]"
        }`}
      >
        <Navbar showNavbar={showNavbar} />
      </div>

      <div
        className={`flex flex-col transition-all duration-300 ${
          showNavbar ? "ml-64" : "ml-0"
        }`}
      >
        <TopBar
          showNavbar={showNavbar}
          toggleNavbar={() => setShowNavbar(!showNavbar)}
        />
        <div className="h-px bg-white opacity-50"></div>
        <div className=" flex flex-col gap-4">
          <BillingTopBar />
          <BillingTable sales={billingfake} />
        </div>
      </div>
    </div>
  );
}
