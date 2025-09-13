"use client";

import React, { useState } from "react";
import Conversation from "./Conversations";

function MessageModel({ messages, model, modelIcons }) {
    const [isChecked, setIsChecked] = useState(true);
    const handleCheck = () => {
        setIsChecked(!isChecked);
    };
    return (
        <div className={`border ${isChecked ? "w-80 min-w-80" : "w-25"}`}>
            <div className="border h-10 p-2 flex items-center justify-between">
                <div className="flex items-center gap-1">
                    {modelIcons}

                    {isChecked && <p className="font-bold">{model}</p>}
                </div>
                <div className="flex items-center gap-2">
                    <button>
                        <label className="flex items-center cursor-pointer">
                            <input
                                type="checkbox"
                                checked={isChecked}
                                onChange={handleCheck}
                                className="sr-only peer"
                            />
                            <div className="relative w-9 h-5 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600 dark:peer-checked:bg-blue-600"></div>
                        </label>
                    </button>

                    {isChecked && (
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
                            className="lucide lucide-minimize2-icon lucide-minimize-2"
                        >
                            <path d="m14 10 7-7" />
                            <path d="M20 10h-6V4" />
                            <path d="m3 21 7-7" />
                            <path d="M4 14h6v6" />
                        </svg>
                    )}
                </div>
            </div>
            <Conversation messages={messages} isChecked={isChecked} />
        </div>
    );
}

export default MessageModel;
