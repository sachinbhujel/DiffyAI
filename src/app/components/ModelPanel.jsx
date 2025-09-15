import React from "react";
import Conversation from "./Conversations";

function ModelPanel({ messages, model, modelIcons, isActive, onToggle }) {
    return (
        <div
            className={`border transition-all duration-300 ${
                isActive ? "w-90 min-w-90" : "w-max min-w-max"
            } overflow-auto`}
        >
            <div
                className={`border h-10 p-2 flex items-center justify-between sticky top-0 bg-white`}
            >
                <div className="flex items-center gap-1">
                    {modelIcons}
                    {isActive && <p className="font-bold">{model}</p>}
                </div>
                <div className="flex items-center gap-2">
                    {isActive && (
                        <button>
                            <label className="flex items-center cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={isActive}
                                    onChange={onToggle}
                                    className="sr-only peer"
                                />
                                <div className="relative w-9 h-5 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600 dark:peer-checked:bg-blue-600"></div>
                            </label>
                        </button>
                    )}

                    {isActive && (
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
            <Conversation
                messages={messages}
                isChecked={isActive}
                onToggle={onToggle}
            />
        </div>
    );
}

export default ModelPanel;
