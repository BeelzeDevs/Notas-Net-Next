const API_BASE_URL = "http://localhost:5000/api/NotexCategories";
import { CategoryRead } from "@/types/CategoryRead";

export async function fetchCategoriesByNoteId(noteId:number) : Promise<CategoryRead[]> {
  const response = await fetch(`${API_BASE_URL}/${noteId}`);
  if (!response.ok) throw new Error("Error loading Category of note");
  return await response.json();
}
export async function createNotexCategory(noteId:number,categoryId:number){
  const response = await fetch(`${API_BASE_URL}/${noteId}/add/${categoryId}`,{
    method:"POST",
    headers: {"Content-Type": "application/json"},
  });
  if (!response.ok) throw new Error("Error adding Category to Note");
  return;
}
export async function deleteNotexCategoria(noteId:number,categoryId:number){
  const response = await fetch(`${API_BASE_URL}/${noteId}/${categoryId}`,{
    method:"DELETE",
    headers: {"Content-Type": "application/json"},
  });
  if (!response.ok) throw new Error("Error deleting Category of Note");
  return;
}
