const API_BASE_URL = "http://localhost:5000/api/Categorias";
import { CategoriaRead } from "@/types/CategoriaRead";

export async function fetchCategorias() : Promise<CategoriaRead[]> {
  const response = await fetch(API_BASE_URL);
  if (!response.ok) throw new Error("Error loading categories");
  return await response.json();
}

