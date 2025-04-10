"use client"

import { useState } from "react";
import Navbar from "../../../navigation/navbar";
import TopBar from "../../../app/navigation/topbar";

export default function LossReport() {
  const [showNavbar, setShowNavbar] = useState(true);
  const [formData, setFormData] = useState({
    lossType: "",
    quantity: "",
    description: "",
    lossValue: "",
    image: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({ ...prev, image: e.target.files[0] }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Aquí puedes manejar el envío del formulario, como enviarlo a un backend
  };

  return (
    <div className="min-h-screen flex flex-col bg-black text-white">
      <div
        className={`w-64 transition-all duration-300 ${showNavbar ? "translate-x-0" : "-translate-x-full"} fixed top-0 left-0 h-full p-4`}
      >
        <Navbar />
      </div>

      <div className={`flex-1 flex-col transition-all duration-300 ${showNavbar ? "ml-64" : "ml-0"}`}>
        <TopBar showNavbar={showNavbar} toggleNavbar={() => setShowNavbar(!showNavbar)} />
        <div className="h-px bg-white opacity-50"></div>


        <div className="p-4">
          <h2 className="text-xl font-bold">Reporte de Pérdidas</h2>
          <form onSubmit={handleSubmit} className="mt-4 space-y-4">
            <div>
              <label className="block">Tipo de Pérdida:</label>
              <input
                type="text"
                name="lossType"
                value={formData.lossType}
                onChange={handleChange}
                className="w-full p-2 text-white rounded bg-neutral-900"
                required
              />
            </div>
            <div>
              <label className="block">Cantidad:</label>
              <input
                type="number"
                name="quantity"
                value={formData.quantity}
                onChange={handleChange}
                className="w-full p-2 text-white rounded bg-neutral-900"
                required
              />
            </div>
            <div>
              <label className="block">Descripción:</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="w-full p-2 text-white rounded bg-neutral-900"
                required
              ></textarea>
            </div>
            <div>
              <label className="block">Valor de la Pérdida ($):</label>
              <input
                type="number"
                name="lossValue"
                value={formData.lossValue}
                onChange={handleChange}
                className="w-full p-2 text-white rounded bg-neutral-900"
                required
              />
            </div>
            <div>
              <label className="block">Adjuntar Imagen:</label>
              <input
                type="file"
                name="image"
                onChange={handleFileChange}
                className="w-full p-2 text-white rounded bg-neutral-900"
                accept="image/*"
              />
            </div>
            <div>
            <button type="submit" className="w-full bg-red-600 px-4 py-2 rounded text-white">
              Reportar Pérdida
            </button>
            </div>
            
          </form>
        </div>
      </div>
    </div>
  );
}
