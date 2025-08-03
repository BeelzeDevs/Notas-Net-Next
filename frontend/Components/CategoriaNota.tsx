import { CategoriaRead } from "@/types/CategoriaRead";
import { deleteNotaxCategoria, fetchCategoriasByIdNotas } from "@/Services/notesxCategoryApi";
import { useEffect, useState } from "react";
import ModalCategoria from "./ModalCategoria";

const CategoriaNota = ({notaId, refetchTrigger} : {notaId:number , refetchTrigger: ()=> void}) => {
    const [categorias, setCategorias] = useState<CategoriaRead[]>([]);
    const [error, setError] = useState(null);

    const [modalAdd,setModalAdd] = useState(false);

    useEffect(()=>{
        fetchCategoriasByIdNotas(notaId)
        .then(setCategorias)
        .catch(setError)
    }
    ,[notaId]);
    
    const addCategoryModalHandle = () =>{
        setModalAdd((prev)=> !prev);
    }

    const handleDeleteCategory = (categoriaId:number) =>{
        deleteNotaxCategoria(notaId,categoriaId);
        refetchTrigger();
    }
    
    return ( 
        <div className="flex gap-5 py-2 items-center flex-wrap">
            <button 
            className="text-white bg-slate-500 rounded-full px-2 py-1 hover:bg-green-500/80 pointer"
            onClick={addCategoryModalHandle}
            >+</button>
            {categorias && 
                categorias.map((item)=>{
                    return(
                        <div key={item.id} className="flex text-sm justify-center py-1">
                            <span 
                            className="text-white bg-sky-600 rounded-s-lg px-2"
                            >{item.nombre}</span>
                            <button 
                            className="text-white bg-sky-600 rounded-right pointer px-2 hover:bg-red-600/80"
                            onClick={()=> handleDeleteCategory(item.id)}
                            >x</button>
                        </div>
                    )
                })
            }
            {error &&
            <p className="text-red-500">{String(error)}</p>

            }
            {modalAdd && 
            <ModalCategoria NotaId={notaId} refetchTrigger={refetchTrigger}/>
            }
        </div>
    );
}
 
export default CategoriaNota;