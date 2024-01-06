import React, { useContext, useEffect } from "react";
import Style from "./Home.module.css";
import { UserContext } from "../../Context/userContext";
import { NoteContext } from "../../Context/noteContext";
import Note from "../Note/Note";
import { getUserNotes } from "../../utils/Note";
export default function Home() {
    let { userToken } = useContext(UserContext);
    let { notes, setNotes, isLoading } = useContext(NoteContext);
    useEffect(() => {
        getUserNotes({ userToken, user: setNotes });
    }, []);
    return (
        <>
            <h2 className="font-Montserrat h4 heading">
                <i className="fa-regular fa-folder-open me-2"></i>My Notes
            </h2>
            {notes === null ? (
                <div className="w-100 d-flex justify-content-center vh-100 align-items-center">
                    <span className={Style.loader}></span>
                </div>
            ) : notes?.length === 0 ? (
                <h2 className="text-light">No Notes found</h2>
            ) : (
                <div className={Style.notes}>
                    {notes?.map((note) => (
                        <Note noteData={note} key={note._id} />
                    ))}
                </div>
            )}
        </>
    );
}
