"use client";

import { useEffect, useState } from "react";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "../../../server/config.firebase";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FaPlusCircle } from "react-icons/fa";

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
    return <p className="text-center text-yellow-500">Cargando recetas...</p>;
  }

  return (
    <div className="container mx-auto p-6 text-black">
      <div className="p-6 flex justify-center">
        <Button className="bg-yellow-500 text-black hover:bg-yellow-600 flex items-center px-4 py-2 rounded-lg shadow-md transition duration-200">
          <FaPlusCircle className="mr-2" />
          <Link href="/create-recipe">Crear Recepta</Link>
        </Button>
      </div>
      {recipes.length === 0 ? (
        <p className="text-center text-black">No hi ha receptes disponibles.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recipes.map((recipe) => (
            <div
              key={recipe.id}
              className="p-6 border bg-white border-gray-200 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
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
              <h2 className="text-2xl font-bold text-black mb-4">
                {recipe.title}
              </h2>
              <p className="text-black">
                <strong>Ingredients:</strong> {recipe.ingredients}
              </p>
              <p className="text-black">
                <strong>Instruccions:</strong> {recipe.instructions}
              </p>
              <p className="text-black">
                <strong>Tipus de Menjar:</strong> {recipe.type}
              </p>
              <p className="text-black">
                <strong>Tipus de Dieta:</strong> {recipe.diet}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
