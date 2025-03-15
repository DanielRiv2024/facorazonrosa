"use client";

import React, { useState, useEffect } from "react";
import Navbar from "@/app/navigation/navbar";
import TopBar from "../../../navigation/topbar";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { TbEditCircle, TbInvoice } from "react-icons/tb";
import { FaRegCheckCircle } from "react-icons/fa";
import { RiPlayListAddLine } from "react-icons/ri";

export default function NewBillingPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [sales, setSales] = useState([]);
  const [extraCost, setExtraCost] = useState("");
  const [showNavbar, setShowNavbar] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [customPrice, setCustomPrice] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  const addProductToList = (product) => {
    setSelectedProduct(product);
    setCustomPrice(product.price);
    setQuantity(1);
  };

  const handlePriceChange = (e) => {
    setCustomPrice(e.target.value);
  };

  const handleQuantityChange = (e) => {
    setQuantity(e.target.value);
  };

  const confirmAddProductToList = () => {
    if (!selectedProduct) return;
    setSales((prevSales) => {
      const existingProduct = prevSales.find(
        (p) => p.id === selectedProduct.id
      );

      if (existingProduct) {
        return prevSales.map((p) =>
          p.id === selectedProduct.id
            ? {
                ...p,
                itemsTotal: p.itemsTotal + parseInt(quantity, 10),
                priceTotal:
                  (p.customPrice + parseFloat(customPrice)) *
                  parseInt(quantity, 10),
              }
            : p
        );
      } else {
        return [
          ...prevSales,
          {
            ...selectedProduct,
            customPrice: parseFloat(customPrice),
            priceTotal: parseFloat(customPrice) * parseInt(quantity, 10),
            itemsTotal: parseInt(quantity, 10),
          },
        ];
      }
    });

    setSelectedProduct(null);
    setCustomPrice("");
    setQuantity(1);
  };

  const removeProductFromList = (id) => {
    setSales((prevSales) => prevSales.filter((p) => p.id !== id));
  };

  return (
    <div className="min-h-screen flex flex-col bg-black">
      <div
        className={`text-white w-64 transition-all duration-300 ${
          showNavbar ? "translate-x-0" : "-translate-x-full"
        } fixed top-0 left-0 h-full p-4`}
      >
        <Navbar />
      </div>

      <div
        className={`flex-1 flex-col transition-all duration-300 ${
          showNavbar ? "ml-64" : "ml-0"
        }`}
      >
        <TopBar
          showNavbar={showNavbar}
          toggleNavbar={() => setShowNavbar(!showNavbar)}
        />

        <div className="h-px bg-white opacity-50"></div>
        <p className="text-2xl font-bold mt-5 ml-5">
          Recuerda utilizar tu código de empleado para facturar
        </p>

        <div className="p-6 space-y-6 text-white">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="border border-white p-4 rounded-md shadow-lg gap-2">
              <p className="mb-2">Busca tu producto...</p>
              <input
                type="text"
                placeholder="Buscar producto"
                className="w-full p-2 border border-white rounded-md text-white bg-neutral-900"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              {loading && (
                <p className="text-white mt-2">Cargando productos...</p>
              )}
              {error && <p className="text-red-500 mt-2">Error: {error}</p>}
              {searchTerm && products.length > 0 && (
                <div className="mt-3 space-y-2">
                  {products
                    .filter((product) =>
                      product.name
                        .toLowerCase()
                        .includes(searchTerm.toLowerCase())
                    )
                    .map((product) => (
                      <div
                        key={product.id}
                        className="p-2 border-b rounded-md flex justify-between items-center cursor-pointer hover:bg-neutral-900"
                        onClick={() => addProductToList(product)}
                      >
                        <div className="flex items-center gap-3">
                          <img
                            src={product.image} 
                            alt={product.name}
                            className="w-12 h-12 object-cover rounded-md"
                          />
                        </div>
                        <span>{product.name}</span>

                        <button className="text-white px-2 py-1 rounded-lg">
                          <RiPlayListAddLine size={20} />
                        </button>
                      </div>
                    ))}
                </div>
              )}
            </div>

            <div className="bg-black p-4 rounded-md border border-white shadow-lg">
              <h2 className="text-white mb-2">Productos Seleccionados</h2>
              <table className="w-full text-white border-collapse">
                <thead>
                  <tr>
                    <th className="border-b p-2 text-left">Producto</th>
                    <th className="text-start border-b p-2">Cantidad</th>
                    <th className="text-start border-b">Precio</th>
                    <th className="text-start border-b"></th>
                  </tr>
                </thead>
                <tbody>
                  {sales.map((sale) => (
                    <tr
                      key={sale.id}
                      className="text-white border-b border-gray-700"
                    >
                      <td className="p-2 text-start">
                        {sale.name || "Producto"}
                      </td>
                      <td className="p-2 text-start">{sale.itemsTotal}</td>
                      <td className="text-right text-start text-green-500">
                        ₡{sale.priceTotal.toFixed(2)}
                      </td>
                      <td className="text-right">
                        <div className="flex flex-row gap-5 items-center justify-center">
                          <button onClick={() => addProductToList(sale)}>
                            <TbEditCircle size={25} color="yellow" />
                          </button>
                          <button
                            onClick={() => removeProductFromList(sale.id)}
                          >
                            <IoMdCloseCircleOutline size={25} color="red" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {selectedProduct && (
        <div className="fixed inset-0 bg-black/85 flex justify-center items-center z-50">
          <div className="bg-black p-6 rounded-xl border-white border w-96">
            <h3 className="text-white font-bold text-lg mb-4">
              Selecciona el precio y cantidad para {selectedProduct.name}
            </h3>
            <input
              type="number"
              value={customPrice}
              onChange={handlePriceChange}
              className="w-full p-2 border border-white rounded-lg text-white bg-neutral-900 mb-4"
            />
            <input
              type="number"
              value={quantity}
              onChange={handleQuantityChange}
              min="1"
              className="w-full p-2 border border-white rounded-lg text-white bg-neutral-900 mb-4"
            />
            <button
              className="bg-green-500 px-4 py-2 rounded-lg"
              onClick={confirmAddProductToList}
            >
              <FaRegCheckCircle size={20} /> Confirmar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
