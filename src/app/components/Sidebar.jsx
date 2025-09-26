"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { keys, values } from "idb-keyval";

function Sidebar({ isVisible, setIsVisible }) {
    const [sidebarWidth, setSidebarWidth] = useState(false);
    const [noOfChats, setNoOfChats] = useState([]);
    const [id, setId] = useState([]);
    const [isDark, setIsDark] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        values().then((values) => {
            for (let i = 0; i < values.length; i++) {
                setNoOfChats((prev) => [...prev, values[i].title]);
            }
        });

        keys().then((keys) => {
            setId(keys);
        });
    }, []);

    const handleTheme = (checked) => {
        setIsDark(checked);
        const newTheme = checked ? "dark" : "light";
        const oldTheme = checked ? "light" : "dark";

        document.documentElement.classList.remove(oldTheme);
        document.documentElement.classList.add(newTheme);

        localStorage.setItem("theme", newTheme);
    };

    useEffect(() => {
        const savedTheme = localStorage.getItem("theme");
        if (savedTheme) {
            const darkTheme = savedTheme === "dark";
            setIsDark(darkTheme);
            document.documentElement.classList.add(savedTheme);
        }
    }, []);

    return (
        <div
            className={`rounded-md border-primary border-2 bg-background z-10 flex flex-col p-2 ${
                isVisible ? "fixed sm:static h-[calc(100vh-16px)]" : ""
            } border ${
                sidebarWidth ? "w-max" : "w-[250px]"
            } overflow-y-auto custom-scrollbar`}
        >
            <div className="flex flex-col gap-10 justify-between h-full">
                <div>
                    <div
                        className={`items-center gap-20 justify-between ${
                            sidebarWidth ? "flex-col" : "flex"
                        }`}
                    >
                        <div
                            className={`flex items-center gap-1.5 ${
                                sidebarWidth ? "justify-center" : ""
                            }`}
                        >
                            <Link href="/">
                                <img
                                    src="/logo.svg"
                                    className="w-7 h-7 object-cover cursor-pointer"
                                />
                            </Link>
                            {!sidebarWidth && (
                                <span className="tracking-wide text-lg text-text font-bold">
                                    diffyAI
                                </span>
                            )}
                        </div>
                        <div
                            className={`text-text rounded-sm cursor-pointer flex justify-center text-center hidden sm:flex ${
                                sidebarWidth ? "mt-4" : ""
                            }`}
                            onClick={() => setSidebarWidth(!sidebarWidth)}
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
                                className="lucide lucide-panel-right-close-icon lucide-panel-right-close"
                            >
                                <rect
                                    width="18"
                                    height="18"
                                    x="3"
                                    y="3"
                                    rx="2"
                                />
                                <path d="M15 3v18" />
                                <path d="m8 9 3 3-3 3" />
                            </svg>
                        </div>
                        <div
                            className={`text-primary cursor-pointer p-2 flex justify-center block sm:hidden ${
                                sidebarWidth ? "mt-5" : ""
                            }`}
                            onClick={() => setIsVisible(false)}
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
                                className="lucide lucide-panel-right-close-icon lucide-panel-right-close"
                            >
                                <rect
                                    width="18"
                                    height="18"
                                    x="3"
                                    y="3"
                                    rx="2"
                                />
                                <path d="M15 3v18" />
                                <path d="m8 9 3 3-3 3" />
                            </svg>
                        </div>
                    </div>
                    <div className="flex flex-col gap-10">
                        <ul
                            className={`mt-6 space-y-1 ${
                                sidebarWidth ? "flex flex-col items-center" : ""
                            }`}
                        >
                            <li>
                                <Link
                                    href="/"
                                    className={`hover:bg-primary hover:text-white border-2 border-primary block rounded-sm ${
                                        pathname === "/"
                                            ? "bg-primary text-white"
                                            : ""
                                    } px-2 py-2 flex items-center gap-2`}
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="20"
                                        height="20"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        className="lucide lucide-house-icon lucide-house"
                                    >
                                        <path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8" />
                                        <path d="M3 10a2 2 0 0 1 .709-1.528l7-6a2 2 0 0 1 2.582 0l7 6A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                                    </svg>
                                    {sidebarWidth ? "" : "Home"}
                                </Link>
                            </li>

                            <li>
                                <Link
                                    href="/chat"
                                    className={`hover:bg-primary hover:text-white border-2 border-primary rounded-sm ${
                                        pathname === "/chat"
                                            ? "bg-primary text-white"
                                            : ""
                                    } block px-2 py-2 flex items-center gap-2`}
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="20"
                                        height="20"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        className="lucide lucide-message-square-plus-icon lucide-message-square-plus"
                                    >
                                        <path d="M22 17a2 2 0 0 1-2 2H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.71.71 0 0 1 2 21.286V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2z" />
                                        <path d="M12 8v6" />
                                        <path d="M9 11h6" />
                                    </svg>
                                    {sidebarWidth ? "" : "New Chat"}
                                </Link>
                            </li>
                        </ul>
                        <div
                            className={`flex flex-col gap-2 ${
                                sidebarWidth ? "flex flex-col items-center" : ""
                            }`}
                        >
                            <h3 className="text-base font-semibold">Chats</h3>
                            {sidebarWidth && (
                                <div
                                    onClick={
                                        sidebarWidth
                                            ? () =>
                                                  setSidebarWidth(!sidebarWidth)
                                            : undefined
                                    }
                                    className="border-2 border-primary block rounded-sm hover:bg-primary hover:text-white px-2 py-2"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="20"
                                        height="20"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        className="lucide lucide-message-circle-icon lucide-message-circle"
                                    >
                                        <path d="M2.992 16.342a2 2 0 0 1 .094 1.167l-1.065 3.29a1 1 0 0 0 1.236 1.168l3.413-.998a2 2 0 0 1 1.099.092 10 10 0 1 0-4.777-4.719" />
                                    </svg>
                                </div>
                            )}

                            {noOfChats.length > 0 ? (
                                <div className="h-45 overflow-auto all-model-scrollbar flex flex-col gap-2">
                                    {noOfChats.map((chat, index) => (
                                        <div key={index}>
                                            {!sidebarWidth && (
                                                <li className="list-none">
                                                    {}
                                                    <a
                                                        href={`/chat/${id[index]}`}
                                                        className={`hover:bg-primary hover:text-white border-2 border-primary block rounded-sm ${
                                                            pathname ===
                                                            `/chat/${id[index]}`
                                                                ? "bg-primary text-white"
                                                                : ""
                                                        } px-2 py-2 flex items-center gap-2`}
                                                    >
                                                        {chat}
                                                    </a>
                                                </li>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-text h-45 font-light flex justify-center items-center">
                                    No chats found
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <div className="flex flex-col gap-2">
                    <div
                        className={`w-max flex ${
                            sidebarWidth ? "m-auto" : "m-left"
                        }`}
                    >
                        <label
                            htmlFor="hs-xs-toggle"
                            className="relative inline-block w-9 h-5 cursor-pointer"
                        >
                            <input
                                type="checkbox"
                                id="hs-xs-toggle"
                                checked={isDark}
                                className="peer sr-only"
                                onChange={(e) => handleTheme(e.target.checked)}
                            />
                            <span className="absolute inset-0 bg-gray-400 rounded-full transition-colors duration-200 ease-in-out peer-checked:bg-primary dark:bg-gray-500 dark:peer-checked:bg-primary peer-disabled:opacity-50 peer-disabled:pointer-events-none"></span>
                            <span className="absolute top-1/2 start-0.5 -translate-y-1/2 size-4 bg-white rounded-full shadow-xs transition-transform duration-200 ease-in-out peer-checked:translate-x-full dark:peer-checked:bg-white"></span>
                        </label>
                    </div>
                    <ul>
                        <li
                            className={` ${
                                sidebarWidth ? "flex flex-col items-center" : ""
                            }`}
                        >
                            <Link
                                href="/configure"
                                className={`hover:bg-primary hover:text-background border-2 border-primary ${
                                    pathname === "/configure"
                                        ? "bg-primary text-white"
                                        : ""
                                } rounded-sm block px-2 py-2 flex items-center gap-2`}
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="20"
                                    height="20"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="lucide lucide-settings-icon lucide-settings"
                                >
                                    <path d="M9.671 4.136a2.34 2.34 0 0 1 4.659 0 2.34 2.34 0 0 0 3.319 1.915 2.34 2.34 0 0 1 2.33 4.033 2.34 2.34 0 0 0 0 3.831 2.34 2.34 0 0 1-2.33 4.033 2.34 2.34 0 0 0-3.319 1.915 2.34 2.34 0 0 1-4.659 0 2.34 2.34 0 0 0-3.32-1.915 2.34 2.34 0 0 1-2.33-4.033 2.34 2.34 0 0 0 0-3.831A2.34 2.34 0 0 1 6.35 6.051a2.34 2.34 0 0 0 3.319-1.915" />
                                    <circle cx="12" cy="12" r="3" />
                                </svg>
                                {sidebarWidth ? "" : "Configure"}
                            </Link>
                        </li>
                    </ul>

                    {/* User Profile */}
                    {/*<div className="rounded-sm">
                        <a
                            href="/"
                            className={`border-2 p-2 border-primary flex items-center ${
                                sidebarWidth ? "justify-center" : ""
                            } gap-2`}
                        >
                            <img
                                alt=""
                                src="https://images.unsplash.com/photo-1600486913747-55e5470d6f40?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
                                className={`${
                                    sidebarWidth ? "size-6 flex" : "size-8"
                                } rounded-full object-cover`}
                            />

                            {!sidebarWidth && (
                                <div>
                                    <p className="text-xs">
                                        <strong className="block font-bold text-base">
                                            Eric Frusciante
                                        </strong>

                                        <span className="text-xs">
                                            {" "}
                                            eric@frusciante.com{" "}
                                        </span>
                                    </p>
                                </div>
                            )}
                        </a>
                    </div> */}
                </div>
            </div>
        </div>
    );
}

export default Sidebar;
