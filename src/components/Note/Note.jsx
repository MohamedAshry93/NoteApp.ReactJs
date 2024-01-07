import React, { useContext } from "react";
import Style from "./Note.module.css";
import { showDeleteModal, showUpdateModal } from "../../utils/Note";
import { UserContext } from "../../Context/userContext";
import { NoteContext } from "../../Context/noteContext";

export default function Note({ noteData }) {
    const { userToken } = useContext(UserContext);
    const { setNotes } = useContext(NoteContext);

    return (
        <>
            <div className={`${Style.note} note shadow `}>
                <div className="note-body">
                    <h2 className="h6 fw-semibold m-0 font-Montserrat ">
                        {noteData.title}
                    </h2>
                    <p className={`mb-0 mt-2`}>{noteData.content}</p>
                </div>

                <div className="note-footer">
                    <i
                        className={`fa-solid fa-pen-to-square pointer me-2 ${Style.edit}`}
                        onClick={() =>
                            showUpdateModal({
                                prevTitle: noteData.title,
                                prevContent: noteData.content,
                                noteId: noteData._id,
                                userToken,
                                user: setNotes,
                            })
                        }
                    ></i>

                    <i
                        className={`${Style.delete} fa-solid fa-trash pointer`}
                        onClick={() =>
                            showDeleteModal({
                                noteId: noteData._id,
                                userToken,
                                user: setNotes,
                            })
                        }
                    ></i>
                </div>
            </div>
        </>
    );
}
