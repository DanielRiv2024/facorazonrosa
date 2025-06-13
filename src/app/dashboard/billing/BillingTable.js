import React from "react";
import { MdDeleteOutline } from "react-icons/md";
import { FaRegFrownOpen } from "react-icons/fa";

const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

export default function BillingTable({ sales, fetchSales }) {
  const handleDelete = async (id) => {
    if (!id) return;
    const confirmDelete = window.confirm("¿Estás seguro de que deseas eliminar esta venta?");
    if (!confirmDelete) return;

    try {
      const response = await fetch(`https://backendproductioncorazonrosa.azurewebsites.net/api/billing/delete/${id}?code=${API_KEY}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${API_KEY}`,
        },
      });

      if (!response.ok) {
        throw new Error("Error eliminando la venta");
      }
      alert("Venta eliminada correctamente");
      window.location.reload();
    } catch (error) {
      console.error("Error al eliminar la venta:", error);
    }
  };

  return (
    <div className="overflow-x-auto rounded-lg shadow-md p-4 bgt-background transition-all duration-300">
    <table className="min-w-full border rounded-md bgti-background border-black transition-all duration-300">
      <thead>
        <tr className="border rounded-lg bgt-background transition-all duration-300">
          <th className="border px-4 py-2 text-left texttable-foreground">Descripción</th>
          <th className="border px-4 py-2 text-left texttable-foreground">Total</th>
          <th className="border px-4 py-2 text-left texttable-foreground">Tipo</th>
          <th className="border px-4 py-2 text-left texttable-foreground"></th>
        </tr>
      </thead>
      <tbody>
        {Array.isArray(sales) && sales.length > 0 ? (
          sales.map((sale) => (
            <tr
              key={sale.id}
              className="border-b bgt-background texttable-foreground transition-all duration-300"
            >
              <td className="border px-4 py-2 texttable-foreground">
                {sale.description.split("=!$").map((item, index) => (
                  <div key={index}>{item}</div>
                ))}
              </td>
              <td className="border px-4 py-2 texttable-foreground">
                CRC {sale.total.toFixed(2)}
              </td>
              <td className="border px-4 py-2 texttable-foreground">{sale.type}</td>
              <td className="px-1 py-2 flex flex-col items-center">
                <button
                  className="p-2 bg-neutral-900 rounded-md border border-red-500 bgti-background dark:hover:bg-gray-800"
                  onClick={() => handleDelete(sale.id)}
                >
                  <MdDeleteOutline color="red" />
                </button>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="6" className="text-center py-4 text-white text-3xl dark:text-white">
              <FaRegFrownOpen />
            </td>
          </tr>
        )}
      </tbody>
    </table>
  </div>
  

  );
}
