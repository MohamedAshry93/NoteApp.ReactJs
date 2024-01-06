import React, { useState } from "react";
import Style from "./Layout.module.css";
import { Outlet } from "react-router-dom";
import Sidebar from "./../Sidebar/Sidebar";

export default function Layout() {
    const [isMinimized, setISMinimized] = useState(
        localStorage.getItem("isMinimized")
    );
    localStorage.setItem("isMinimized", isMinimized);
    return (
        <>
            <div className={`d-flex min-vh-100 align-items-stretch ${Style.dark}`}>
                <div
                    className={isMinimized ? Style["sidebar-mini"] : `${Style.sidebar}`}
                >
                    <Sidebar isMinimized={isMinimized} setISMinimized={setISMinimized} />
                </div>
                <div className={Style.content}>
                    <Outlet />
                </div>
            </div>
        </>
    );
}
