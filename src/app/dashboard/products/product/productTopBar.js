import { IoAddCircleOutline } from "react-icons/io5";
import { HiMiniArchiveBoxXMark } from "react-icons/hi2";
import { HiMiniArchiveBox } from "react-icons/hi2";
import { HiMiniArchiveBoxArrowDown } from "react-icons/hi2";
import { HiTrash } from "react-icons/hi2";
import Link from "next/link";

export default function ProductTopBar() {
  return (
    <div className="flex items-center justify-between p-4 rounded-2xl shadow-lg bg-white m-2">
  <div className="flex flex-wrap gap-6 justify-between items-center text-sm text-gray-700">
  <div className="flex items-center gap-2">
    <span className="font-bold">Ventas esta semana:</span> 12
  </div>
  <div className="flex items-center gap-2">
    <span className="font-bold">Ganancia neta:</span> ₡2,400
  </div>
  <div className="flex items-center gap-2">
    <span className="font-bold">Precio compra promedio:</span> ₡3,000
  </div>
  <div className="flex items-center gap-2">
    <span className="font-bold">Stock:</span> 8 unidades
  </div>
  <div className="flex items-center gap-2">
    <span className="font-bold">Tendencia:</span> 📈 +25%
  </div>
</div>

      <Link
        className="flex items-center gap-2 text-white bg-red-400 text-sm px-4 py-2 rounded-lg hover:opacity-80"
        href={"/dashboard/products/newproduct"}>
        <HiTrash size={20}/>
        <p className="text-sm ">
          Eliminar
        </p>
      </Link>
    </div>
  );
}
