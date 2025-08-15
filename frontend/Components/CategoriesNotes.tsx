import { CategoryRead } from "@/types/CategoryRead";
import { deleteNotexCategoria, fetchCategoriesByNoteId } from "@/Services/NotexCategoriesApi";
import { useEffect, useState } from "react";
import ModalCategory from "./ModalCategory";

const CategoriesNotes = ({noteId, refetchTrigger} : {noteId:number , refetchTrigger: ()=> void}) => {
    const [categories, setCategories] = useState<CategoryRead[]>([]);
    const [error, setError] = useState<Error | null>(null);

    const [modalAdd,setModalAdd] = useState(false);

    useEffect(()=>{
        fetchCategoriesByNoteId(noteId)
        .then(setCategories)
        .catch(setError)
    }
    ,[noteId]);
    
    const addCategoryModalHandle = () =>{
        setModalAdd((prev)=> !prev);
    }

    const handleDeleteCategory = async (categoryId:number) =>{
        await deleteNotexCategoria(noteId,categoryId);
        refetchTrigger();
    }
    
    return ( 
        <div className="flex gap-5 py-2 items-center flex-wrap">
            <button 
            className="text-white bg-slate-500 rounded-full px-2 py-1 hover:bg-green-500/80 pointer"
            onClick={addCategoryModalHandle}
            >+</button>
            {categories && 
                categories.map((item)=>{
                    return(
                        <div key={item.id} className="flex text-sm justify-center py-1">
                            <span 
                            className="text-white bg-sky-600 rounded-s-lg px-2"
                            >{item.name}</span>
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
            <ModalCategory noteId={noteId} refetchTrigger={refetchTrigger}/>
            }
        </div>
    );
}
 
export default CategoriesNotes;