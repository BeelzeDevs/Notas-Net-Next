const API_BASE_URL = "http://localhost:5000/api/Category";
import { CategoryRead } from "@/types/CategoryRead";

export async function fetchCategories() : Promise<CategoryRead[]> {
  const response = await fetch(API_BASE_URL);
  if (!response.ok) throw new Error("Error loading categories");
  return await response.json();
}

