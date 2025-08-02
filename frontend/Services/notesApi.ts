const API_BASE_URL = "http://localhost:5000/api/notas";
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

export async function eliminarNota(id:number){
  const resp = await fetch(`${API_BASE_URL}/${id}`,{
    method:"DELETE",
    headers: {"Content-Type": "application/json"},
  })
  if(!resp.ok) throw new Error("Error deleting Nota");
  return;
}