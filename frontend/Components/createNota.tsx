"use client";

import { useState } from "react";
import { crearNota } from "@/Services/notesApi";
import { Nota } from "@/types/Nota";

const CreateNota = ({onNotaCreada} : {onNotaCreada: ()=> void}) => {
  const [isCreatingNota, setIsCreatingNota] = useState(false);
  const [titulo, setTitulo] = useState("");
  const [contenido, setContenido] = useState("");
  const [archivada, setArchivada] = useState(false);

  const resetForm = () => {
    setTitulo("");
    setContenido("");
    setArchivada(false);
  };

  const handleCreateNote = () => {
    setIsCreatingNota((prev) => !prev);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const nuevaNota: Nota = {
      Titulo: titulo,
      Contenido: contenido,
      Archivada: archivada,
    };

    try {
      await crearNota(nuevaNota);
      resetForm();
      setIsCreatingNota(false);
      onNotaCreada();
    } catch (error) {
      console.error("Error al crear la nota:", error);
    }
  };

  return (
    <section className="relative w-full">
      <div className="flex justify-center my-4">
        <button
          onClick={handleCreateNote}
          className="bg-cyan-600 text-white px-4 py-2 rounded-lg shadow hover:bg-cyan-700 transition"
        >
          Crear Nota
        </button>
      </div>

      {isCreatingNota && (
        <form
          onSubmit={handleSubmit}
          className="z-10 fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-40 flex items-center justify-center"
        >
          <div className="bg-cyan-800 rounded-xl shadow-xl p-6 w-full max-w-lg mx-4 relative">
            <header className="text-2xl md:text-3xl text-center bg-cyan-900 text-white py-4 rounded-t-xl">
              Crear Nota
            </header>

            <div className="flex flex-col gap-4 mt-4 text-white">
              <label className="text-left text-lg">Título</label>
              <input
                type="text"
                value={titulo}
                onChange={(e) => setTitulo(e.target.value)}
                className="w-full bg-slate-600 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-400"
              />

              <label className="text-left text-lg">Contenido</label>
              <textarea
                value={contenido}
                onChange={(e) => setContenido(e.target.value)}
                rows={4}
                className="w-full bg-slate-600 text-white rounded-lg px-4 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-cyan-400"
              />

              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={archivada}
                  onChange={(e) => setArchivada(e.target.checked)}
                  className="w-5 h-5"
                />
                <label className="text-lg">Archivada</label>
              </div>
            </div>

            <div className="flex justify-end gap-4 mt-6">
              <button
                type="submit"
                className="bg-cyan-500 text-white px-4 py-2 rounded-lg hover:bg-cyan-600 transition"
              >
                Crear
              </button>
              <button
                type="button"
                onClick={handleCreateNote}
                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
              >
                Cancelar
              </button>
            </div>

            <button
              type="button"
              onClick={handleCreateNote}
              className="absolute top-2 right-2 text-white text-xl hover:text-red-400"
            >
              ✖
            </button>
          </div>
        </form>
      )}
    </section>
  );
};

export default CreateNota;
