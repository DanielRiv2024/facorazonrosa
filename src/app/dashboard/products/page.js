"use client";
import { useState, useEffect } from "react";
import TopBar from "../../../app/navigation/topbar";
import Navbar from "../../../app/navigation/navbar";
import ProductsTopBar from "./productsTopBar";
import ProductsView from "./productsView";
import { ProductsAPI } from "../../../services/apiService"
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function ProductsPage() {
  const [showNavbar, setShowNavbar] = useState(false);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const allProductsNum = products.length;
  const activeProductsNum = products.filter(p => p.status === true).length;
  const inactiveProductsNum = products.filter(p => p.status === false).length;
const [searchTerm, setSearchTerm] = useState("");

const filteredProducts = products.filter(p =>
  p.name.toLowerCase().includes(searchTerm.toLowerCase())
);
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


  return (
   <div className="min-h-screen bg-zinc-100 flex">
  {/* Sidebar / Navbar */}
  <div
    className={`fixed top-0 left-0 h-full w-64 z-10 transition-transform duration-300 ${
      showNavbar ? "translate-x-0" : "-translate-x-full"
    }`}
  >
    <Navbar showNavbar={showNavbar} />
  </div>

  {/* Contenido principal */}
  <div
    className={`flex-1 flex flex-col transition-all duration-300 ${
      showNavbar ? "ml-64" : "ml-0"
    }`}
  >
    {/* TopBar */}
    <TopBar showNavbar={showNavbar} toggleNavbar={() => setShowNavbar(!showNavbar)} />
    <div className="h-px bg-black opacity-50"></div>

    {/* Top bar de productos (estadísticas + búsqueda + agregar) */}
    <ProductsTopBar
      allProductsNum={allProductsNum}
      activeProductsNum={activeProductsNum}
      inactiveProductsNum={inactiveProductsNum}
      onSearch={setSearchTerm}
    />

    {/* Contenido de productos */}
    <div className="p-4">
      {loading ? (
        <div className="flex flex-col gap-4">
          <SkeletonTheme baseColor="#FFFFFF" highlightColor="#FFC733">
            <Skeleton count={12} height={40} />
          </SkeletonTheme>
        </div>
      ) : error ? (
        <p className="text-red-500">Error: {error}</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {products
            .filter((p) => p.name.toLowerCase().includes(searchTerm.toLowerCase()))
            .map((product) => (
              <ProductsView key={product.id} p={product} />
            ))}
        </div>
      )}
    </div>
  </div>
</div>

  );
}
