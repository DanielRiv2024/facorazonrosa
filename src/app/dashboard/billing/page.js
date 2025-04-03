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
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function BillingPage() {
  const [showNavbar, setShowNavbar] = useState(false);
  const [billingData, setBillingData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [idStore, setIdStore] = useState("1");

  const router = useRouter();
  const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

  useEffect(() => {
    console.log(
      "Cambio detectado en selectedDate o idStore",
      selectedDate,
      idStore
    );

    if (selectedDate && idStore) {
      fetchBillingData();
    }
  }, [selectedDate, idStore]);

  const fetchBillingData = async () => {
    setLoading(true);
    setError(null); // Reiniciar errores previos
    setBillingData([]); // Limpiar datos previos
    //tttt

    try {
      console.log("Fecha recibida:", selectedDate);
      const formattedDate = format(selectedDate, "yyyy-MM-dd");
      console.log("Fecha formateada:", formattedDate);
// testing
      const response = await fetch(
        `https://bacorazonrosa.azurewebsites.net/api/billing/filter?date=${formattedDate}&idStore=${idStore}&code=${API_KEY}`
      );

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const data = await response.json();
      console.log("Datos recibidos:", data);

      if (!Array.isArray(data)) {
        throw new Error("La API no devolvió un array");
      }

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
      setBillingData([]); // 🔹 Limpiar datos en caso de error
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

    const formattedData = billingData.map(
      ({ id, date, idStore, description, total, type }) => ({
        ID: id,
        Fecha_Hora: new Date(date).toLocaleString(),
        Sucursal: idStore,
        Descripción: description.replace(/=!$/g, " "),
        Total: total.toFixed(2),
        Tipo: type,
      })
    );

    const worksheet = XLSX.utils.json_to_sheet(formattedData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Ventas");

    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });
    const data = new Blob([excelBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8",
    });
    saveAs(data, "ventas.xlsx");
  };

  const totalPrice = billingData.reduce(
    (sum, item) => sum + (item.total || 0),
    0
  );

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
          <BillingTopBar
            totalPrice={totalPrice}
            exportToExcel={exportToExcel}
            setSelectedDate={setSelectedDate}
            setIdStore={setIdStore}
          />
          {loading ? (
            <div className="flex flex-col gap-4 mr-4 ml-4 mt-4">
              <SkeletonTheme baseColor="#202020" highlightColor="#444" className>
                <p>
                  <Skeleton count={12} height={40}/>
                </p>
              </SkeletonTheme>
            </div>
          ) : billingData.length === 0 ? (
            <p className="text-gray-400">
              No hay datos disponibles para esta fecha o sucursal.
            </p>
          ) : (
            <BillingTable sales={billingData} fetchSales={fetchBillingData} />
          )}
        </div>
      </div>
    </div>
  );
}