import React from "react";
import Conversation from "./Conversations";

function ModelPanel({
    response,
    messages,
    model,
    modelIcons,
    isActive,
    onToggle,
    onToggleExpandModel,
    isModelActive,
}) {
    return (
        <div
            className={`border-2 rounded-lg border-primary transition-all overflow-auto all-model-scrollbar duration-300 ${isActive ? "w-90 min-w-90" : "w-max min-w-max"
                } ${isModelActive ? "min-w-[80%] w-[80%]" : ""
                }`}
        >
            <div
                className={`h-10 p-2 w-full flex backdrop-blur-xs items-center justify-between sticky top-0 bg-primary/30`}
            >
                <div className="flex justify-center items-center gap-1">
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
                                <div className="relative w-9 h-5 bg-primary rounded-full peer dark:bg-primary peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-primary after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-primary peer-checked:bg-primary dark:peer-checked:bg-primary"></div>
                            </label>
                        </button>
                    )}

                    {isActive && (
                        <div
                            onClick={onToggleExpandModel}
                            className="p-1 cursor-pointer"
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
                                className="lucide lucide-minimize2-icon lucide-minimize-2"
                            >
                                <path d="m14 10 7-7" />
                                <path d="M20 10h-6V4" />
                                <path d="m3 21 7-7" />
                                <path d="M4 14h6v6" />
                            </svg>
                        </div>
                    )}
                </div>
            </div>
            <Conversation
                response={response}
                messages={messages}
                isChecked={isActive}
                onToggle={onToggle}
            />
        </div>
    );
}

export default ModelPanel;
