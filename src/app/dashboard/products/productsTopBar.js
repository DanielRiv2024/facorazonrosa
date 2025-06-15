import { IoAddCircleOutline } from "react-icons/io5";
import { HiMiniArchiveBoxXMark, HiMiniArchiveBox, HiMiniArchiveBoxArrowDown } from "react-icons/hi2";
import { IoSearchOutline } from "react-icons/io5";
import Link from "next/link";
import { useState } from "react";

export default function ProductsTopBar({ allProductsNum, activeProductsNum, inactiveProductsNum, onSearch }) {
  const [searchTerm, setSearchTerm] = useState("");

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    if (onSearch) onSearch(value); // Notifica al componente padre
  };

  return (
    <div className="flex flex-col md:flex-row items-center justify-between p-4 rounded-2xl shadow-lg bg-white m-2 gap-4">
      <div className="flex items-center gap-2 border border-amber-400 rounded-md py-0.5 px-2  w-full bg-white">
        <IoSearchOutline size={18} color="gray" />
        <input
          type="text"
          placeholder="Buscar producto..."
          value={searchTerm}
          onChange={handleInputChange}
          className="w-full p-1 text-sm text-black outline-none bg-transparent"
        />
      </div>

      <Link
        className="flex items-center gap-2 text-white bg-amber-400 text-sm px-4 py-2 rounded-lg hover:opacity-80"
        href={"/dashboard/products/newproduct"}
      >
        <IoAddCircleOutline size={20} />
        <p className="text-sm">Agregar</p>
      </Link>
    </div>
  );
}
