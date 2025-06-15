"use client";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";

const priceData = [
  { name: "Inverflora", precio: 300 },
  { name: "Osito", precio: 250 },
  { name: "Valle", precio: 270 },
  { name: "Guarco", precio: 320 },
  { name: "Daflor", precio: 280 },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8"];

export default function PriceComparisonPieChart() {
  return (
    <div className="bg-white rounded-xl shadow-md h-[350px] p-4 w-full max-w-md mx-auto">
      <h2 className="text-xl font-semibold mb-4 text-gray-700 text-center">
        Comparación de precios por proveedor
      </h2>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={priceData}
            dataKey="precio"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={100}
            fill="#8884d8"
            label
          >
            {priceData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend verticalAlign="bottom" height={36} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
