import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../server/config.firebase";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { FaUserPlus } from "react-icons/fa"; // Icono divertido

const RegisterForm = ({ onClose }: { onClose: () => void }) => {
  const [firstName, setFirstName] = useState(""); // Nombre
  const [lastName, setLastName] = useState(""); // Apellido
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (password !== confirmPassword) {
      setError("Les contrasenyes no coincideixen.");
      setLoading(false);
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      onClose();
    } catch {
      setError("Error en el registre. Si us plau, prova-ho de nou.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
      <div className="w-full max-w-xl p-8 rounded-lg shadow-lg bg-white dark:bg-gray-800">
        {" "}
        {/* Aumentado el ancho */}
        <h2 className="text-2xl font-bold text-yellow-500 italic mb-4 flex items-center dark:text-white">
          {" "}
          {/* Texto amarillo y blanco */}
          <FaUserPlus className="mr-2" /> Registrar-se
        </h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <Label
              htmlFor="first-name"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300" // Texto gris claro en modo oscuro
            >
              Nom
            </Label>
            <input
              type="text"
              id="first-name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
              className="w-full mt-1 p-2 border text-black rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 dark:bg-gray-600 dark:text-white dark:border-gray-500" // Estilos para el input
            />
          </div>

          <div>
            <Label
              htmlFor="last-name"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300" // Texto gris claro en modo oscuro
            >
              Cognom
            </Label>
            <input
              type="text"
              id="last-name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
              className="w-full mt-1 p-2 border text-black rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 dark:bg-gray-600 dark:text-white dark:border-gray-500" // Estilos para el input
            />
          </div>

          <div>
            <Label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300" // Texto gris claro en modo oscuro
            >
              Correu electrònic
            </Label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full mt-1 p-2 border text-black rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 dark:bg-gray-600 dark:text-white dark:border-gray-500" // Estilos para el input
            />
          </div>

          <div>
            <Label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300" // Texto gris claro en modo oscuro
            >
              Contrasenya
            </Label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full mt-1 p-2 border text-black rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 dark:bg-gray-600 dark:text-white dark:border-gray-500" // Estilos para el input
            />
          </div>

          <div>
            <Label
              htmlFor="confirm-password"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300" // Texto gris claro en modo oscuro
            >
              Confirmar Contrasenya
            </Label>
            <input
              type="password"
              id="confirm-password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="w-full mt-1 p-2 border text-black rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 dark:bg-gray-600 dark:text-white dark:border-gray-500" // Estilos para el input
            />
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-yellow-500 text-black hover:bg-yellow-400 transition dark:bg-yellow-600 dark:text-white dark:hover:bg-yellow-500" // Botón en modo claro y oscuro
          >
            {loading ? "Registrant..." : "Registrar-se"}
          </Button>
        </form>
        <Button
          onClick={onClose}
          className="w-full mt-4 border border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-white transition dark:border-gray-500 dark:text-gray-300 dark:hover:bg-gray-600" // Botón de cerrar
        >
          Tancar
        </Button>
      </div>
    </div>
  );
};

export default RegisterForm;
