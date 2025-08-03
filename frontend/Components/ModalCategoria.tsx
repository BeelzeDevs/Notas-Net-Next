
import { fetchCategorias } from "@/Services/categoryApi";
import { createNotaxCategoria, fetchCategoriasByIdNotas } from "@/Services/notesxCategoryApi";
import { CategoriaRead } from "@/types/CategoriaRead";
import { useEffect, useState } from "react";

const ModalCategoria = ({NotaId, refetchTrigger} : {NotaId:number , refetchTrigger: ()=> void}) => {
    const [categorias, setCategorias] = useState<CategoriaRead[]>([]);
    const [errorCategorias, setErrorCategorias] = useState(null);

    const [categoriasAlreadyAdded,setCategoriasAlreadyAdded] = useState<CategoriaRead[]>([]);
    const [errorAlreadyAdded, setErrorAlreadyAdded] = useState(null);
    
    const [isAddingCategoria, setIsAddingCategoria] = useState(true);


    useEffect(()=>{
        fetchCategoriasByIdNotas(NotaId)
        .then(setCategoriasAlreadyAdded)
        .catch(setErrorAlreadyAdded)

        fetchCategorias()
        .then(setCategorias)
        .catch(setErrorCategorias)
    },[NotaId])
    
    const handleModalCategoria = () =>{
        setIsAddingCategoria(false);
    }

    const handleAddCategory = (categoriaId:number) =>{
        createNotaxCategoria(NotaId,categoriaId)
        refetchTrigger();
    }

    const existentes = categoriasAlreadyAdded.map((item)=> item.id);
    const categoriasToAdd = categorias.filter((c)=> !existentes.includes(c.id));
    return ( 
        <>
        { isAddingCategoria && categoriasToAdd.length > 0 &&
            
        <section className="relative w-full">
            <div 
            className="flex flex-wrap gap-2 bg-white/75 flex items-center justify-start px-2 py-1"
            >
                
                {categoriasToAdd &&
                categoriasToAdd.map((item)=>(
                    <div key={item.id} className="flex text-sm justify-center py-1">
                            <span 
                            className="text-white bg-green-600 rounded-s-lg px-2"
                            >{item.nombre}</span>
                            <button 
                            className="text-white bg-green-600 rounded-right pointer px-2 hover:bg-green-600/80"
                            onClick={()=>handleAddCategory(item.id)}
                            >+</button>
                    </div>
                ))
                
                }
                <button
                type="button"
                onClick={handleModalCategoria}
                className="absolute py-1 top-0 right-1 text-black text-xl hover:text-red-400 pointer"
                >
                ✖
                </button>
            </div>
        </section>
        }
        </>
     );
}
 
export default ModalCategoria;