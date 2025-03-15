"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import TopBar from "@/app/navigation/topbar";
import Navbar from "@/app/navigation/navbar";
import BillingTopBar from "./billingtopbar";
import BillingTable from "./BillingTable";

export default function ProductsPage() {
  const [showNavbar, setShowNavbar] = useState(false);
  const [billingData, setBillingData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

  const API_URL = process.env.NEXT_PUBLIC_API_URL_BILLING;
  const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

  useEffect(() => {
    const fetchBillingData = async () => {
      try {
        const response = await fetch(`${API_URL}?code=${API_KEY}`);

        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }

        const data = await response.json();

        // Mapeo del campo type a su descripción correspondiente
        const formattedData = data.map((item) => ({
          ...item,
          type:
            item.type === 1
              ? "Tarjeta"
              : item.type === 2
              ? "Sinpe Móvil"
              : item.type === 3
              ? "Efectivo"
              : item.type === 4
              ? "Wix"
              : "Desconocido",
        }));

        setBillingData(formattedData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBillingData();
  }, []);

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
        <div className="flex flex-col gap-4">
          <BillingTopBar />
          {loading ? (
            <p className="text-white">Loading billing data...</p>
          ) : error ? (
            <p className="text-red-500">Error: {error}</p>
          ) : (
            <BillingTable sales={billingData} />
          )}
        </div>
      </div>
    </div>
  );
}
