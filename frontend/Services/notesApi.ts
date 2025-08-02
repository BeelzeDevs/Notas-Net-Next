const API_BASE_URL = "http://localhost:5000/api/Notas";
import { NotaRead } from "@/types/NotaRead";
import { Nota } from "@/types/Nota";

export async function fetchNotasActivas() : Promise<NotaRead[]> {
  const response = await fetch(`${API_BASE_URL}/actives`);
  if (!response.ok) throw new Error("Error loading Notas");
  return await response.json();
}
export async function fetchNotasPorCategoriaArchivadas(notaId : number) : Promise<NotaRead[]> {
  const response = await fetch(`${API_BASE_URL}/archivadas/categorias/${notaId}`);
  if (!response.ok) throw new Error("Error loading Notas by Categoria");
  return await response.json();
}
export async function fetchNotasPorCategoriaNoArchivadas(notaId : number) : Promise<NotaRead[]> {
  const response = await fetch(`${API_BASE_URL}/no-archivadas/categorias/${notaId}`);
  if (!response.ok) throw new Error("Error loading Notas by Categoria");
  return await response.json();
}

export async function fetchNotasArchivadas() : Promise<NotaRead[]> {
  const response = await fetch(`${API_BASE_URL}/archived`);
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
export async function modificarNota(id:number, notaActualizada:Nota){
  const resp = await fetch(`${API_BASE_URL}/${id}`,{
    method:"PUT",
    headers: {"Content-Type": "application/json"},
    body:JSON.stringify(notaActualizada)
  })
  if(!resp.ok) throw new Error("Error updating Nota");
  return;
}

export async function toogleArchivadoNota(notaId:number){
  const resp = await fetch(`${API_BASE_URL}/${notaId}/toggle-archivado`,{
    method: "PUT",
    headers: {"Content-Type":"application/json"}
  });
  if(!resp.ok) throw new Error("Error handling Archived/Unarchived Nota");
  return;
}