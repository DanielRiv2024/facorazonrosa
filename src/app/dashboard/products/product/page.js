"use client";
import { useState } from "react";
import Navbar from "../../../../app/navigation/navbar";
import TopBar from "../../../../app/navigation/topbar";
import ProductTopBar from "./productTopBar";
import ProductInformation from "./productInformation"
import PurchaseVsSalesChart from "./PurchaseVsSalesChart"
import PriceComparisonPieChart from "./PriceComparisonPieChart"

export default function ProductsPage() {
  const [showNavbar, setShowNavbar] = useState(false);
  return (
    <div className="min-h-screen flex flex-col bg-zinc-100">
      <div
        className={`text-white w-64 transition-all duration-300 ${
          showNavbar ? "translate-x-0" : "-translate-x-full"
        } fixed top-0 left-0 h-full p-4`}
      >
        <Navbar />
      </div>

      <div className={`flex-1 flex-col transition-all duration-300 ${showNavbar ? "ml-64" : "ml-0"}`}>
        <TopBar showNavbar={showNavbar} toggleNavbar={() => setShowNavbar(!showNavbar)} />

        <div className="h-px bg-black opacity-50"></div>
        <div className="p-4">
       <ProductTopBar/>
       <ProductInformation/>
       <div className="flex flex-row">
 <PurchaseVsSalesChart/>
 <PriceComparisonPieChart/>

       </div>
      
        </div>
      </div>
    </div>
  );
}
