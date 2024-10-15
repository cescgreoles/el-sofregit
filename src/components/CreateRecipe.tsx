import { useForm } from "react-hook-form";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../server/config.firebase";
import { useState } from "react";

type RecipeFormData = {
  title: string;
  ingredients: string;
  instructions: string;
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
    try {
      await addDoc(collection(db, "recipes"), {
        title: data.title,
        ingredients: data.ingredients,
        instructions: data.instructions,
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
          <label htmlFor="title" className="block text-sm font-medium">
            Título
          </label>
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
          <label htmlFor="ingredients" className="block text-sm font-medium">
            Ingredientes
          </label>
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
          <label htmlFor="instructions" className="block text-sm font-medium">
            Instrucciones
          </label>
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

        <button type="submit" disabled={loading} className="btn btn-primary">
          {loading ? "Guardando..." : "Guardar Receta"}
        </button>
      </form>
    </div>
  );
}
