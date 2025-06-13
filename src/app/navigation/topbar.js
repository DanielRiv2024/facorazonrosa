"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { FaMoon } from "react-icons/fa";
import {
  IoIosNotifications,
  IoIosArrowForward,
  IoIosArrowBack,
} from "react-icons/io";
import { SiLibretranslate } from "react-icons/si";
import { getUserFromCookies } from "../../app/utils/auth";
import ThemeToggle from "../components/ThemeToggle";
import useTheme from "../hooks/useTheme";

export default function TopBar({ showNavbar, toggleNavbar }) {
  const router = useRouter();
  const pathname = usePathname();
  const [userData, setUserData] = useState(null);
  const [store, setStore] = useState(null);
  const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

  const { theme, toggleTheme } = useTheme();

  const breadcrumbs = pathname
    .split("/")
    .filter((segment) => segment)
    .map((segment, index, arr) => ({
      name: segment.charAt(0).toUpperCase() + segment.slice(1),
      path: "/" + arr.slice(0, index + 1).join("/"),
    }));

  useEffect(() => {
    const user = getUserFromCookies();
    if (!user) {
      router.push("/");
    } else {
      setUserData(user);
    }
  }, []);

  useEffect(() => {
    console.log("llamando la funcion");
    const userCode = localStorage.getItem("userCode"); // Recuperamos el userCode del localStorage
    if (userCode) {
      fetchStoreId(userCode);
    }
  }, []);

  const fetchStoreId = async (userCode) => {
    try {
      const response = await fetch(
        `https://backendproductioncorazonrosa.azurewebsites.net/api/users/${userCode}/storeId?code=${API_KEY}`
      );
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      const data = await response.json();
      setStore(data.storeId);
      console.log(data); // Asignamos el storeId obtenido de la respuesta
    } catch (err) {
      console.error("Error obteniendo storeId:", err);
      setError("No se pudo obtener el storeId.");
    }
  };

  return (
    <div className="bg-background text-white p-4 flex flex-row items-center justify-between gap-4 transition-all duration-800">
      <div className="flex items-center gap-4">
        <button
          onClick={toggleNavbar}
          className="p-2 hover:sbg-background rounded-lg"
        >
          {showNavbar ? (
            <IoIosArrowBack size={24} className="text-foreground" />
          ) : (
            <IoIosArrowForward size={24} className="text-foreground" />
          )}
        </button>
        <nav className="hidden sm:flex items-center gap-1">
          {breadcrumbs.map((crumb, index) => (
            <div key={crumb.path} className="flex items-center text-foreground transition-all duration-800">
              {index > 0 && (
                <IoIosArrowForward size={10} className="mx-1 text-foreground transition-all duration-800" />
              )}
              <span
                className="text-foreground cursor-pointer hover:underline"
                onClick={() => router.push(crumb.path)}
              >
                {crumb.name}
              </span>
            </div>
          ))}
        </nav>
      </div>
      <div>
        <p className="text-foreground">
          {store === "1"
            ? "Lindora"
            : store === "2"
            ? "Escazú"
            : "Tienda desconocida"}
        </p>
      </div>
      {/* Sección derecha: Íconos siempre visibles */}
      <div className="flex flex-row gap-4 items-center">
        <button className="hidden sm:block">
          <SiLibretranslate size={25} className="text-foreground" />
        </button>
        <button>
          <IoIosNotifications size={25} className="text-foreground" />
        </button>
        <ThemeToggle />
        <div
          onClick={() => router.push("/profile/user")}
          className="cursor-pointer"
        >
          <img
            src={
              userData && userData.userImage
                ? userData.userImage
                : "https://static.wixstatic.com/media/2e2561_bb3e95000dc34a2bbd3b767828642f5a~mv2.png"
            }
            alt="Perfil"
            className="w-8 h-8 rounded-full object-cover"
          />
        </div>
      </div>
    </div>
  );
}
