import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../server/config.firebase";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { FaUser } from "react-icons/fa";

const LoginForm = ({ onClose }: { onClose: () => void }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await signInWithEmailAndPassword(auth, email, password);
      onClose();
    } catch {
      setError("Credenciales inválidas. Intenta nuevamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
      <div className="p-8 rounded-lg shadow-lg bg-white dark:bg-gray-800 w-full max-w-md">
        {" "}
        {/* Asegúrate que sea max-w-md */}
        <h2 className="text-2xl font-bold text-yellow-500 italic mb-4 flex items-center dark:text-white">
          <FaUser className="mr-2" /> Iniciar Sessió
        </h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <Label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Correu electrònic
            </Label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full mt-1 p-2 border text-black rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 dark:bg-gray-600 dark:text-white dark:border-gray-500"
            />
          </div>

          <div>
            <Label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Contrasenya
            </Label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full mt-1 p-2 border text-black rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 dark:bg-gray-600 dark:text-white dark:border-gray-500"
            />
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-yellow-500 text-black hover:bg-yellow-400 transition dark:bg-yellow-600 dark:text-white dark:hover:bg-yellow-500"
          >
            {loading ? "Iniciant sessió..." : "Iniciar Sessió"}
          </Button>
        </form>
        <Button
          onClick={onClose}
          className="w-full mt-4 border border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-white transition dark:border-gray-500 dark:text-gray-300 dark:hover:bg-gray-600"
        >
          Tancar
        </Button>
      </div>
    </div>
  );
};

export default LoginForm;
