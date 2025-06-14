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

    const handleEdit = async (p) => {
  console.log(p)
  };

  return (
    <div className="min-h-screen flex flex-col bg-zinc-100">
      <div
        className={`text-white  transition-all duration-300 ${showNavbar ? "translate-x-0" : "translate-x-[-100%]"
          }`}>
        <Navbar showNavbar={showNavbar} />
      </div>
      <div
        className={`flex flex-col transition-all duration-300 ${showNavbar ? "ml-38" : "ml-0"
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
           <div className="flex flex-col gap-4 mr-4 ml-4 mt-4">
                        <SkeletonTheme baseColor="#FFFFFF" highlightColor="#FFC733" className>
                          <p>
                            <Skeleton count={12} height={40}/>
                          </p>
                        </SkeletonTheme>
                      </div>
        ) : error ? (
          <p className="text-red-500 p-4">Error: {error}</p>
        ) : (
          <div className="p-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {products.map((product) => (
              <ProductsView key={product._id} p={product}/>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
