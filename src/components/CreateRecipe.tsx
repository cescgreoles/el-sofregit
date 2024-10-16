import { useForm } from "react-hook-form";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../server/config.firebase";
import { useState } from "react";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { uploadBytes, getDownloadURL, ref } from "firebase/storage";
import { storage } from "../../server/config.firebase";

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
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Crear Receta</h1>

      {successMessage && <p className="text-green-500">{successMessage}</p>}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <Label htmlFor="title" className="block text-sm font-medium">
            Título
          </Label>
          <input
            id="title"
            {...register("title", { required: "El título es requerido" })}
            className="input"
          />
          {errors.title && (
            <p className="text-red-500">{errors.title.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="ingredients" className="block text-sm font-medium">
            Ingredientes
          </Label>
          <textarea
            id="ingredients"
            {...register("ingredients", {
              required: "Los ingredientes son requeridos",
            })}
            className="textarea"
          />
          {errors.ingredients && (
            <p className="text-red-500">{errors.ingredients.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="instructions" className="block text-sm font-medium">
            Instrucciones
          </Label>
          <textarea
            id="instructions"
            {...register("instructions", {
              required: "Las instrucciones son requeridas",
            })}
            className="textarea"
          />
          {errors.instructions && (
            <p className="text-red-500">{errors.instructions.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="type" className="block text-sm font-medium">
            Tipo de Comida
          </Label>
          <select
            id="type"
            {...register("type", {
              required: "El tipo de comida es requerido",
            })}
            className="select"
          >
            {Object.values(FoodType).map((foodType) => (
              <option key={foodType} value={foodType}>
                {foodType}
              </option>
            ))}
          </select>
          {errors.type && <p className="text-red-500">{errors.type.message}</p>}
        </div>

        <div>
          <Label htmlFor="diet" className="block text-sm font-medium">
            Tipo de Dieta
          </Label>
          <select
            id="diet"
            {...register("diet", { required: "El tipo de dieta es requerido" })}
            className="select"
          >
            {Object.values(DietType).map((dietType) => (
              <option key={dietType} value={dietType}>
                {dietType}
              </option>
            ))}
          </select>
          {errors.diet && <p className="text-red-500">{errors.diet.message}</p>}
        </div>

        <div>
          <Label htmlFor="image" className="block text-sm font-medium">
            Foto de la Receta
          </Label>
          <input
            id="image"
            type="file"
            accept="image/*"
            {...register("image", { required: "La imagen es requerida" })}
            className="input"
          />
          {errors.image && (
            <p className="text-red-500">{errors.image.message}</p>
          )}
        </div>

        <Button type="submit" disabled={loading} className="btn btn-primary">
          {loading ? "Guardando..." : "Guardar Receta"}
        </Button>
      </form>
    </div>
  );
}
