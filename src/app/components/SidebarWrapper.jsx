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
                    className="fixed top-4 left-6 z-99 cursor-pointer"
                    onClick={() => setIsVisible(true)}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-primary lucide lucide-panel-right-close-icon lucide-panel-right-close"
                    >
                        <rect width="18" height="18" x="3" y="3" rx="2" />
                        <path d="M15 3v18" />
                        <path d="m8 9 3 3-3 3" />
                    </svg>
                </div>
            )}
        </div>
    );
}

export default SidebarWrapper;
