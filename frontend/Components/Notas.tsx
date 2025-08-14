"use client";

import { useEffect, useState } from "react";
import NotasList from "./NotaList";
import CreateNota from "./createNota";


const Notas = () => {
    const [refetchNotas,setRefetchNotas] = useState(0);
  
    const handleNotaCreada = () => {
        setRefetchNotas((prev)=> prev+1);
    };
    const triggerRefreshNotas = () => {
        setRefetchNotas((prev)=> prev+1);
    };
    
    return (
        <>
            <CreateNota onNotaCreada={handleNotaCreada}/>
            <NotasList refetchTrigger={triggerRefreshNotas} refetchNotas= {refetchNotas}/>
        </>
    );
};

export default Notas;
