"use client";
import { useState, useEffect } from "react";
import Navbar from "@/app/navigation/navbar";
import TopBar from "../../navigation/topbar";
import { getUserFromCookies } from "@/app/utils/auth";
import { useRouter } from "next/navigation";
import { CiSaveUp1 } from "react-icons/ci";

export default function UserPage() {
  const [showNavbar, setShowNavbar] = useState(false);
  const [userData, setUserData] = useState(null);
  const router = useRouter();
  const API_KEY = process.env.NEXT_PUBLIC_API_KEY;



  useEffect(() => {
    const user = getUserFromCookies();
    if (!user) {
      router.push("/");
    } else {
      setUserData(user);
    }
  }, []);

  const handleLogout = () => {
    // Eliminar la cookie estableciendo su fecha de expiración en el pasado
    document.cookie = "user=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
    // Redirigir al usuario a la página de inicio
    router.push("/");
  };

  const handleStoreIdChange = (event) => {
    setUserData({
      ...userData,
      storeId: event.target.value,
    });
  };

  const handleUpdateStoreId = async () => {
    const response = await fetch(
      `https://bacorazonrosa.azurewebsites.net/api/users/${userData.userCode}/storeId?code=${API_KEY}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          storeId: userData.storeId,
        }),
      }
    );

    if (response.ok) {
      // Actualización exitosa
      alert("Sucursal actualizada correctamente");

      // Actualizar el estado con el nuevo storeId
      const updatedUserData = { ...userData, storeId: userData.storeId };

      // Actualizar la cookie con los nuevos datos
      document.cookie = `user=${JSON.stringify(
        updatedUserData
      )}; path=/; max-age=${60 * 60 * 24 * 7};`; // 7 días de duración

      // Opcional: Actualizar el estado en el cliente
      setUserData(updatedUserData);
    } else {
      // Manejar errores
      alert("Error al actualizar la sucursal");
    }
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

        <div className="p-6 text-white">
          {userData ? (
            <div className="bg-zinc-900 p-6 rounded-xl shadow-md w-full max-w-xl mx-auto">
              <div className="flex flex-col items-center gap-4">
                <img
                  src={userData.userImage}
                  alt="Imagen de perfil"
                  className="w-24 h-24 rounded-full object-cover border-4 border-gray-700"
                />
                <h2 className="text-2xl font-bold text-center">
                  {userData.name} {userData.lastName}
                </h2>
                <p className="text-gray-400">
                  Título:{" "}
                  {userData.userTitle === "1"
                    ? "Administrador"
                    : userData.userTitle === "2"
                    ? "Editor"
                    : userData.userTitle === "3"
                    ? "Visualizador"
                    : "Título desconocido"}
                </p>
              </div>

              <div className="mt-6 space-y-2 text-sm text-gray-300">
                <p>
                  <span className="font-semibold text-white">ID:</span>{" "}
                  {userData.id}
                </p>
                <p>
                  <span className="font-semibold text-white">Edad:</span>{" "}
                  {userData.age}
                </p>
                <p>
                  <span className="font-semibold text-white">
                    Inicio de trabajo:
                  </span>{" "}
                  {new Date(userData.dateStartJob).toLocaleDateString()}
                </p>
                <p>
                  <span className="font-semibold text-white">Categoría:</span>{" "}
                  {userData.userCategory === 1
                    ? "Florista"
                    : userData.userCategory === 2
                    ? "Asistente"
                    : userData.userCategory === 3
                    ? "Contable"
                    : userData.userCategory === 4
                    ? "Administrativo"
                    : userData.userCategory === 5
                    ? "Transporte"
                    : userData.userCategory === 6
                    ? "Temporal"
                    : "Categoría desconocida"}
                </p>

                <p>
                  <span className="font-semibold text-white">
                    Código de Usuario:
                  </span>{" "}
                  {userData.userCode}
                </p>
                <p>
                  <span className="font-semibold text-white">Email:</span>{" "}
                  {userData.email}
                </p>
                <p>
                  <span className="font-semibold text-white">Estado:</span>{" "}
                  {userData.status ? "Activo" : "Inactivo"}
                </p>
                <p>
                  <span className="font-semibold text-white">Sucursal:</span>{" "}
                  {userData.storeId === "1"
                    ? "Lindora"
                    : userData.storeId === "2"
                    ? "Escazú"
                    : "Sucursal desconocida"}
                </p>
              </div>
              <div className="flex flex-row justify-left gap-1 items-center mt-5">
                <div className="">
                  <select
                    id="storeId"
                    name="storeId"
                    value={userData.storeId}
                    onChange={handleStoreIdChange}
                    className=" block w-full px-3 py-2 bg-zinc-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  >
                    <option value="1">Lindora</option>
                    <option value="2">Escazú</option>
                  </select>
                </div>
                <div className="text-center items-center">
                  <button
                    onClick={handleUpdateStoreId}
                    className="bg-green-600 hover:bg-green-700 text-white font-bold px-2 rounded flex flex-row items-center"
                  ><CiSaveUp1 size={30} />
                  </button>
                </div>
              </div>

              <div className="p-6 text-white">
                {userData ? (
                  <div className="bg-zinc-900 p-6 rounded-xl shadow-md w-full max-w-xl mx-auto">
                    {/* Código existente para mostrar la información del usuario */}

                    {/* Botón de Cerrar Sesión */}
                    <div className="mt-6 text-center">
                      <button
                        onClick={handleLogout}
                        className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                      >
                        Cerrar sesión
                      </button>
                    </div>
                  </div>
                ) : (
                  <p className="text-center text-gray-400">
                    Cargando información del usuario...
                  </p>
                )}
              </div>
            </div>
          ) : (
            <p className="text-center text-gray-400">
              Cargando información del usuario...
            </p>
          )}
        </div>
      </div>
    </div>
  );
}