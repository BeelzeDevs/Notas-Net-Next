import { useState, useEffect } from "react";
import { NotaRead } from "@/types/NotaRead";
import { fetchNotasActivas,eliminarNota,modificarNota, toogleArchivadoNota, fetchNotasArchivadas,fetchNotasPorCategoriaArchivadas,fetchNotasPorCategoriaNoArchivadas } from "@/Services/notesApi";
import { fetchCategorias } from "@/Services/categoryApi";
import CategoriaNota from "./CategoriaNota";
import { CategoriaRead } from "@/types/CategoriaRead";


const NotasList = ({refetchNotas, refetchTrigger} : {refetchNotas: boolean, refetchTrigger: ()=> void}) => {
  const [notas, setNotas] = useState<NotaRead[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorNotas, setErrorNotas] = useState<Error | null>(null);
  const [errorDelete, setErrorDelete] = useState<Error | null>(null);
  

  const [editandoId, setEditandoId] = useState<number | null>(null);
  const [tituloEditado, setTituloEditado] = useState("");
  const [contenidoEditado, setContenidoEditado] = useState("");
  const [errorUpdate, setErrorUpdate] = useState<Error | null>(null);

  const [showArchived ,setShowArchived ] = useState(false);
  const [errorArchivando,setErrorArchivando] = useState<Error | null>(null);

  const [categorias, setCategorias] = useState<CategoriaRead[]>();
  const [errorCategorias,setErrorCategorias] = useState<Error | null>(null);
  const [filterCategoria,setFilterCategoria] = useState("all");

  useEffect(()=>{
    fetchCategorias()
    .then(setCategorias)
    .catch(setErrorCategorias)
    
  },[])

  useEffect(() => {
    setLoading(true);

    const fetchNotas = async () => {
      try {
        let data;

        if (filterCategoria === "all") {
          data = showArchived ? await fetchNotasArchivadas() : await fetchNotasActivas();
          
        } else {

          const categoriaId = parseInt(filterCategoria);
          data = showArchived
            ? await fetchNotasPorCategoriaArchivadas(categoriaId)
            : await fetchNotasPorCategoriaNoArchivadas(categoriaId);
        }

        setNotas(data);
      } catch (err) {
        setErrorNotas(err as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchNotas();

  }, [refetchTrigger, showArchived, filterCategoria]);

  

  const handleDeleteNota = (notaId:number)=>{
    eliminarNota(notaId)
      .then(() => refetchTrigger())
      .catch((err) => setErrorDelete(err));
    
  }
  const handleUpdateNota = (notaId: number, archivada:boolean) => {
  
    const Nota = {
    Titulo: tituloEditado,
    Contenido: contenidoEditado,
    Archivada: archivada
    };
    modificarNota(notaId,Nota)
    .then(()=>{
      setEditandoId(null)
      refetchTrigger()
    })
    .catch((err)=> setErrorUpdate(err))

  }

  const handleFileNota = (notaId : number) =>{
    toogleArchivadoNota(notaId)
    .then(()=>{
      refetchTrigger();
    })
    .catch(setErrorArchivando)
  }
  const handleCategoriaChange =  (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilterCategoria(e.target.value);
  };

  if (loading) return <p>Cargando notas...</p>;

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
      value={filterCategoria}
      onChange={handleCategoriaChange}
      >
          <option value="all" className="text-white ">All</option>
          {categorias && 
          categorias.map((item)=>(
            <option value={item.id} key={item.id}
            className="text-white ">{item.nombre}</option>
          ))
          }
      </select>

    </section>
    <section className="grid gap-4 p-4 w-full justify-center">
      {notas.map((nota) => (
        <article key={nota.id} className="flex flex-col px-4 py-2 border bg-white rounded shadow max-w-xl">
          
          <div className="flex justify-between gap-3">
            {editandoId == nota.id ?
            (
              <input
                  className="border px-2 py-1 text-lg md:text-xl text-cyan-500 font-bold"
                  value={tituloEditado}
                  onChange={(e) => setTituloEditado(e.target.value)}
                />
            ) : (
              <h2 className="text-lg md:text-xl text-cyan-500 font-bold">{nota.titulo}</h2>
            )}

            <div className="flex gap-3 items-start">

              <button className={`text-sm md:text-md text-slate-50 px-3 py-1 rounded-lg pointer
              ${nota.archivada ? "bg-amber-600 hover:bg-orange-600/80" : "bg-amber-800 hover:bg-orange-600/80"} `}
              onClick={()=>handleFileNota(nota.id)}
              >{nota.archivada ? "Unarchived":"Archived"}</button>
              <button className="text-sm md:text-md text-white px-3 py-1 rounded-lg bg-cyan-800 pointer hover:bg-cyan-800/80"
              onClick={()=>{
                setEditandoId(nota.id);
                setTituloEditado(nota.titulo);
                setContenidoEditado(nota.contenido);
              }}
              >Edit</button>
              <button className="text-sm md:text-md text-slate-50 bg-red-600 px-3 py-1 rounded-lg pointer hover:bg-red-600/80"
              onClick={()=>handleDeleteNota(nota.id)}
              >Delete</button>
            </div>

          </div>

          {editandoId === nota.id ? (
              <div className="flex flex-col gap-2 py-2">
                <textarea
                  className="border py-2 px-2 text-slate-500"
                  value={contenidoEditado}
                  onChange={(e) => setContenidoEditado(e.target.value)}
                />
                <div className="flex gap-2">
                  <button
                    className="bg-green-600 text-white px-3 py-1 rounded pointer"
                    onClick={() => handleUpdateNota(nota.id, nota.archivada)}
                  >
                    Save
                  </button>
                  
                  <button
                    className="bg-gray-400 text-white px-3 py-1 rounded pointer"
                    onClick={() => setEditandoId(null)}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
            <p className="flex text-slate-500 py-2">{nota.contenido}</p>
          )}
          
          <CategoriaNota notaId={Number(nota.id)} refetchTrigger={refetchTrigger} />
          
          <div className="flex justify-between pt-2">
            <small className="text-gray-600">Created: {new Date(nota.fechaCreacion).toLocaleDateString()}</small>
            <small className="text-gray-600">{nota.fechaModificacion ? `Updated: ${new Date(nota.fechaModificacion).toLocaleDateString()}` : "Never Updated"}</small>
          </div>
          
        </article>
      ))}
    </section>
    </>
  );
};

export default NotasList;