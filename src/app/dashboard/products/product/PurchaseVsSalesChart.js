"use client";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "Lun", compras: 2, perdidas: 1, ventas: 1 },
  { name: "Mar", compras: 1, perdidas: 0, ventas: 2 },
  { name: "Mié", compras: 0, perdidas: 0, ventas: 3 },
  { name: "Jue", compras: 3, perdidas: 1, ventas: 1 },
  { name: "Vie", compras: 0, perdidas: 0, ventas: 2 },
  { name: "Sáb", compras: 2, perdidas: 1, ventas: 1 },
  { name: "Dom", compras: 1, perdidas: 2, ventas: 0 },
];

export default function PurchaseVsSalesChart() {
  return (
    <div className="bg-white rounded-xl shadow-md p-4 w-4xl h-[350px] mb-10">
      <h2 className="text-xl font-semibold mb-4 text-gray-700">Resumen semanal</h2>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="compras"
            stroke="#8884d8"
            strokeWidth={2}
            name="Compras"
          />
          <Line
            type="monotone"
            dataKey="perdidas"
            stroke="#ff4d4f"
            strokeWidth={2}
            name="Pérdidas"
          />
          <Line
            type="monotone"
            dataKey="ventas"
            stroke="#00C49F"
            strokeWidth={2}
            name="Ventas"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
