"use client";

import { useEffect, useState } from "react";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "../../../server/config.firebase";
import CreateRecipe from "@/components/CreateRecipe";

type Recipe = {
  id: string;
  title: string;
  ingredients: string;
  instructions: string;
};

export default function RecipeList() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecipes = async () => {
      setLoading(true);
      try {
        const q = query(
          collection(db, "recipes"),
          orderBy("createdAt", "desc")
        );
        const querySnapshot = await getDocs(q);

        const recipesData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Recipe[];

        setRecipes(recipesData);
      } catch (error) {
        console.error("Error al recuperar recetas: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
  }, []);

  if (loading) {
    return <p className="text-center text-gray-600">Cargando recetas...</p>;
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-4xl font-bold text-center mb-10 text-gray-800">
        Lista de Recetas
      </h1>

      {recipes.length === 0 ? (
        <p className="text-center text-gray-600">No hay recetas disponibles.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recipes.map((recipe) => (
            <div
              key={recipe.id}
              className="p-6 border border-gray-200 rounded-lg shadow-lg hover:shadow-xl transition-shadow bg-white"
            >
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                {recipe.title}
              </h2>
              <p className="text-gray-600">
                <strong className="text-gray-700">Ingredientes:</strong>{" "}
                {recipe.ingredients}
              </p>
              <p className="text-gray-600">
                <strong className="text-gray-700">Instrucciones:</strong>{" "}
                {recipe.instructions}
              </p>
            </div>
          ))}
        </div>
      )}

      <div className="mt-12">
        <CreateRecipe />
      </div>
    </div>
  );
}
