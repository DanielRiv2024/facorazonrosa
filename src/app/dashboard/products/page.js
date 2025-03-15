"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import TopBar from "@/app/navigation/topbar";
import Navbar from "@/app/navigation/navbar";
import ProductsTopBar from "./productsTopBar";

export default function ProductsPage() {
  const [showNavbar, setShowNavbar] = useState(true);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`${API_URL}?code=${API_KEY}`);

        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }

        const data = await response.json();
        setProducts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("¿Seguro que quieres eliminar este producto?")) return;

    try {
      const response = await fetch(`${API_URL}/${id}?code=${API_KEY}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Error al eliminar el producto");
      }

      alert("✅ Producto eliminado con éxito!");
      window.location.reload();
    } catch (error) {
      console.error("Error:", error);
      alert("❌ Hubo un problema al eliminar el producto");
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-black">
      <div
        className={`text-white w-64 transition-all duration-300 ${
          showNavbar ? "translate-x-0" : "translate-x-[-100%]"
        }`}
      >
        <Navbar showNavbar={showNavbar} />
      </div>

      <div
        className={`flex flex-col transition-all duration-300 ${
          showNavbar ? "ml-64" : "ml-0"
        }`}
      >
        <TopBar
          showNavbar={showNavbar}
          toggleNavbar={() => setShowNavbar(!showNavbar)}
        />
        <div className="h-px bg-white opacity-50"></div>
        <ProductsTopBar />

        {loading ? (
          <p className="text-white p-4">Cargando productos...</p>
        ) : error ? (
          <p className="text-red-500 p-4">Error: {error}</p>
        ) : (
          <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {products.map((product) => (
              <div
                key={product.id}
                className="border border-gray-700 p-4 rounded-lg shadow-md hover:shadow-lg transition-all cursor-pointer flex flex-col items-center justify-center"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-32 h-32 object-cover rounded-md"
                />
                <h2 className="text-white text-lg font-semibold mt-2">
                  {product.name}
                </h2>
                <p className="text-gray-400 text-sm">{product.description}</p>
                <div className="flex justify-between items-center mt-2">
                  <span
                    className={`text-sm ${
                      product.status ? "text-green-500" : "text-red-500"
                    }`}
                  >
                    {product.status ? "Disponible" : "Agotado"}
                  </span>
                </div>
                <button
                  onClick={() => handleDelete(product.id)}
                  className="mt-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md"
                >
                  Eliminar
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
