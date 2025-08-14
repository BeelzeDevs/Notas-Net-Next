const API_BASE_URL = "http://localhost:5000/api/NotaxCategoria";
import { CategoriaRead } from "@/types/CategoriaRead";

export async function fetchCategoriasByIdNotas(id:number) : Promise<CategoriaRead[]> {
  const response = await fetch(`${API_BASE_URL}/${id}`);
  if (!response.ok) throw new Error("Error loading Category of note");
  return await response.json();
}
export async function createNotaxCategoria(idNota:number,idCategoria:number){
  const response = await fetch(`${API_BASE_URL}/${idNota}/add/${idCategoria}`,{
    method:"POST",
    headers: {"Content-Type": "application/json"},
  });
  if (!response.ok) throw new Error("Error adding Category to Note");
  return;
}
export async function deleteNotaxCategoria(idNota:number,idCategoria:number){
  const response = await fetch(`${API_BASE_URL}/${idNota}/${idCategoria}`,{
    method:"DELETE",
    headers: {"Content-Type": "application/json"},
  });
  if (!response.ok) {
    const backendMessage = await response.text();
    throw new Error(backendMessage);
  }
  return;
}
