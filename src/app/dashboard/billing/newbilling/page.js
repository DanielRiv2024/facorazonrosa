"use client";

import React, { useState } from "react";
import Navbar from "@/app/navigation/navbar";
import TopBar from "../../../navigation/topbar";
import products from "@/app/fakedata/productsfake";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { TbEditCircle } from "react-icons/tb";
import { TbInvoice } from "react-icons/tb";
import { FaRegCheckCircle } from "react-icons/fa";

import { FaShoppingCart } from "react-icons/fa";
import { FaRunning } from "react-icons/fa";
import { RiPlayListAddLine } from "react-icons/ri";

export default function NewBillingPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [sales, setSales] = React.useState([]);
  const [extraCost, setExtraCost] = React.useState("");
  const [showNavbar, setShowNavbar] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState(null); // Estado para el producto seleccionado
  const [customPrice, setCustomPrice] = useState(""); // Estado para el precio personalizado
  const [quantity, setQuantity] = useState(1); // Estado para la cantidad seleccionada

  const addProductToList = (product) => {
    setSelectedProduct(product); // Almacena el producto en el estado para mostrar el modal
    setCustomPrice(product.price); // Asigna el precio base al input del modal
    setQuantity(1); // Por defecto la cantidad será 1
  };
  
  
  

  const handlePriceChange = (e) => {
    setCustomPrice(e.target.value);
  };

  const handleQuantityChange = (e) => {
    setQuantity(e.target.value);
  };

  const confirmPriceAndQuantity = () => {
    if (selectedProduct && customPrice && quantity > 0) {
      setSales((prevSales) =>
        prevSales.map((p) =>
          p.id === selectedProduct.id
            ? {
                ...p,
                customPrice: parseFloat(customPrice),
                priceTotal: parseFloat(customPrice) * quantity,
                itemsTotal: quantity,
              }
            : p
        )
      );
      setSelectedProduct(null);
      setCustomPrice("");
      setQuantity(1);
    }
  };
  const confirmAddProductToList = () => {
    if (!selectedProduct) return; // Asegurar que haya un producto seleccionado
    setSales((prevSales) => {
      const existingProduct = prevSales.find((p) => p.id === selectedProduct.id);
  
      if (existingProduct) {
        // Si ya existe, actualiza cantidad y precio total
        return prevSales.map((p) =>
          p.id === selectedProduct.id
            ? {
                ...p,
                itemsTotal: p.itemsTotal + parseInt(quantity, 10),
                priceTotal: (p.customPrice + parseFloat(customPrice)) * parseInt(quantity, 10),
              }
            : p
        );
      } else {
        // Si no existe, lo agrega como un nuevo producto
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
  
    // Resetear los valores después de agregar el producto
    setSelectedProduct(null);
    setCustomPrice("");
    setQuantity(1);
  }
  
  

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

      {/* Contenido Principal */}
      <div
        className={`flex-1 flex-col transition-all duration-300 ${
          showNavbar ? "ml-64" : "ml-0"
        }`}
      >
        {/* Barra superior con menú y breadcrumbs */}
        <TopBar
          showNavbar={showNavbar}
          toggleNavbar={() => setShowNavbar(!showNavbar)}
        />

        <div className="h-px bg-white opacity-50"></div>
        <p className="text-2xl font-bold mt-5  ml-5">
          Recuerda utilizar tu codigo de empleado para facturar
        </p>
        <div className="p-6 space-y-6 text-white">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className=" border border-white  p-4 rounded-md shadow-lg gap-2">
              <p className="mb-2">Busca tu producto...</p>
              <input
                type="text"
                placeholder="Buscar producto"
                className="w-full p-2  border border-white rounded-md text-white bg-neutral-900"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              {searchTerm && (
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
                        <span>{product.name}</span>
                        <button className="text-white px-2 py-1 rounded-lg">
                          <RiPlayListAddLine size={20} />
                        </button>
                      </div>
                    ))}
                </div>
              )}
            </div>

            <div className="bg-black  p-4 rounded-md border border-white shadow-lg">
              <h2 className="text-white mb-2">Productos Seleccionados</h2>
              <table className="w-full text-white border-collapse">
                <thead>
                  <tr>
                    <th className="border-b p-2 text-left">Producto</th>
                    <th className="text-start border-b p-2">Cantidad</th>
                    <th className="text-start  border-b">Precio</th>
                    <th className="text-start  border-b"></th>
                  </tr>
                </thead>
                <tbody>
                  {sales.map((sale) => (
                    <tr
                      key={sale.id}
                      className="text-white border-b border-gray-700"
                    >
                      <td className="p-2 text-start">{sale.name || "Producto"}</td>
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
                            className=""
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
              <div className="flex flex-col items-center text-white mt-4">
                <button className="w-full py-1 bg-white text-black font-bold rounded-lg flex items-center justify-center gap-2 hover:bg-gray-300 transition">
  <TbInvoice size={30} />
  Facturar  ₡
                  {sales.reduce((sum, p) => sum + p.priceTotal, 0) +
                    (Number(extraCost) || 0)}
</button>

                
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal para elegir el precio y cantidad */}
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
              placeholder="Precio personalizado"
              className="w-full p-2 border border-white rounded-lg text-white bg-neutral-900 mb-4"
            />
            <input
              type="number"
              value={quantity}
              onChange={handleQuantityChange}
              min="1"
              placeholder="Cantidad"
              className="w-full p-2 border border-white rounded-lg text-white bg-neutral-900 mb-4"
            />
            <div className="flex justify-between">
              <button
                className="bg-red-500 text-white px-4 py-2 rounded-lg flex flex-row items-center gap-2"
                onClick={() => setSelectedProduct(null)} // Cerrar el modal sin seleccionar un precio
              >
                <IoMdCloseCircleOutline size={20}/>
                Cancelar
              </button>
              <button
  className="bg-green-500 text-white px-4 py-2 rounded-lg flex flex-row items-center gap-2"
  onClick={confirmAddProductToList} // Ahora usa la función corregida
>
  <FaRegCheckCircle size={20} />
  Confirmar
</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

