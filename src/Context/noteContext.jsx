import { createContext, useState } from "react";

export const NoteContext = createContext();
export default function NoteContextProvider({ children }) {
    const [isLoading, setIsLoading] = useState(false);
    const [notes, setNotes] = useState(null);
    return (
        <NoteContext.Provider value={{ isLoading, setIsLoading, notes, setNotes }}>
            {children}
        </NoteContext.Provider>
    );
}
