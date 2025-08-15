
import { fetchCategories } from "@/Services/categoryApi";
import { createNotexCategory, fetchCategoriesByNoteId } from "@/Services/NotexCategoriesApi";
import { CategoryRead } from "@/types/CategoryRead";
import { useEffect, useState } from "react";

const ModalCategory = ({noteId, refetchTrigger} : {noteId:number , refetchTrigger: ()=> void}) => {
    const [categories, setCategories] = useState<CategoryRead[]>([]);
    const [errorCategories, setErrorCategories] = useState<Error | null>(null);

    const [categoriesAlreadyAdded,setCategoriesAlreadyAdded] = useState<CategoryRead[]>([]);
    const [errorAlreadyAdded, setErrorAlreadyAdded] = useState<Error | null>(null);
    
    const [isAddingCategoria, setIsAddingCategoria] = useState(true);


    useEffect(()=>{
        fetchCategoriesByNoteId(noteId)
        .then(setCategoriesAlreadyAdded)
        .catch(setErrorAlreadyAdded)

        fetchCategories()
        .then(setCategories)
        .catch(setErrorCategories)
    },[noteId])
    
    const handleModalCategory = () =>{
        setIsAddingCategoria(false);
    }

    const handleAddCategory = async (categoryId:number) =>{
        await createNotexCategory(noteId,categoryId);
        refetchTrigger();
    }

    const existingCatIds = categoriesAlreadyAdded.map((item)=> item.id);
    const categoriesToAdd = categories.filter((c)=> !existingCatIds.includes(c.id));
    return ( 
        <>
        { isAddingCategoria && categoriesToAdd.length > 0 &&
            
        <section className="relative w-full">
            <div 
            className="flex flex-wrap gap-2 bg-white/75 flex items-center justify-start px-2 py-1"
            >
                
                {categoriesToAdd &&
                categoriesToAdd.map((item)=>(
                    <div key={item.id} className="flex text-sm justify-center py-1">
                            <span 
                            className="text-white bg-green-600 rounded-s-lg px-2"
                            >{item.name}</span>
                            <button 
                            className="text-white bg-green-600 rounded-right pointer px-2 hover:bg-green-600/80"
                            onClick={()=>handleAddCategory(item.id)}
                            >+</button>
                    </div>
                ))
                
                }
                <button
                type="button"
                onClick={handleModalCategory}
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
 
export default ModalCategory;