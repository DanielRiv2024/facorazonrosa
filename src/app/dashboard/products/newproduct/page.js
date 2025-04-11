"use client";
import { useState } from "react";
import { useRouter } from "next/navigation"; 
import Navbar from "../../../../app/navigation/navbar";
import TopBar from "../../../../app/navigation/topbar";

export default function NewProduct() {
  const [showNavbar, setShowNavbar] = useState(true);
  const router = useRouter();

  // Estados del formulario
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [categories, setCategories] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [status, setStatus] = useState("disponible");
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
  // Manejo de formulario
  const handleSubmit = async (e) => {
    e.preventDefault();

    const categoriesArray = categories.split(",").map((c) => parseInt(c.trim()));

    const productData = {
      name,
      price: parseFloat(price),
      categories: categoriesArray,
      description,
      image,
      status: status === "disponible",
    };

    try {
      const response = await fetch(`${API_URL}?code=${API_KEY}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(productData),
      });

      if (!response.ok) {
        throw new Error("Error al agregar el producto");
      }

      alert("✅ Producto agregado con éxito!");
      router.push("/dashboard/products");

    } catch (error) {
      console.error("Error:", error);
      alert("❌ Hubo un problema al agregar el producto");
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-black">
      <div className={`text-white w-64 transition-all duration-300 ${showNavbar ? "translate-x-0" : "translate-x-[-100%]"}`}>
        <Navbar showNavbar={showNavbar} />
      </div>

      <div className={`flex flex-col transition-all duration-300 ${showNavbar ? "ml-64" : "ml-0"}`}>
        <TopBar showNavbar={showNavbar} toggleNavbar={() => setShowNavbar(!showNavbar)} />
        <div className="h-px bg-white opacity-50"></div>
        <div className="p-4">
        <h2 className="text-xl font-bold mb-4">Agregar Nuevo Producto</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input type="text" placeholder="Nombre" className="p-2 bg-neutral-900 text-white   rounded"
              value={name} onChange={(e) => setName(e.target.value)} required />

            <input type="number" placeholder="Precio" className="p-2 bg-neutral-900 text-white   rounded"
              value={price} onChange={(e) => setPrice(e.target.value)} required />

            <input type="text" placeholder="Categorías (Ej: 1,2,3)" className="p-2 bg-neutral-900 text-white   rounded"
              value={categories} onChange={(e) => setCategories(e.target.value)} required />

            <textarea placeholder="Descripción" className="p-2 bg-neutral-900 text-white   rounded"
              value={description} onChange={(e) => setDescription(e.target.value)} required />

            <input type="text" placeholder="URL de la imagen" className="p-2 bg-neutral-900 text-white   rounded"
              value={image} onChange={(e) => setImage(e.target.value)} required />

            <select className="p-2 bg-neutral-900 text-white   rounded"
              value={status} onChange={(e) => setStatus(e.target.value)}>
              <option value="disponible">Disponible</option>
              <option value="agotado">Agotado</option>
            </select>

            <button type="submit" className="bg-white text-black p-2 rounded font-bold">Agregar Producto</button>
          </form>
        </div>
       
      </div>
    </div>
  );
}