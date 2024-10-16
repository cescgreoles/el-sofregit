"use client";

import { useEffect, useState } from "react";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "../../../server/config.firebase";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

type Recipe = {
  id: string;
  title: string;
  ingredients: string;
  instructions: string;
  imageUrl?: string;
  type: string;
  diet: string;
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
    return <p className="text-center text-white">Cargando recetas...</p>;
  }

  return (
    <div className="container mx-auto p-6 text-white">
      {recipes.length === 0 ? (
        <p className="text-center text-white">No hi ha receptes disponibles.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recipes.map((recipe) => (
            <div
              key={recipe.id}
              className="p-6 border bg-black bg-opacity-70  border-gray-200 rounded-lg shadow-lg hover:shadow-xl "
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
              <h2 className="text-2xl font-bold text-white mb-4">
                {recipe.title}
              </h2>
              <p className="text-white">
                <strong className="text-white">Ingredients:</strong>{" "}
                {recipe.ingredients}
              </p>
              <p className="text-white">
                <strong className="text-white">Instruccions:</strong>{" "}
                {recipe.instructions}
              </p>
              <p className="text-white">
                <strong className="text-white">Tipus de Menjar:</strong>{" "}
                {recipe.type}
              </p>
              <p className="text-white">
                <strong className="text-white">Tipus de Dieta:</strong>{" "}
                {recipe.diet}
              </p>
            </div>
          ))}
        </div>
      )}

      <div className="mt-8 flex justify-center">
        <Button className="bg-green-500 text-white hover:bg-green-600 px-4 py-2 rounded-lg shadow-md">
          <Link href="/create-recipe">Crear Recepta</Link>
        </Button>
      </div>
    </div>
  );
}
