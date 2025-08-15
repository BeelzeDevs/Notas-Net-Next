"use client";

import { useState } from "react";
import NoteList from "./NoteList";
import CreateNote from "./createNote";


const Notes = () => {
    const [refetchNotes,setRefetchNotes] = useState(0);
  
    const handleCreatedNote = () => {
        setRefetchNotes((prev)=> prev+1);
    };
    const refetchTriggerNotes = () => {
        setRefetchNotes((prev)=> prev+1);
    };
    
    return (
        <>
            <CreateNote onNoteCreated={handleCreatedNote}/>
            <NoteList refetchTrigger={refetchTriggerNotes} refetchNotes= {refetchNotes}/>
        </>
    );
};

export default Notes;
