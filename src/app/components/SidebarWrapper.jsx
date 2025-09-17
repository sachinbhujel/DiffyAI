"use client";

import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";

function SidebarWrapper() {
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        const handleResize = () => {
            setIsVisible(window.innerWidth >= 768);
        };

        handleResize();
        window.addEventListener("resize", handleResize);

        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <div>
            {isVisible ? (
                <Sidebar isVisible={isVisible} setIsVisible={setIsVisible} />
            ) : (
                <div
                    className="border sm:hidden fixed top-4 left-4 z-99 cursor-pointer"
                    onClick={() => setIsVisible(true)}
                >
                    <button>ferg</button>
                </div>
            )}
        </div>
    );
}

export default SidebarWrapper;
