const API_BASE_URL = "http://localhost:5263/api/notas";
import { NotaRead } from "@/types/NotaRead";


export async function fetchNotas() : Promise<NotaRead[]> {
  const response = await fetch(API_BASE_URL);
  if (!response.ok) throw new Error("Error loading Notas");
  return await response.json();
}

