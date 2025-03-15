import { IoAddCircleOutline } from "react-icons/io5";
import { IoIosArrowDropdown } from "react-icons/io";

import { HiMiniArchiveBoxXMark } from "react-icons/hi2";
import { HiMiniArchiveBox } from "react-icons/hi2";
import { HiMiniArchiveBoxArrowDown } from "react-icons/hi2";

import Link from "next/link";
export default function ProductsTopBar() {
  return (
    <div className="flex items-center justify-between p-4 rounded-lg shadow">
         <div className="flex flex-row items-center gap-2">
          <HiMiniArchiveBoxArrowDown size={20} color="blue"/>
          <span className="text-lg text-white">Productos: 0</span>
        </div>
      <div className="flex flex-row items-center gap-2 hover:bg-[#1F1F22] p-2 rounded gap-10 ">
        <div className="flex flex-row items-center gap-2">
          <HiMiniArchiveBoxXMark size={20} color="red"/>
          <p className="text-lg text-white">Inactivos: 0</p>
        </div>
        <div className="flex flex-row items-center gap-2">
          <HiMiniArchiveBox size={20} color="green" />
          <span className="text-lg text-white">Activos: 0</span>
        </div>
      </div>
      <Link
        className="flex items-center gap-2 text-white bg-[#1F1F22] px-4 py-2 rounded-lg hover:opacity-80"
        href={"/dashboard/products/newproduct"}>
        <IoAddCircleOutline size={20}/>
        Agregar
      </Link>
    </div>
  );
}
