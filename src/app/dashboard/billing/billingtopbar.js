import { IoAddCircleOutline } from "react-icons/io5";
import { IoIosArrowDropdown } from "react-icons/io";
import Link from "next/link";
import { RiFileExcel2Line } from "react-icons/ri";

export default function BillingTopBar({ totalPrice, exportToExcel }) {
  return (
    <div className="flex items-center justify-between p-4 rounded-lg shadow">
      <span className="text-lg text-white font-semibold">
        Total vendido: CRC {totalPrice.toFixed(2)}
      </span>
      
      <div className="flex flex-row items-center gap-2 hover:bg-[#1F1F22] p-2 rounded">
        <span className="text-lg text-white font-semibold">23/05/25</span>
        <IoIosArrowDropdown size={20} />
      </div>

      <div className="flex gap-4">
        {/* Botón de agregar nueva facturación */}
        <Link
          className="flex items-center gap-2 text-white bg-[#1F1F22] px-4 py-2 rounded-lg hover:opacity-80"
          href={"/dashboard/billing/newbilling"}
        >
          <IoAddCircleOutline size={20} />
          Agregar
        </Link>

        {/* Botón de exportar a Excel */}
        <button
          onClick={exportToExcel}
          className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
        >
          <RiFileExcel2Line size={24}/>
        </button>
      </div>
    </div>
  );
}
