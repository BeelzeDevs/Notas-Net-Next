const API_BASE_URL = "http://localhost:5000/api/Notes";
import { NoteRead } from "@/types/NoteRead";
import { Note } from "@/types/Note";

export async function fetchActivesNotes() : Promise<NoteRead[]> {
  const response = await fetch(`${API_BASE_URL}/actives`);
  if (!response.ok) throw new Error("Error loading Notes");
  return await response.json();
}
export async function fetchFiledNotesByCategory(noteId : number) : Promise<NoteRead[]> {
  const response = await fetch(`${API_BASE_URL}/filed/category/${noteId}`);
  if (!response.ok) throw new Error("Error loading Notes by Category");
  return await response.json();
}
export async function fetchUnfiledNotesByCategory(noteId : number) : Promise<NoteRead[]> {
  const response = await fetch(`${API_BASE_URL}/unfiled/category/${noteId}`);
  if (!response.ok) throw new Error("Error loading Notes by Category");
  return await response.json();
}

export async function fetchNotesFiled() : Promise<NoteRead[]> {
  const response = await fetch(`${API_BASE_URL}/filed`);
  if (!response.ok) throw new Error("Error loading Notes");
  return await response.json();
}

export async function createNote(note:Note) : Promise<NoteRead> {
  const response = await fetch(API_BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(note),
  });

  if (!response.ok) throw new Error("Error creating Note");
  return await response.json();
}

export async function deleteNote(id:number){
  const resp = await fetch(`${API_BASE_URL}/${id}`,{
    method:"DELETE",
    headers: {"Content-Type": "application/json"},
  })
  if(!resp.ok) throw new Error("Error deleting Note");
  return;
}
export async function updateNote(id:number, updatedNote:Note){
  const resp = await fetch(`${API_BASE_URL}/${id}`,{
    method:"PUT",
    headers: {"Content-Type": "application/json"},
    body:JSON.stringify(updatedNote)
  })
  if(!resp.ok) throw new Error("Error updating Note");
  return;
}

export async function toogleFiledNote(noteId:number){
  const resp = await fetch(`${API_BASE_URL}/${noteId}/toggle-filed`,{
    method: "PUT",
    headers: {"Content-Type":"application/json"}
  });
  if(!resp.ok) throw new Error("Error handling Filed/UnFiled Toggler Note");
  return;
}