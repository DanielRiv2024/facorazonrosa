import React from "react";

export default function BillingTable({ sales }) {
  return (
    <div className="overflow-x-auto bg-black rounded-lg shadow-md p-4">
      <table className="min-w-full border border-gray-300">
        <thead>
          <tr className="bg-neutral-900">
            <th className="border px-4 py-2 text-left text-white">Fecha y Hora</th>
            <th className="border px-4 py-2 text-left text-white">Sucursal</th>
           
            <th className="border px-4 py-2 text-left text-white">Descripción</th>
            <th className="border px-4 py-2 text-left text-white">Total</th>
            <th className="border px-4 py-2 text-left text-white">Tipo</th>
          </tr>
        </thead>
        <tbody>
  {Array.isArray(sales) && sales.length > 0 ? (
    sales.map((sale) => (
      <tr key={sale.id} className="border-b text-white hover:bg-gray-800">
        <td className="border px-4 py-2 text-white">
          {new Date(sale.date).toLocaleString()}
        </td>
        <td className="border px-4 py-2 text-white">{sale.idStore}</td>
       
        <td className="border px-4 py-2 text-white">
  {sale.description.split("=!$").map((item, index) => (
    <div key={index}>{item}</div>
  ))}
</td>
<td className="border px-4 py-2 text-white">CRC {sale.total.toFixed(2)}</td>
        <td className="border px-4 py-2">{sale.type}</td>
      </tr>
    ))
  ) : (
    <tr>
      <td colSpan="5" className="text-center py-4">
        No billing records found.
      </td>
    </tr>
  )}
</tbody>

      </table>
    </div>
  );
}
