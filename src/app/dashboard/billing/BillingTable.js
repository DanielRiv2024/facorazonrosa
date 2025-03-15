import React from "react";

export default function BillingTable({ sales }) {
  return (
    <div className="overflow-x-auto bg-black rounded-lg shadow-md p-4">
      <table className="min-w-full border border-gray-300">
        <thead>
          <tr className="bg-neutral-900">
            <th className="border px-4 py-2 text-left">Fecha y Hora</th>
            <th className="border px-4 py-2 text-left">Sucursal</th>
            <th className="border px-4 py-2 text-left">Total</th>
            <th className="border px-4 py-2 text-left">Descripción</th>
            <th className="border px-4 py-2 text-left">Tipo</th>
          </tr>
        </thead>
        <tbody>
          {sales.length > 0 ? (
            sales.map((sale) => (
              <tr key={sale.id} className="border-b hover:bg-gray-100">
                <td className="border px-4 py-2">
                  {new Date(sale.date).toLocaleString()}
                </td>
                <td className="border px-4 py-2">{sale.idStore}</td>
                <td className="border px-4 py-2">${sale.total.toFixed(2)}</td>
                <td className="border px-4 py-2">{sale.description}</td>
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
