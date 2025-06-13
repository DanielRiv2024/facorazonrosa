"use client";
import { useRouter } from "next/navigation";
import { HiPencil,HiTrash  } from "react-icons/hi2";

export default function ProductsView({ p, onDelete }) {
  const router = useRouter();

  if (!p) return null;

  return (
    <div className="border bg-white border-white text-amber-400 p-4 rounded-lg shadow-md hover:shadow-lg transition-all cursor-pointer flex flex-col items-center justify-center">
      <img
        src={p.image || "/placeholder.jpg"}
        alt={p.name || "Producto"}
        className="w-32 h-32 object-cover rounded-md"
      />
      <h2 className="text-lg font-semibold mt-2">{p.name}</h2>
      <p className="text-gray-400 text-sm">{p.description}</p>
      <div className="flex justify-between items-center mt-2 w-full">
        <span
          className={`text-sm ${
            p.status ? "text-green-500" : "text-red-500"
          }`} >
          {p.status ? "Disponible" : "Agotado"}
        </span>
        <div className="flex gap-2">
          <button
            onClick={() => router.push(`/edit/${p._id}`)}
            className="p-1 rounded-md hover:bg-gray-100 transition-all">
            <HiPencil size={17} color="purple" />
          </button>
          <button
            onClick={() => onDelete(p._id)}
            className="p-1 rounded-md hover:bg-gray-100 transition-all">
            <HiTrash  size={17} color="red" />
          </button>
        </div>
      </div>
      <p className="text-xs font-bold ">
        {p.price === 1 ? "Precio flexible" : `CRC ${p.price}`}
      </p>
    </div>
  );
}
