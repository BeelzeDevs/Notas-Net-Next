const API_BASE_URL = "http://localhost:5263/api/categoria";
import { NotaRead } from "@/types/NotaRead";
import { Nota } from "@/types/Nota";

export async function fetchNotas() : Promise<NotaRead[]> {
  const response = await fetch(API_BASE_URL);
  if (!response.ok) throw new Error("Error loading Notas");
  return await response.json();
}

export async function crearNota(nota:Nota) : Promise<NotaRead> {
  const response = await fetch(API_BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(nota),
  });

  if (!response.ok) throw new Error("Error creating Nota");
  return await response.json();
}