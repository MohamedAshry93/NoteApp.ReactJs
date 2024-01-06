import React, { useContext } from "react";
import Style from "./Sidebar.module.css";
import { NavLink } from "react-router-dom";
import { UserContext } from "../../Context/userContext";
import { showAddModal } from "../../utils/Note";
import { NoteContext } from "../../Context/noteContext";

export default function Sidebar({ isMinimized, setISMinimized }) {
    let { Logout, userToken } = useContext(UserContext);
    let { setNotes } = useContext(NoteContext);
    return (
        <>
            <nav className={`${Style.nav} shadow-sm`}>
                <button
                    className={`btn text-capitalize w-100 mb-3 font-Verdana ${Style.btnMain}`}
                    onClick={() => showAddModal({ userToken, user: setNotes })}
                >
                    <i className="fa-solid fa-plus me-2"></i>
                    {isMinimized ? "" : "New Note"}
                </button>
                <ul className="list-unstyled">
                    <li>
                        <NavLink to="/">
                            <i className="fa-solid fa-house-chimney me-2 fs-5"></i>
                            {isMinimized ? "" : "Home"}
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/search">
                            <i className="fa-solid fa-magnifying-glass me-2 fs-5"></i> {isMinimized ? "" : "Search"}
                        </NavLink>
                    </li>
                    <li onClick={Logout}>
                        <span className="pointer">
                            <i className="fa-solid fa-arrow-right-from-bracket me-2 fs-5"></i>
                            {isMinimized ? "" : "Log Out"}
                        </span>
                    </li>
                    <li></li>
                </ul>
                <div
                    className={`${Style.change} shadow pointer`}
                    onClick={() => setISMinimized(!isMinimized)}
                >
                    <i className={`fa-solid ${isMinimized ? "fa-chevron-right" : "fa-chevron-left"} `}></i>
                </div>
            </nav>
        </>
    );
}
