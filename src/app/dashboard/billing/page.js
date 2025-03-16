"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
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

  // Función para obtener la data
  const fetchBillingData = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}?code=${API_KEY}`);
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      const data = await response.json();

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
            ? "Uber"
            : "Desconocido",
      }));

      setBillingData(formattedData);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Función para exportar a Excel
  const exportToExcel = () => {
    if (!billingData || billingData.length === 0) {
      alert("No hay datos para exportar.");
      return;
    }

    const formattedData = billingData.map(({ id, date, idStore, description, total, type }) => ({
      ID: id,
      Fecha_Hora: new Date(date).toLocaleString(),
      Sucursal: idStore,
      Descripción: description.replace(/=!$/g, " "),
      Total: total.toFixed(2),
      Tipo: type,
    }));

    const worksheet = XLSX.utils.json_to_sheet(formattedData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Ventas");

    const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
    const data = new Blob([excelBuffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8" });
    saveAs(data, "ventas.xlsx");
  };

  useEffect(() => {
    fetchBillingData();
  }, []);

  const totalPrice = billingData.reduce((sum, item) => sum + (item.total || 0), 0);

  return (
    <div className="min-h-screen flex flex-col bg-black">
      <div className={`text-white w-64 transition-all duration-300 ${showNavbar ? "translate-x-0" : "translate-x-[-100%]"}`}>
        <Navbar showNavbar={showNavbar} />
      </div>

      <div className={`flex flex-col transition-all duration-300 ${showNavbar ? "ml-64" : "ml-0"}`}>
        <TopBar showNavbar={showNavbar} toggleNavbar={() => setShowNavbar(!showNavbar)} />
        <div className="h-px bg-white opacity-50"></div>
        <div className="flex flex-col gap-4">
          {/* Pasamos `exportToExcel` para que el botón de exportar lo llame */}
          <BillingTopBar totalPrice={totalPrice} exportToExcel={exportToExcel} />
          {loading ? (
            <p className="text-white">Loading billing data...</p>
          ) : error ? (
            <p className="text-red-500">Error: {error}</p>
          ) : (
            <BillingTable sales={billingData} fetchSales={fetchBillingData} />
          )}
        </div>
      </div>
    </div>
  );
}
