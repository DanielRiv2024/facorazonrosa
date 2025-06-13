"use client";
import { useState } from "react";
import { useRouter } from "next/navigation"; 
import Navbar from "../../../../app/navigation/navbar";
import TopBar from "../../../../app/navigation/topbar";
import { ProductsAPI } from "../../../../services/apiService";

export default function NewProduct() {
  const [showNavbar, setShowNavbar] = useState(false);
  const router = useRouter();
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [categories, setCategories] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [status, setStatus] = useState("disponible");

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
     const result = await ProductsAPI.create(productData);
      router.push("/dashboard/products");
    } catch (err) {
     alert("❌ Hubo un problema al agregar el producto");
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-zinc-100">
      <div className={`text-black text-sm w-64 transition-all duration-300 ${showNavbar ? "translate-x-0" : "translate-x-[-100%]"}`}>
        <Navbar showNavbar={showNavbar} />
        
      </div>
      <div className={`flex flex-col transition-all duration-300 ${showNavbar ? "ml-64" : "ml-0"}`}>
        <TopBar showNavbar={showNavbar} toggleNavbar={() => setShowNavbar(!showNavbar)} />
        <div className="h-px bg-black opacity-50"></div>
        <div className="rounded-2xl shadow-lg bg-white p-2 m-2">
        <h2 className="text-xl text-center font-bold text-black text-sm mb-4">Agregar Nuevo Producto</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input type="text" placeholder="Nombre" className="p-2 bg-zinc-100 text-black text-sm   rounded"
              value={name} onChange={(e) => setName(e.target.value)} required />

            <input type="number" placeholder="Precio" className="p-2 bg-zinc-100 text-black text-sm   rounded"
              value={price} onChange={(e) => setPrice(e.target.value)} required />

            <input type="text" placeholder="Categorías (Ej: 1,2,3)" className="p-2 bg-zinc-100 text-black text-sm   rounded"
              value={categories} onChange={(e) => setCategories(e.target.value)} required />

            <textarea placeholder="Descripción" className="p-2 bg-zinc-100 text-black text-sm   rounded"
              value={description} onChange={(e) => setDescription(e.target.value)} required />

            <input type="text" placeholder="URL de la imagen" className="p-2 bg-zinc-100 text-black text-sm   rounded"
              value={image} onChange={(e) => setImage(e.target.value)} required />

            <select className="p-2 bg-zinc-100 text-black text-sm   rounded"
              value={status} onChange={(e) => setStatus(e.target.value)}>
              <option value="disponible">Disponible</option>
              <option value="agotado">Agotado</option>
            </select>

            <button type="submit" className="bg-amber-400 text-white text-sm p-2 rounded font-bold">Agregar Producto</button>
          </form>
        </div>
       
      </div>
    </div>
  );
}