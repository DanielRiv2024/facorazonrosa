"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import TopBar from "../../navigation/topbar";
import Navbar from "../../navigation/navbar";
import { format } from "date-fns";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function SalesPage() {
  const [showNavbar, setShowNavbar] = useState(false);
  const [billingData, setBillingData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [idStore, setIdStore] = useState(null);

  const [userData, setUserData] = useState(null);
  const router = useRouter();
  const API_KEY = process.env.NEXT_PUBLIC_API_KEY;


 

  return (
    <div className="min-h-screen flex flex-col bg-background transition-all duration-800">
      <div
        className={`text-white transition-all duration-300 ${
          showNavbar ? "translate-x-0" : "translate-x-[-100%]"
        }`}
      >
        <Navbar showNavbar={showNavbar} />
      </div>

      <div
        className={`flex flex-col transition-all duration-300 ${
          showNavbar ? "ml-40" : "ml-0"
        }`}
      >
        <TopBar
          showNavbar={showNavbar}
          toggleNavbar={() => setShowNavbar(!showNavbar)}
        />
        <div className="h-px bgb-background opacity-50"></div>
        <div className="flex flex-col gap-4">
         
        </div>
      </div>
    </div>
  );
}