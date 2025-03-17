"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import TopBar from "@/app/navigation/topbar";
import Navbar from "@/app/navigation/navbar";
import BillingTopBar from "./billingtopbar";
import BillingTable from "./BillingTable";
import { format } from "date-fns";

export default function ProductsPage() {
  const [showNavbar, setShowNavbar] = useState(false);
  const [billingData, setBillingData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date()); // 📌 Estado para la fecha
  const [idStore, setIdStore] = useState("1"); // 📌 Estado para la sucursal (ID por defecto)

  const router = useRouter();
  const API_URL = process.env.NEXT_PUBLIC_API_URL_BILLING_FILTER; 
  const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

  useEffect(() => {
    console.log("Cambio detectado en selectedDate o idStore", selectedDate, idStore);
    
    if (selectedDate && idStore) {
      fetchBillingData();
    }
  }, [selectedDate, idStore]);
  
  // 🔹 Función para obtener datos filtrados por fecha y sucursal
  const fetchBillingData = async () => {
    setLoading(true);
    try {
      console.log("fecha recibida", selectedDate);
      const formattedDate = format(selectedDate, "yyyy-MM-dd"); // 📌 Formato YYYY-MM-DD
      console.log("fecha actualizada y nueva", formattedDate);
      console.log(`${formattedDate}&idStore=${idStore}`);
  
      const response = await fetch(
        `https://bacorazonrosa.azurewebsites.net/billing/filter?date=${formattedDate}&idStore=${idStore}&code=${API_KEY}`
      );
  
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
  
      const data = await response.json();
      console.log("Datos recibidos:", data);
  
      // 🔹 Verificar si 'data' es un array antes de usar .map()
      if (!Array.isArray(data)) {
        throw new Error("La API no devolvió un array");
      }
  
      // 🔹 Formatear tipo de pago
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
      console.error("Error en fetchBillingData:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  
console.log(billingData);
  // 🔹 Llamar a la API cuando cambien la fecha o la sucursal
  useEffect(() => {
    fetchBillingData();
  }, [selectedDate, idStore]);

  // 🔹 Función para exportar a Excel
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
          {/* 🔹 Pasamos `setSelectedDate` y `setIdStore` para recibir valores desde BillingTopBar */}
          <BillingTopBar 
            totalPrice={totalPrice} 
            exportToExcel={exportToExcel} 
            setSelectedDate={setSelectedDate} 
            setIdStore={setIdStore}
          />
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
