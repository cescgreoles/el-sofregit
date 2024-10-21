"use client";

import { useForm } from "react-hook-form";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../../server/config.firebase";
import { useState } from "react";
import { Label } from "../../components/ui/label";
import { Button } from "../../components/ui/button";
import { uploadBytes, getDownloadURL, ref } from "firebase/storage";
import { storage } from "../../../server/config.firebase";
import { Input } from "@/components/ui/input";
import { auth } from "../../../server/config.firebase";

enum FoodType {
  Dessert = "Postre",
  Appetizer = "Aperitivo",
  MainCourse = "Plato principal",
  Beverage = "Bebida",
}

enum DietType {
  Vegetarian = "Vegetariana",
  Vegan = "Vegana",
  Meat = "Carne",
  GlutenFree = "Sin gluten",
  Keto = "Keto",
}

type RecipeFormData = {
  title: string;
  ingredients: string;
  instructions: string;
  type: FoodType;
  diet: DietType;
  image: FileList;
};

export default function CreateRecipe() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RecipeFormData>();
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const onSubmit = async (data: RecipeFormData) => {
    setLoading(true);
    let imageUrl = "";

    try {
      if (data.image && data.image.length > 0) {
        const imageFile = data.image[0];
        const storageRef = ref(storage, `recipes/${imageFile.name}`);
        await uploadBytes(storageRef, imageFile);
        imageUrl = await getDownloadURL(storageRef);
      }

      const userId = auth.currentUser?.uid;

      if (!userId) {
        throw new Error("User not authenticated");
      }

      await addDoc(collection(db, "recipes"), {
        title: data.title,
        ingredients: data.ingredients,
        instructions: data.instructions,
        type: data.type,
        diet: data.diet,
        imageUrl,
        userId,
        createdAt: new Date(),
      });

      setSuccessMessage("Receta creada con éxito");
    } catch (error) {
      console.error("Error añadiendo receta: ", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-6 m-4 max-w-4xl bg-white rounded-md shadow-lg">
      <h1 className="text-2xl mb-6 text-center text-yellow-500 font-semibold">
        Crear Recepta
      </h1>

      {successMessage && (
        <p className="text-green-500 mb-4">{successMessage}</p>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 text-black">
        <div className="w-full">
          <Label htmlFor="title" className="block text-sm font-medium ">
            Títol
          </Label>
          <Input
            id="title"
            {...register("title", { required: "El títol és requerit" })}
            className="mt-1 block w-full px-4 py-2 border bg-white rounded-md shadow-sm focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm"
          />
          {errors.title && (
            <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
          )}
        </div>

        <div className="w-full">
          <Label htmlFor="ingredients" className="block text-sm font-medium">
            Ingredients
          </Label>
          <textarea
            id="ingredients"
            {...register("ingredients", {
              required: "Els ingredients són requerits",
            })}
            className="mt-1 block w-full px-4 py-2 border bg-white rounded-md shadow-sm focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm"
          ></textarea>
          {errors.ingredients && (
            <p className="text-red-500 text-sm mt-1">
              {errors.ingredients.message}
            </p>
          )}
        </div>

        <div className="w-full">
          <Label htmlFor="instructions" className="block text-sm font-medium">
            Instruccions
          </Label>
          <textarea
            id="instructions"
            {...register("instructions", {
              required: "Les instruccions són requerides",
            })}
            className="mt-1 block w-full px-4 py-2 border bg-white rounded-md shadow-sm focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm"
          ></textarea>
          {errors.instructions && (
            <p className="text-red-500 text-sm mt-1">
              {errors.instructions.message}
            </p>
          )}
        </div>

        <div className="w-full">
          <Label htmlFor="type" className="block text-sm font-medium">
            Tipus de Menjar
          </Label>
          <select
            id="type"
            {...register("type", {
              required: "El tipus de menjar és requerit",
            })}
            className="mt-1 block w-full px-4 py-2 border bg-white rounded-md shadow-sm focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm"
          >
            {Object.values(FoodType).map((foodType) => (
              <option key={foodType} value={foodType}>
                {foodType}
              </option>
            ))}
          </select>
          {errors.type && (
            <p className="text-red-500 text-sm mt-1">{errors.type.message}</p>
          )}
        </div>

        <div className="w-full">
          <Label htmlFor="diet" className="block text-sm font-medium">
            Tipus de Dieta
          </Label>
          <select
            id="diet"
            {...register("diet", { required: "El tipus de dieta és requerit" })}
            className="mt-1 block w-full px-4 py-2 border bg-white rounded-md shadow-sm focus:ring-yellow-500 focus:border-yellow-500 sm:text-sm"
          >
            {Object.values(DietType).map((dietType) => (
              <option key={dietType} value={dietType}>
                {dietType}
              </option>
            ))}
          </select>
          {errors.diet && (
            <p className="text-red-500 text-sm mt-1">{errors.diet.message}</p>
          )}
        </div>

        <div className="w-full">
          <Label htmlFor="image" className="block text-sm font-medium">
            Foto de la Recepta
          </Label>
          <input
            id="image"
            type="file"
            accept="image/*"
            {...register("image", { required: "La imatge és requerida" })}
            className="mt-1 block w-full text-sm bg-white file:mr-4 file:py-2 file:px-4 file:rounded file:border"
          />
          {errors.image && (
            <p className="text-red-500 text-sm mt-1">{errors.image.message}</p>
          )}
        </div>

        <div className="flex justify-center sm:justify-start">
          <Button
            type="submit"
            disabled={loading}
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-bold rounded-md text-white bg-yellow-500 hover:bg-yellow-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 disabled:bg-gray-400"
          >
            {loading ? "Guardant..." : "Desar Recepta"}
          </Button>
        </div>
      </form>
    </div>
  );
}
