"use client";
export const dynamic = "force-dynamic";
import { useState, useEffect } from "react";
import Navbar from "../../../../app/navigation/navbar";
import TopBar from "../../../../app/navigation/topbar";
import ProductTopBar from "./productTopBar";
import ProductInformation from "./productInformation"
import PurchaseVsSalesChart from "./PurchaseVsSalesChart"
import PriceComparisonPieChart from "./PriceComparisonPieChart"
import { ProductsAPI } from "../../../../services/apiService";
import { useSearchParams } from "next/navigation";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function ProductsPage() {
  const [showNavbar, setShowNavbar] = useState(false);
  const [product, setProduct] = useState(null);
  const searchParams = useSearchParams();
  const productId = searchParams.get("id");

  useEffect(() => {
    const fetchProduct = async () => {
      if (!productId) return;
      try {
        const fetchedProduct = await ProductsAPI.getById(productId);
        setProduct(fetchedProduct);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchProduct();
  }, [productId]);

  /* <ProductInformation p={product} />*/
  return (
    <div className="min-h-screen flex flex-col bg-zinc-100">
      <div
        className={`text-white w-64 transition-all duration-300 ${showNavbar ? "translate-x-0" : "-translate-x-full"
          } fixed top-0 left-0 h-full p-4`}
      >
        <Navbar />
      </div>

      <div className={`flex-1 flex-col transition-all duration-300 ${showNavbar ? "ml-38" : "ml-0"}`}>
        <TopBar showNavbar={showNavbar} toggleNavbar={() => setShowNavbar(!showNavbar)} />

        <div className="h-px bg-black opacity-50"></div>
        <div className="p-4">
          <ProductTopBar />

          {product ? (
            <ProductInformation p={product} />

          ) : (
            <div className="flex flex-col gap-4 mr-4 ml-4 mt-4">
              <SkeletonTheme baseColor="#FFFFFF" highlightColor="#FFC733" className>
                <p>
                  <Skeleton count={12} height={40} />
                </p>
              </SkeletonTheme>
            </div>
          )}
          <div className="flex flex-row">
            <PurchaseVsSalesChart />
            <PriceComparisonPieChart />
          </div>
        </div>

      </div>
    </div>
  );
}
