import { IoAddCircleOutline } from "react-icons/io5";
import { HiMiniArchiveBoxXMark } from "react-icons/hi2";
import { HiMiniArchiveBox } from "react-icons/hi2";
import { HiMiniArchiveBoxArrowDown } from "react-icons/hi2";
import Link from "next/link";

export default function ProductsTopBar({allProductsNum, activeProductsNum, inactiveProductsNum}) {
  return (
    <div className="flex items-center justify-between p-4 rounded-2xl shadow-lg bg-white m-2">
         <div className="flex flex-row items-center gap-2">
          <HiMiniArchiveBoxArrowDown size={20} color="blue"/>
          <span className="text-sm text-black">Productos: {allProductsNum}</span>
        </div>
      <div className="flex flex-row items-center gap-2 p-2 rounded gap-10 ">
        <div className="flex flex-row items-center gap-2">
          <HiMiniArchiveBoxXMark size={20} color="red"/>
          <p className="text-sm text-black font-bold">Inactivos: {inactiveProductsNum}</p>
        </div>
        <div className="flex flex-row items-center gap-2">
          <HiMiniArchiveBox size={20} color="green" />
          <span className="text-sm text-black font-bold">Activos: {activeProductsNum}</span>
        </div>
      </div>
      <Link
        className="flex items-center gap-2 text-white bg-amber-400 text-sm px-4 py-2 rounded-lg hover:opacity-80"
        href={"/dashboard/products/newproduct"}>
        <IoAddCircleOutline size={20}/>
        <p className="text-sm ">
          Agregar
        </p>
      </Link>
    </div>
  );
}
