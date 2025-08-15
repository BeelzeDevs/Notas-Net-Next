import { useState, useEffect } from "react";
import { NoteRead } from "@/types/NoteRead";
import { fetchActivesNotes,deleteNote,updateNote, toogleFiledNote, fetchNotesFiled,fetchFiledNotesByCategory,fetchUnfiledNotesByCategory } from "@/Services/notesApi";
import { fetchCategories } from "@/Services/categoryApi";
import CategoriesNotes from "./CategoriesNotes";
import { CategoryRead } from "@/types/CategoryRead";


const NoteList = ({refetchNotes, refetchTrigger} : {refetchNotes: number, refetchTrigger: ()=> void}) => {
  const [notes, setNotes] = useState<NoteRead[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorNotes, setErrorNotes] = useState<Error | null>(null);
  const [errorDelete, setErrorDelete] = useState<Error | null>(null);
  

  const [editId, setEditId] = useState<number | null>(null);
  const [editTitle, setEditedTitle] = useState("");
  const [editContent, setEditContent] = useState("");
  const [errorUpdate, setErrorUpdate] = useState<Error | null>(null);

  const [showArchived ,setShowArchived ] = useState(false);
  const [errorFiling,setErrorFiling] = useState<Error | null>(null);

  const [categories, setCategories] = useState<CategoryRead[]>();
  const [errorCategories,setErrorCategories] = useState<Error | null>(null);
  const [filterCategories,setFilterCategories] = useState("all");

  useEffect(()=>{
    fetchCategories()
    .then(setCategories)
    .catch(setErrorCategories)
    
  },[])

  useEffect(() => {
    setLoading(true);

    const fetchNotas = async () => {
      try {
        let data;

        if (filterCategories === "all") {
          data = showArchived ? await fetchNotesFiled() : await fetchActivesNotes();
          
        } else {

          const categoriaId = parseInt(filterCategories);
          data = showArchived
            ? await fetchFiledNotesByCategory(categoriaId)
            : await fetchUnfiledNotesByCategory(categoriaId);
        }

        setNotes(data);
      } catch (err) {
        setErrorNotes(err as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchNotas();

  }, [refetchNotes, showArchived, filterCategories]);

  

  const handleDeleteNota = (noteId:number)=>{
    deleteNote(noteId)
      .then(() => refetchTrigger())
      .catch((err) => setErrorDelete(err));
    
  }
  const handleUpdateNota = (noteId: number, filed:boolean) => {
  
    const Note = {
    title: editTitle,
    content: editContent,
    filed: filed
    };
    updateNote(noteId,Note)
    .then(()=>{
      setEditId(null)
      refetchTrigger()
    })
    .catch((err)=> setErrorUpdate(err))

  }

  const handleFileNota = (noteId : number) =>{
    toogleFiledNote(noteId)
    .then(()=>{
      refetchTrigger();
    })
    .catch(setErrorFiling)
  }
  const handleCategoriaChange =  (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilterCategories(e.target.value);
  };

  if (loading) return <p>loading notes...</p>;

  return (
    <>
    <section className="flex justify-center gap-5 mb-3 mt-10">

      <select name="filterNotasByArchivados" 
      className="p-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 bg-gray-700 border-gray-600 text-white shadow-sm focus:ring-blue-500 focus:border-blue-500 focus:outline-none"
      value={showArchived ? "true" : "false"}
      onChange={(e)=> setShowArchived(e.target.value == "true")}
      >
          <option value="false" className="text-white ">Unarchives</option>
          <option value="true" className="text-white">Archives</option>
      </select>
      <select name="filterNotasByCategoria" 
      className="p-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 bg-gray-700 border-gray-600 text-white shadow-sm focus:ring-blue-500 focus:border-blue-500 focus:outline-none"
      value={filterCategories}
      onChange={handleCategoriaChange}
      >
          <option value="all" className="text-white ">All</option>
          {categories && 
          categories.map((item)=>(
            <option value={item.id} key={item.id}
            className="text-white ">{item.name}</option>
          ))
          }
      </select>

    </section>
    <section className="grid gap-4 p-4 w-full justify-center">
      {notes.map((note) => (
        <article key={note.id} className="flex flex-col px-4 py-2 border bg-white rounded shadow max-w-xl">
          
          <div className="flex justify-between gap-3 ">
            {editId == note.id ?
            (
              <input
                  className="border px-2 py-1 text-lg md:text-xl text-cyan-500 font-bold"
                  value={editTitle}
                  onChange={(e) => setEditedTitle(e.target.value)}
                />
            ) : (
              <h2 className="flex-1 break-all text-lg md:text-xl text-cyan-500 font-bold  ">{note.title}</h2>
            )}

            <div className="flex gap-3 items-start flex-shrink-0">

              <button className={`text-sm md:text-md text-slate-50 px-3 py-1 rounded-lg pointer
              ${note.filed ? "bg-amber-600 hover:bg-orange-600/80" : "bg-amber-800 hover:bg-orange-600/80"} `}
              onClick={()=>handleFileNota(note.id)}
              >{note.filed ? "Unarchived":"Archived"}</button>
              <button className="text-sm md:text-md text-white px-3 py-1 rounded-lg bg-cyan-800 pointer hover:bg-cyan-800/80"
              onClick={()=>{
                setEditId(note.id);
                setEditedTitle(note.title);
                setEditContent(note.content);
              }}
              >Edit</button>
              <button className="text-sm md:text-md text-slate-50 bg-red-600 px-3 py-1 rounded-lg pointer hover:bg-red-600/80"
              onClick={()=>handleDeleteNota(note.id)}
              >Delete</button>
            </div>

          </div>

          {editId === note.id ? (
              <div className="flex flex-col gap-2 py-2">
                <textarea
                  className="border py-2 px-2 text-slate-500"
                  value={editContent}
                  onChange={(e) => setEditContent(e.target.value)}
                />
                <div className="flex gap-2">
                  <button
                    className="bg-green-600 text-white px-3 py-1 rounded pointer"
                    onClick={() => handleUpdateNota(note.id, note.filed)}
                  >
                    Save
                  </button>
                  
                  <button
                    className="bg-gray-400 text-white px-3 py-1 rounded pointer"
                    onClick={() => setEditId(null)}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
            <p className="flex-1 break-words text-slate-500 py-2">{note.content}</p>
          )}
          
          <CategoriesNotes noteId={Number(note.id)} refetchTrigger={refetchTrigger} />
          
          <div className="flex justify-between pt-2">
            <small className="text-gray-600">Created: {new Date(note.dateCreation).toLocaleDateString()}</small>
            <small className="text-gray-600">{note.dateModification ? `Updated: ${new Date(note.dateModification).toLocaleDateString()}` : "Never Updated"}</small>
          </div>
          
        </article>
      ))}
    </section>
    </>
  );
};

export default NoteList;