"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { auth } from "../../../server/config.firebase";
import { updateEmail, User, onAuthStateChanged } from "firebase/auth";
import { updateProfile } from "firebase/auth";
import { FaUser, FaEnvelope } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../../server/config.firebase";
import { Timestamp } from "firebase/firestore";
import Image from "next/image";

interface Recipe {
  id: string;
  title: string;
  ingredients: string;
  instructions: string;
  type: string;
  diet: string;
  userId: string;
  createdAt: Date;
  imageUrl?: string;
}

const ProfilePage = () => {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [userRecipes, setUserRecipes] = useState<Recipe[]>([]);
  const [recipesLoading, setRecipesLoading] = useState(false);
  const [recipesError, setRecipesError] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        setName(currentUser.displayName || "");
        setEmail(currentUser.email || "");
        fetchUserRecipes(currentUser.uid);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const fetchUserRecipes = async (userId: string) => {
    setRecipesLoading(true);
    setRecipesError(null);

    try {
      const q = query(collection(db, "recipes"), where("userId", "==", userId));

      const querySnapshot = await getDocs(q);
      if (querySnapshot.empty) {
        console.log("No se encontraron recetas para este usuario.");
        setUserRecipes([]);
        return;
      }

      const recipesData = querySnapshot.docs.map((doc) => {
        const data = doc.data();
        const createdAt =
          data.createdAt instanceof Timestamp
            ? data.createdAt.toDate()
            : new Date();

        return {
          id: doc.id,
          ...data,
          createdAt,
        } as Recipe;
      });

      console.log("Fetched recipes:", recipesData);
      setUserRecipes(recipesData);
    } catch (error) {
      console.error("Error fetching recipes:", error);
      setRecipesError(
        "Error al cargar las recetas. " +
          (error instanceof Error ? error.message : "")
      );
    } finally {
      setRecipesLoading(false);
    }
  };

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
      router.replace("/profile");
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

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 ">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4 text-yellow-500">
          Perfil de Usuari
        </h1>
        {error && <p className="text-red-500">{error}</p>}
        <div className="flex items-center mb-4">
          <FaUser className="mr-2 text-xl text-gray-600" />
          <span className="text-lg font-semibold text-black">
            {user ? user.displayName || "Sin nombre" : "Cargando..."}
          </span>
        </div>
        <div className="flex items-center mb-4">
          <FaEnvelope className="mr-2 text-xl text-gray-600" />
          <span className="text-lg text-black">
            {user ? user.email || "Sin correo" : "Cargando..."}
          </span>
        </div>

        <form onSubmit={handleUpdate} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Nom
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
              Correu Electrònic
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
      </div>

      <h2 className="text-xl font-bold mt-6">Les teves receptes</h2>
      {recipesLoading ? (
        <p>Carregant receptes...</p>
      ) : recipesError ? (
        <p className="text-red-500">{recipesError}</p>
      ) : userRecipes.length === 0 ? (
        <p>No s&apos;han creat receptes encara.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full mt-4">
          {userRecipes.map((recipe) => (
            <div
              key={recipe.id}
              className="p-6 border bg-white border-gray-200 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col"
            >
              {recipe.imageUrl && (
                <Image
                  src={recipe.imageUrl}
                  alt={recipe.title}
                  className="mb-4 rounded-lg w-full object-cover h-40"
                  width={400}
                  height={160}
                />
              )}
              <h2 className="text-2xl font-bold text-black mb-2">
                {recipe.title}
              </h2>
              <p className="text-black">
                <strong>Ingredients:</strong> {recipe.ingredients}
              </p>
              <p className="text-black">
                <strong>Instructions:</strong> {recipe.instructions}
              </p>
              <p className="text-black">
                <strong>Type:</strong> {recipe.type}
              </p>
              <p className="text-black">
                <strong>Diet:</strong> {recipe.diet}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
