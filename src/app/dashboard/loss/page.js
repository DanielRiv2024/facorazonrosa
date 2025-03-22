"use client";
import { useState } from "react";
import Navbar from "@/app/navigation/navbar";
import TopBar from "../../navigation/topbar";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import TopBarLoss from "./topbarloss";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";


export default function LossPage() {
    const [showNavbar, setShowNavbar] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [idStore, setIdStore] = useState("1");
  const [totalPrice, settotalPrice] = useState("1");


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


  return (
    <div className="min-h-screen flex flex-col bg-black">
      <div
        className={`text-white w-64 transition-all duration-300 ${
          showNavbar ? "translate-x-0" : "-translate-x-full"
        } fixed top-0 left-0 h-full p-4`}
      ><Navbar/>
      </div>

      {/* Contenido Principal */}
      <div className={`flex-1 flex-col transition-all duration-300 ${showNavbar ? "ml-64" : "ml-0"}`}>
        {/* Barra superior con menú y breadcrumbs */}
        <TopBar showNavbar={showNavbar} toggleNavbar={() => setShowNavbar(!showNavbar)} />

        <div className="h-px bg-white opacity-50"></div>
        <div className="p-4">
           <div className="flex flex-col gap-4">
                    <TopBarLoss
                      totalPrice={totalPrice}
                      exportToExcel={exportToExcel}
                      setSelectedDate={setSelectedDate}
                      setIdStore={setIdStore}
                    />
                   
                  </div>
                </div>
        </div>
    </div>
  );
}
/*

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


*/