import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../server/config.firebase";
import { Label } from "./ui/label"; // Asegúrate de que el componente Label esté correctamente importado
import { Button } from "./ui/button"; // Asegúrate de que el componente Button esté correctamente importado

const RegisterForm = ({ onClose }: { onClose: () => void }) => {
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
      <div className="p-8 rounded-lg shadow-lg bg-black bg-opacity-80">
        <h2 className="text-2xl font-bold text-white italic mb-4">
          Registrar-se
        </h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <Label
              htmlFor="email"
              className="block text-sm font-medium text-gray-300"
            >
              Correu electrònic
            </Label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full mt-1 p-2 border text-black rounded-md focus:outline-none focus:ring-2 focus:ring-white-500"
            />
          </div>

          <div>
            <Label
              htmlFor="password"
              className="block text-sm font-medium text-gray-300"
            >
              Contrasenya
            </Label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full mt-1 p-2 border  text-black rounded-md focus:outline-none focus:ring-2 focus:ring-white-500"
            />
          </div>

          <div>
            <Label
              htmlFor="confirm-password"
              className="block text-sm font-medium text-gray-300"
            >
              Confirmar Contrasenya
            </Label>
            <input
              type="password"
              id="confirm-password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="w-full mt-1 p-2 border  text-black rounded-md focus:outline-none focus:ring-2 focus:ring-white-500"
            />
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="w-full  text-white"
          >
            {loading ? "Registrant..." : "Registrar-se"}
          </Button>
        </form>

        <Button onClick={onClose} className="w-full mt-4">
          Tancar
        </Button>
      </div>
    </div>
  );
};

export default RegisterForm;
