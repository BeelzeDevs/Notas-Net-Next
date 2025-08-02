import { useState, useEffect } from "react";
import { NotaRead } from "@/types/NotaRead";
import { fetchNotas,eliminarNota } from "@/Services/notesApi";


const NotasList = ({ refetchTrigger, setRefetchTrigger }: { refetchTrigger: boolean, setRefetchTrigger: React.Dispatch<React.SetStateAction<boolean>> }) => {
  const [notas, setNotas] = useState<NotaRead[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorDelete, setErrorDelete] = useState(false);

  useEffect(() => {
    fetchNotas()
      .then(data => setNotas(data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, [refetchTrigger]);

  const handleDeleteNota = (notaId:number)=>{
    eliminarNota(notaId)
      .then(() => setRefetchTrigger(prev=> !prev))
      .catch(() => setErrorDelete(true));
    
  }
  if (loading) return <p>Cargando notas...</p>;

  return (
    <section className="grid gap-4 p-4 w-full justify-center">
      {notas.map((nota) => (
        <article key={nota.id} className="flex flex-col px-4 py-2 border bg-white rounded shadow max-w-xl">
          
          <div className="flex justify-between">
            <h2 className="text-xl text-cyan-500 font-bold">{nota.titulo}</h2>
            <div className="flex gap-3">
                <button className="text-sm md:text-md text-slate-600 px-3 py-1 rounded-lg bg-secondary">Editar</button>
                <button className="text-sm md:text-md text-slate-50 bg-red-600 px-3 py-1 rounded-lg"
                onClick={()=>handleDeleteNota(nota.id)}
                >Eliminar</button>
            </div>
          </div>
          
          <p className="flex text-slate-500 py-2">{nota.contenido}</p>
          
          <div className="flex justify-between pt-2">
            <small className="text-gray-600">Creado: {new Date(nota.fechaCreacion).toLocaleDateString()}</small>
            <small className="text-gray-600">Modificado: {new Date(nota.fechaCreacion).toLocaleDateString()}</small>
          </div>
          
        </article>
      ))}
    </section>
  );
};

export default NotasList;