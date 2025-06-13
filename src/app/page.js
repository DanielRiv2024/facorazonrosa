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
        `https://backendproductioncorazonrosa.azurewebsites.net/api/ValidateUser?code=${API_KEY}`,
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
<div
  className="flex items-center justify-center min-h-screen bg-cover bg-center"
  style={{ backgroundImage: "url('/images/bglogin.jpeg')" }}
>
      {/* Formulario de Login */}
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full flex flex-col items-center justify-center">
        <Image src="/images/logogold.jpeg" alt="Logo" width={350} height={250} className="" />
        {error && <div className="text-red-600 mb-4">{error}</div>}

        <form onSubmit={handleLogin} className="w-full">
          <div className="my-4 gap-2 flex flex-col">
          
            <input
              type="text"
              value={codigoEmpleado}
              onChange={(e) => setCodigoEmpleado(e.target.value)}
              className="w-full p-2 bg-white text-slate-400 text-sm border border-2 border-amber-400 rounded-md"
              placeholder="Código de Empleado"
              required
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 bg-white text-slate-400 text-sm  border border-2 border-amber-400 rounded-md"
              placeholder="Contraseña"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full p-2 font-bold bg-amber-400  text-white rounded-md hover:bg-amber-200 transition-colors"
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
      </div>
    </div>
  );
}
