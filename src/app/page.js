"use client"

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie"; // Importamos js-cookie

export default function Home() {
  const router = useRouter();
  const [codigoEmpleado, setCodigoEmpleado] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [emailRestablecer, setEmailRestablecer] = useState("");
  const [loading, setLoading] = useState(false);

  // Clave de la API desde las variables de entorno
  const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

  // Función para manejar el login
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
    
      const response = await fetch(
        `https://backendproductioncorazonrosa.azurewebsites.net/api/ValidateUser?code=JzpTfdgg45jhxwQfLbNhgYxWikTNgWkke2g7eQCQcMqdAzFudOSafQ==`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userCode: codigoEmpleado,
            password: password,
          }),
        }
      
      );

    
    
      // Verificamos si la respuesta es un JSON válido antes de continuar
      let data;
      try {
        data = await response.json();
      } catch (jsonError) {
        console.error("Error al parsear JSON:", jsonError);
        setError("Respuesta inválida del servidor.");
        return;
      }
    
      // Validamos que los datos obtenidos contienen la información del usuario
      if (response.ok && data.id) { 
        // Guardamos el usuario en una cookie por 1 día
        Cookies.set("user", JSON.stringify(data), { expires: 1 });
        localStorage.setItem("userCode", data.userCode);
        // Redirigimos al dashboard
        router.push("/dashboard/billing");
      } else {
        console.error("Error de autenticación:", data);
        setError(data.message || "Código de empleado no válido.");
      }
    } catch (err) {
      console.error("Error en la solicitud:", err);
      setError("Hubo un error al intentar iniciar sesión.");
    } finally {
      setLoading(false);
    }
    
    



  };

  // Función para manejar el restablecimiento de contraseña
  const handleRestablecer = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/restablecer-contraseña", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: emailRestablecer,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Te hemos enviado un correo para restablecer tu contraseña.");
      } else {
        alert(data.message || "Error al enviar el correo de restablecimiento.");
      }
    } catch (err) {
      alert("Hubo un error al intentar restablecer la contraseña.");
    }
  };


  return (
    <div className="flex flex-col items-center justify-items-center min-h-screen p-8 bg-black">
      {/* Formulario de Login */}
      <div className="bg-neutral-900 p-8 rounded-lg shadow-lg max-w-md w-full flex flex-col items-center justify-center">
        <h2 className="text-center text-2xl font-bold mb-6">Corazón De La Rosa</h2>
        <h2 className="text-center text-2xl font-bold mb-6">Admin Portal</h2>
        <Image src="/images/bg-corazonrosa.png" alt="Logo" width={150} height={150} />
        {error && <div className="text-red-600 mb-4">{error}</div>}

        <form onSubmit={handleLogin} className="w-full">
          <div className="mb-4">
            <label className="block text-sm font-semibold text-white">Código de Empleado</label>
            <input
              type="text"
              value={codigoEmpleado}
              onChange={(e) => setCodigoEmpleado(e.target.value)}
              className="w-full p-2 bg-white text-black  border border-black rounded-md"
              placeholder="Código de Empleado"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-semibold text-white">Contraseña</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 bg-white text-black  border border-black rounded-md"
              placeholder="Contraseña"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full p-2 font-bold bg-green-600 hover:text-green-600 text-white rounded-md hover:bg-black transition-colors"
          >
            {loading ? "Cargando..." : "Iniciar Sesión"}
          </button>
        </form>

        {/* Opción de Restablecer Contraseña */}
        <div className="mt-4 text-center">
          <button
            onClick={() => setEmailRestablecer("")}
            className="text-blue-600 text-sm"
          >
            ¿Olvidaste tu contraseña?
          </button>
        </div>

        {/* Modal o input para restablecer contraseña */}
        {emailRestablecer !== "" && (
          <div className="mt-4 text-center">
            <form onSubmit={handleRestablecer}>
              <div className="mb-4">
                <label className="block text-sm font-semibold text-white">Correo Electrónico</label>
                <input
                  type="email"
                  value={emailRestablecer}
                  onChange={(e) => setEmailRestablecer(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  placeholder="Ingresa tu correo"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full p-2 bg-blue-600 text-white rounded-md hover:bg-blue-500 transition-colors"
              >
                Enviar Enlace de Restablecimiento
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
