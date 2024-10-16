import { useForm } from "react-hook-form";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../../server/config.firebase";
import { useState } from "react";
import { Label } from "../../components/ui/label";
import { Button } from "../../components/ui/button";
import { uploadBytes, getDownloadURL, ref } from "firebase/storage";
import { storage } from "../../../server/config.firebase";
import { Input } from "@/components/ui/input";

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

      await addDoc(collection(db, "recipes"), {
        title: data.title,
        ingredients: data.ingredients,
        instructions: data.instructions,
        type: data.type,
        diet: data.diet,
        imageUrl,
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
    <div className="container mx-auto p-6 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6 text-center sm:text-left">
        Crear Receta
      </h1>

      {successMessage && (
        <p className="text-green-500 mb-4">{successMessage}</p>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="w-full">
          <Label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700"
          >
            Título
          </Label>
          <Input
            id="title"
            {...register("title", { required: "El título es requerido" })}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
          {errors.title && (
            <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
          )}
        </div>

        <div className="w-full">
          <Label
            htmlFor="ingredients"
            className="block text-sm font-medium text-gray-700"
          >
            Ingredientes
          </Label>
          <textarea
            id="ingredients"
            {...register("ingredients", {
              required: "Los ingredientes son requeridos",
            })}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          ></textarea>
          {errors.ingredients && (
            <p className="text-red-500 text-sm mt-1">
              {errors.ingredients.message}
            </p>
          )}
        </div>

        <div className="w-full">
          <Label
            htmlFor="instructions"
            className="block text-sm font-medium text-gray-700"
          >
            Instrucciones
          </Label>
          <textarea
            id="instructions"
            {...register("instructions", {
              required: "Las instrucciones son requeridas",
            })}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          ></textarea>
          {errors.instructions && (
            <p className="text-red-500 text-sm mt-1">
              {errors.instructions.message}
            </p>
          )}
        </div>

        <div className="w-full">
          <Label
            htmlFor="type"
            className="block text-sm font-medium text-gray-700"
          >
            Tipo de Comida
          </Label>
          <select
            id="type"
            {...register("type", {
              required: "El tipo de comida es requerido",
            })}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
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
          <Label
            htmlFor="diet"
            className="block text-sm font-medium text-gray-700"
          >
            Tipo de Dieta
          </Label>
          <select
            id="diet"
            {...register("diet", { required: "El tipo de dieta es requerido" })}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
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
          <Label
            htmlFor="image"
            className="block text-sm font-medium text-gray-700"
          >
            Foto de la Receta
          </Label>
          <input
            id="image"
            type="file"
            accept="image/*"
            {...register("image", { required: "La imagen es requerida" })}
            className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border file:border-gray-300 file:text-sm file:font-semibold file:bg-gray-50 hover:file:bg-gray-100"
          />
          {errors.image && (
            <p className="text-red-500 text-sm mt-1">{errors.image.message}</p>
          )}
        </div>

        <div className="flex justify-center sm:justify-start">
          <Button
            type="submit"
            disabled={loading}
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-gray-400"
          >
            {loading ? "Guardando..." : "Guardar Receta"}
          </Button>
        </div>
      </form>
    </div>
  );
}
