"use client";
import { useState, useEffect } from "react";
import TopBar from "../../../app/navigation/topbar";
import Navbar from "../../../app/navigation/navbar";
import ProductsTopBar from "./productsTopBar";
import ProductsView from "./productsView";
import { ProductsAPI } from "../../../services/apiService"

export default function ProductsPage() {
  const [showNavbar, setShowNavbar] = useState(false);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const allProductsNum = products.length;
  const activeProductsNum = products.filter(p => p.status === true).length;
  const inactiveProductsNum = products.filter(p => p.status === false).length;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const result = await ProductsAPI.getAll();
        setProducts(result);
      } catch (err) {
        setError(err.message || 'Error al cargar productos');
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    console.log(id)
    if (!window.confirm("¿Seguro que quieres eliminar este producto?")) return;

    try {
      await ProductsAPI.deleteById(id);
      window.location.reload();
    } catch (error) {
      alert("❌ Hubo un problema al eliminar el producto");
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-zinc-100">
      <div
        className={`text-white w-64 transition-all duration-300 ${showNavbar ? "translate-x-0" : "translate-x-[-100%]"
          }`}>
        <Navbar showNavbar={showNavbar} />
      </div>
      <div
        className={`flex flex-col transition-all duration-300 ${showNavbar ? "ml-64" : "ml-0"
          }`}>
        <TopBar
          showNavbar={showNavbar}
          toggleNavbar={() => setShowNavbar(!showNavbar)}/>
        <div className="h-px bg-black opacity-50"></div>
        <ProductsTopBar
          allProductsNum={allProductsNum}
          activeProductsNum={activeProductsNum}
          inactiveProductsNum={inactiveProductsNum}/>
        {loading ? (
          <p className="text-white p-4">Cargando productos...</p>
        ) : error ? (
          <p className="text-red-500 p-4">Error: {error}</p>
        ) : (
          <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {products.map((product) => (
              <ProductsView key={product._id} p={product} onDelete={handleDelete} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
