"use client";

import { useState } from "react";
import NotasList from "./NotaList";
import CreateNota from "./createNota";


const Notas = () => {
    const [refetchNotas,setRefetchNotas] = useState(false);
    

    const handleNotaCreada = () => {
        setRefetchNotas(!refetchNotas);
    };
    const triggerRefreshNotas = () => {
        setRefetchNotas(!refetchNotas);
    };
    
    return (
        <>
            <CreateNota onNotaCreada={handleNotaCreada}/>
            <NotasList refetchTrigger={triggerRefreshNotas} refetchNotas= {refetchNotas}/>
        </>
    );
};

export default Notas;
