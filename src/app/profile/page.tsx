"use client";

import { useEffect, useState } from "react";
import { auth } from "../../../server/config.firebase";
import { signOut, updateEmail, User } from "firebase/auth";
import { updateProfile } from "firebase/auth";
import { FaUser, FaEnvelope, FaSignOutAlt } from "react-icons/fa";
import { Button } from "../../components/ui/button";

const ProfilePage = () => {
  const [user, setUser] = useState<User | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const currentUser = auth.currentUser;
    if (currentUser) {
      setUser(currentUser);
      setName(currentUser.displayName || "");
      setEmail(currentUser.email || "");
    }
  }, []);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const currentUser = auth.currentUser;

      if (!currentUser) {
        throw new Error("Usuario no autenticado.");
      }

      await updateProfile(currentUser, { displayName: name });

      if (currentUser.email !== email) {
        await updateEmail(currentUser, email);
      }

      alert("Perfil actualizado correctamente.");
    } catch (err) {
      console.error("Error updating profile:", err);
      setError(
        "Error al actualizar el perfil. " +
          (err instanceof Error ? err.message : "")
      );
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      alert("Has cerrado sesión correctamente.");
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen  p-4">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4 text-yellow-500">
          Perfil de Usuario
        </h1>
        {error && <p className="text-red-500">{error}</p>}
        <div className="flex items-center mb-4">
          <FaUser className="mr-2 text-xl text-gray-600" />
          <span className="text-lg font-semibold text-black">
            {user ? user.displayName : "Cargando..."}
          </span>
        </div>
        <div className="flex items-center mb-4">
          <FaEnvelope className="mr-2 text-xl text-gray-600" />
          <span className="text-lg text-black">
            {user ? user.email : "Cargando..."}
          </span>
        </div>

        <form onSubmit={handleUpdate} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Nombre
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="mt-1 p-2 border rounded-md w-full focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Correo Electrónico
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1 p-2 border rounded-md w-full focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
          </div>

          <Button
            type="submit"
            className="w-full bg-yellow-500 text-black hover:bg-yellow-400"
            disabled={loading}
          >
            {loading ? "Actualizando..." : "Actualizar Información"}
          </Button>
        </form>

        <Button
          onClick={handleLogout}
          className="w-full mt-4 bg-red-600 text-white hover:bg-red-700 flex items-center justify-center"
        >
          <FaSignOutAlt className="mr-2" /> Cerrar Sesión
        </Button>
      </div>
    </div>
  );
};

export default ProfilePage;
