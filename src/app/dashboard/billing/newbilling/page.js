"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/app/navigation/navbar";
import TopBar from "@/app/navigation/topbar";
import { FaUber } from "react-icons/fa";

export default function NewBilling() {
  const [showNavbar, setShowNavbar] = useState(true);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [modalProduct, setModalProduct] = useState(null);
  const [customPrice, setCustomPrice] = useState("");
  const [quantity, setQuantity] = useState(1);
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
  const API_BILLING = process.NEXT_PUBLIC_API_URL_BILLING;
  const router = useRouter();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`${API_URL}?code=${API_KEY}`);
        if (!response.ok) throw new Error("Error al obtener productos");
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Error:", error);
        alert("❌ No se pudieron cargar los productos.");
      }
    };
    fetchProducts();
  }, []);

  const handleSearch = (e) => {
    setSearch(e.target.value);
    setFilteredProducts(
      products.filter((p) =>
        p.name.toLowerCase().includes(e.target.value.toLowerCase())
      )
    );
  };

  const handleSelectProduct = (product) => {
    setModalProduct(product);
    setCustomPrice(product.price);
    setQuantity(1);
  };

  const handleConfirmProduct = () => {
    if (modalProduct) {
      setSelectedProducts([
        ...selectedProducts,
        { ...modalProduct, price: customPrice, quantity },
      ]);
      setModalProduct(null);
      setSearch("");
      setFilteredProducts([]);
    }
  };

  const getTotal = () => {
    return selectedProducts.reduce(
      (sum, p) => sum + (parseFloat(p.price) || 0) * (parseInt(p.quantity) || 1),
      0
    );
  };

  const handlePayment = async () => {
    if (!selectedPayment) {
      alert("❌ Selecciona un método de pago.");
      return;
    }

    const description = selectedProducts
      .map((p) => `${p.name} x${p.quantity} = CRC ${p.price * p.quantity}`)
      .join("=!$");

    const billingData = {
      idStore: "1",
      total: getTotal(),
      description,
      type: selectedPayment,
    };

    console.log(billingData)
    try {
      const response = await fetch(`https://bacorazonrosa.azurewebsites.net/billing?code=${API_KEY}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(billingData),
      });

      if (!response.ok) throw new Error("Error al procesar el pago");
      router.push("/dashboard/billing");
    } catch (error) {
      console.error("Error:", error);
      alert("❌ Hubo un problema al procesar el pago.");
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

        <div className="bg-black text-white p-6 rounded-lg max-w-md mx-auto border border-white">
          <h2 className="text-xl font-bold mb-4">Nueva Facturación</h2>

          <input
            type="text"
            placeholder="Buscar producto..."
            value={search}
            onChange={handleSearch}
            className="p-2 bg-gray-800 text-white border border-gray-600 rounded w-full mb-2"
          />

          {filteredProducts.map((product) => (
            <button
              key={product.id}
              onClick={() => handleSelectProduct(product)}
              className="p-2 bg-gray-700 text-white border border-gray-500 rounded w-full text-left"
            >
              {product.name} - CRC {product.price}
            </button>
          ))}

          {modalProduct && (
            <div className="p-4 bg-gray-900 text-white border border-white rounded mt-4">
              <h3 className="font-bold">{modalProduct.name}</h3>
              <input
                type="number"
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                className="p-2 bg-gray-800 text-white border border-gray-600 rounded w-full mt-2"
                placeholder="Cantidad"
              />
              <input
                type="number"
                value={customPrice}
                onChange={(e) => setCustomPrice(e.target.value)}
                className="p-2 bg-gray-800 text-white border border-gray-600 rounded w-full mt-2"
                placeholder="Precio"
              />
              <button
                onClick={handleConfirmProduct}
                className="p-2 bg-green-500 rounded mt-2 w-full font-bold"
              >
                Agregar
              </button>
            </div>
          )}

          <h3 className="text-lg font-bold mt-4">Productos Seleccionados</h3>
          {selectedProducts.map((product, index) => (
            <p key={index}>{product.name} x{product.quantity} - CRC {product.price}</p>
          ))}

          <p className="text-lg font-bold mt-4">Total: CRC {getTotal()}</p>

          <div className="flex gap-2 mt-4">
            <button onClick={() => setSelectedPayment(1)} className={`p-2 rounded font-bold w-full ${selectedPayment === 1 ? "bg-blue-600" : "bg-blue-500"}`}>💳 Tarjeta</button>
            <button onClick={() => setSelectedPayment(2)} className={`p-2 rounded font-bold w-full ${selectedPayment === 2 ? "bg-purple-600" : "bg-purple-500"}`}>📲 Sinpe Móvil</button>
            <button onClick={() => setSelectedPayment(3)} className={`p-2 rounded font-bold w-full ${selectedPayment === 3 ? "bg-orange-600" : "bg-orange-500"}`}>💵 Efectivo</button>
            <button onClick={() => setSelectedPayment(4)} className={`p-2 rounded font-bold w-full ${selectedPayment === 4 ? "bg-black" : "bg-neutral-500"}`}><FaUber /> Uber</button>
          </div>

          <button onClick={handlePayment} className="text-black p-2 rounded font-bold w-full mt-4 bg-white">🏁 Finalizar y Pagar</button>
        </div>
      </div>
    </div>
  );
}
