import { IoAddCircleOutline } from "react-icons/io5";
import { IoIosArrowDropdown } from "react-icons/io";
import Link from "next/link";
import { RiFileExcel2Line } from "react-icons/ri";
import { useState, useRef, useEffect } from "react";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";

const branches = [
  { id: "1", name: "Lindora" },
  { id: "2", name: "Escazu" },
  { id: "3", name: "Sucursal Alajuela" },
];

export default function BillingTopBar({ totalPrice, exportToExcel, setSelectedDate, setIdStore }) {
  const [selectedDate, localSetSelectedDate] = useState(new Date());
  const [showCalendar, setShowCalendar] = useState(false);
  const [store, setStore] = useState("1");
  const calendarRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (calendarRef.current && !calendarRef.current.contains(event.target)) {
        setShowCalendar(false);
      }
    }
    if (showCalendar) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showCalendar]);

  useEffect(() => {
    setSelectedDate(selectedDate);
    setIdStore(store);
    localStorage.setItem("preferredStore", store);
  }, [selectedDate, store]);

  return (
    <div className="flex flex-wrap items-start justify-between p-4 rounded-lg shadow gap-4">
      
      {/* Total y Fecha */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4">
        <span className="text-lg text-white font-semibold">CRC {totalPrice.toFixed(2)}</span>

        <div className="relative" ref={calendarRef}>
          <div
            className="flex items-center gap-2 hover:bg-[#1F1F22] p-2 rounded cursor-pointer text-red-500"
            onClick={() => setShowCalendar(!showCalendar)}
          >
            <span className="text-lg text-white font-semibold">
              {format(selectedDate, "dd/MM/yyyy", { locale: es })}
            </span>
            <IoIosArrowDropdown size={20} className="cursor-pointer text-white" />
          </div>
          {showCalendar && (
            <div className="absolute top-10 left-0 bg-black border border-white p-2 rounded-lg shadow-lg z-10">
              <DayPicker
                mode="single"
                selected={selectedDate}
                onSelect={(date) => date && localSetSelectedDate(date)}
              />
            </div>
          )}
        </div>
      </div>
      
      {/* Sucursal y Botones en una nueva línea en móviles */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4 w-full sm:w-auto">
        
        {/* Selector de sucursal */}
      
        {/* Botones */}
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 w-full sm:w-auto">
          <Link
            className="flex items-center justify-center gap-2 text-white bg-[#1F1F22] px-4 py-2 rounded-lg hover:opacity-80 w-full sm:w-auto"
            href={"/dashboard/billing/newbilling"}
          >
            <IoAddCircleOutline size={20} />
            Agregar
          </Link>

          <button
            onClick={exportToExcel}
            className="bg-green-600 flex items-center justify-center text-white px-4 py-2 rounded-lg hover:bg-green-700 w-full sm:w-auto"
          >
            <RiFileExcel2Line size={24} />
          </button>
        </div>
      </div>
    </div>
  );
}
/*
  <select
          className="bg-black text-white border border-white p-2 rounded-lg cursor-pointer w-full sm:w-auto"
          value={store}
          onChange={(e) => setStore(e.target.value)}
        >
          {branches.map((branch) => (
            <option key={branch.id} value={branch.id}>
              {branch.name}
            </option>
          ))}
        </select>

*/