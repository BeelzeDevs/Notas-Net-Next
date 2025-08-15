"use client";

import { useState } from "react";
import { createNote } from "@/Services/notesApi";
import { Note } from "@/types/Note";

const CreateNote = ({onNoteCreated} : {onNoteCreated: ()=> void}) => {
  const [isCreatingNote, setIsCreatingNote] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [filed, setFiled] = useState(false);
  const [error,setError] = useState<null | string>(null);

  const resetForm = () => {
    setTitle("");
    setContent("");
    setFiled(false);
  };

  const handleCreateNote = () => {
    setIsCreatingNote((prev) => !prev);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newNote: Note = {
      title: title,
      content: content,
      filed: filed,
    };

    try {
      await createNote(newNote);
      resetForm();
      setIsCreatingNote(false);
      onNoteCreated();
    } catch (error) {
      setError("Error al crear la nota");
    }
  };

  return (
    <section className="relative w-full">
      <div className="flex justify-center my-4">
        <button
          onClick={handleCreateNote}
          className="bg-cyan-600 text-white px-4 py-2 rounded-lg shadow hover:bg-cyan-700 transition pointer"
        >
          Create Note
        </button>
      </div>

      {isCreatingNote && (
        <form
          onSubmit={handleSubmit}
          className="z-10 fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-40 flex items-center justify-center"
        >
          <div className="bg-cyan-800 rounded-xl shadow-xl p-6 w-full max-w-lg mx-4 relative">
            <header className="text-2xl md:text-3xl text-center bg-cyan-900 text-white py-4 rounded-t-xl">
              Create Note
            </header>

            <div className="flex flex-col gap-4 mt-4 text-white">
              <label className="text-left text-lg">Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full bg-slate-600 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-400"
              />

              <label className="text-left text-lg">Content</label>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows={4}
                className="w-full bg-slate-600 text-white rounded-lg px-4 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-cyan-400"
              />

              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={filed}
                  onChange={(e) => setFiled(e.target.checked)}
                  className="w-5 h-5"
                />
                <label className="text-lg">File</label>
              </div>
            </div>

            <div className="flex justify-end gap-4 mt-6">
              <button
                type="submit"
                className="bg-cyan-500 text-white px-4 py-2 rounded-lg hover:bg-cyan-600 transition pointer"
              >
                Create
              </button>
              <button
                type="button"
                onClick={handleCreateNote}
                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition pointer"
              >
                Cancel
              </button>
            </div>

            <button
              type="button"
              onClick={handleCreateNote}
              className="absolute top-2 right-2 text-white text-xl hover:text-red-400 pointer"
            >
              ✖
            </button>
          </div>
        </form>
      )}
    </section>
  );
};

export default CreateNote;
