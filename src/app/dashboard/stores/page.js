"use client";
import { useState } from "react";
import Navbar from "../../../app/navigation/navbar";
import TopBar from "../../..app/navigation/topbar";
import StoreBoxView from "./storeBoxView";






export default function SummaryPage() {
  const [showNavbar, setShowNavbar] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-black">
      <div
        className={`text-white w-64 transition-all duration-300 ${
          showNavbar ? "translate-x-0" : "-translate-x-full"
        } fixed top-0 left-0 h-full p-4`}
      ><Navbar/>
      </div>

      <div className={`flex-1 flex-col transition-all duration-300 ${showNavbar ? "ml-64" : "ml-0"}`}>
        <TopBar showNavbar={showNavbar} toggleNavbar={() => setShowNavbar(!showNavbar)} />

        <div className="h-px bg-white opacity-50"></div>
        <div className="p-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      {stores.map((store) => (
        <StoreBoxView key={store.id} store={store} />
      ))}
    </div>
        </div>
      </div>
    </div>
  );
}




const stores = [
  {
    id: 1,
    name: "Sucursal Lindora",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6VV4F1A_Z78LqQZgKHjb0uSYrERCmUKdOig&s", // URL de la imagen
    staffCount: 10,
    dailySales: 125000.50,
  },
  {
    id: 2,
    name: "Sucursal Escazu",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTsbHpAYgr7DYeIFtcdcTvFDDpErUvfsWDAmQ&s",
    staffCount: 8,
    dailySales: 98000.75,
  },
  {
    id: 1,
    name: "Sucursal Multiplaza Escazu",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRIDTHfN185AcykHHaGQYNPT8LA8nUgQMQqbuX-sX-HU11LQ_EUmNm3hE2lXQqzQKupV1s&usqp=CAU", // URL de la imagen
    staffCount: 10,
    dailySales: 125000.50,
  },
];