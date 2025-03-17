"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/app/navigation/navbar";
import TopBar from "@/app/navigation/topbar";
import { FaUber, FaCcVisa, FaCcMastercard } from "react-icons/fa";
import { SlScreenSmartphone } from "react-icons/sl";
import { BsCash } from "react-icons/bs";


const branches = [
  { id: "1", name: "Lindora" },
  { id: "2", name: "Escazu" },
  { id: "3", name: "Sucursal Alajuela" },
];


export default function NewBilling() {
  const [showNavbar, setShowNavbar] = useState(false);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [modalProduct, setModalProduct] = useState(null);
  const [customPrice, setCustomPrice] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [description, setDescription] = useState("");
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
  const router = useRouter();
  const [store, setStore] = useState(branches[0].id);


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
    setDescription("");
  };

  const handleConfirmProduct = () => {
    if (modalProduct) {
      setSelectedProducts([
        ...selectedProducts,
        { ...modalProduct, price: customPrice, quantity, description },
      ]);
      setModalProduct(null);
      setSearch("");
      setFilteredProducts([]);
    }
  };

  const getTotal = () => {
    return selectedProducts.reduce(
      (sum, p) =>
        sum + (parseFloat(p.price) || 0) * (parseInt(p.quantity) || 1),
      0
    );
  };

  const handlePayment = async () => {
    if (!selectedPayment) {
      alert("❌ Selecciona un método de pago.");
      return;
    }

    const description = selectedProducts
      .map((p) => `${p.quantity} ${p.name} CRC${p.price} / ${p.description}`)
      .join("=!$");

    const billingData = {
      idStore: store,
      total: getTotal(),
      description,
      type: selectedPayment,
    };
    try {
      const response = await fetch(
        `https://bacorazonrosa.azurewebsites.net/billing?code=${API_KEY}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(billingData),
        }
      );

      if (!response.ok) throw new Error("Error al procesar el pago");
      router.push("/dashboard/billing");
    } catch (error) {
      console.error("Error:", error);
      alert("❌ Hubo un problema al procesar el pago.");
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

        <div className="bg-black text-white p-6 rounded-lg max-w-md mx-auto border border-white mt-10">
          <h2 className="text-xl font-bold mb-4">Nueva Facturación</h2>
          <select
        className="bg-black text-white border border-white p-2 rounded-lg cursor-pointer"
        value={store}
        onChange={(e) => setStore(e.target.value)}
      >
        {branches.map((branch) => (
          <option key={branch.id} value={branch.id}>
            {branch.name}
          </option>
        ))}
      </select>

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
            <div className="fixed inset-0 bg-black/75 bg-opacity-10 flex items-center justify-center z-50">
              <div className="p-6 bg-neutral-900 text-white border border-white rounded-lg w-96 shadow-lg">
                <h3 className="font-bold text-lg">{modalProduct.name}</h3>

                <p className="text-white mt-4">Cantidad</p>
                <input
                  type="number"
                  min="1"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  className="p-2 bg-black text-white border border-white rounded w-full mt-2"
                  placeholder="Cantidad"
                />

                <p className="text-white mt-4">Precio</p>
                <input
                  type="number"
                  value={customPrice}
                  onChange={(e) => setCustomPrice(e.target.value)}
                  className="p-2 bg-black text-white border border-white rounded w-full mt-2"
                  placeholder="Precio"
                />

                <p className="text-white mt-4">Descripción</p>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="p-2 bg-black text-white border border-white rounded w-full mt-2"
                  placeholder="Descripción del producto"
                />

                <div className="flex justify-between mt-4">
                  <button
                    onClick={() => setModalProduct(null)}
                    className="p-2 bg-red-500 rounded w-1/2 font-bold border border-white mr-2"
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={handleConfirmProduct}
                    className="p-2 bg-green-500 rounded w-1/2 font-bold border border-white"
                  >
                    Agregar
                  </button>
                </div>
              </div>
            </div>
          )}

          <h3 className="text-lg font-bold mt-4">Productos Seleccionados</h3>
          {selectedProducts.map((product, index) => (
            <p key={index}>
              {product.name} x{product.quantity} / {product.description}
            </p>
          ))}

          <p className="text-lg font-bold mt-4">Total: CRC {getTotal()}</p>

          <div className="flex gap-2 mt-4">
            <button
              onClick={() => setSelectedPayment(1)}
              className={`p-2 rounded font-bold flex-1 flex flex-col items-center text-center border border-white ${
                selectedPayment === 1 ? "bg-neutral-800" : "bg-black"
              }`}
            >
              <div className="flex flex-row gap-2 items-center justify-center">
                <FaCcVisa />
                <FaCcMastercard />
              </div>
              Tarjeta
            </button>

            <button
              onClick={() => setSelectedPayment(2)}
              className={`p-2 rounded font-bold flex-1 flex flex-col items-center text-center border border-white ${
                selectedPayment === 2 ? "bg-neutral-800" : "bg-black"
              }`}
            >
              <div className="flex flex-row gap-2 items-center justify-center">
                <SlScreenSmartphone />
              </div>
              Sinpe
            </button>

            <button
              onClick={() => setSelectedPayment(3)}
              className={`p-2 rounded font-bold flex-1 flex flex-col items-center text-center border border-white ${
                selectedPayment === 3 ? "bg-neutral-800" : "bg-black"
              }`}
            >
              <div className="flex flex-row gap-2 items-center justify-center">
                <BsCash />
              </div>
              Efectivo
            </button>

            <button
              onClick={() => setSelectedPayment(4)}
              className={`p-2 rounded font-bold flex-1 flex flex-col items-center text-center border border-white ${
                selectedPayment === 4 ? "bg-neutral-800" : "bg-black"
              }`}
            >
              <div className="flex flex-row gap-2 items-center justify-center">
                <FaUber />
              </div>
              Uber
            </button>
          </div>

          <button
            onClick={handlePayment}
            className="text-black p-2 rounded font-bold w-full mt-4 bg-white flex flex-col items-center justify-center text-center"
          >
            Finalizar y Pagar CRC {getTotal()}
          </button>
        </div>
      </div>
    </div>
  );
}
