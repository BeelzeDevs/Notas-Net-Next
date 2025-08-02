"use client";

import { useState } from "react";
import NotasList from "./NotaList";
import CreateNota from "./createNota";


const Notas = () => {
    const [refetchNotes,setRefetchNotes] = useState(false);
    

    const handleNotaCreada = () => {
        setRefetchNotes(!refetchNotes);
    };
    
    return (
        <>
            <CreateNota onNotaCreada={handleNotaCreada}/>
            <NotasList refetchTrigger={refetchNotes} setRefetchTrigger={setRefetchNotes} />
        </>
    );
};

export default Notas;
