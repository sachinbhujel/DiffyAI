"use client";

import React, { useState } from 'react'

// TextareaAutosize for auto-resizing textarea
import TextareaAutosize from "react-textarea-autosize";

function PromptBar({ handleSubmit, disabledButton, modelShown, bestModelClicked, handleModelShown, setBestModelClicked, handleBestModel, handleMultiChat }) {
    const [prompt, setPrompt] = useState("");
    return (
        <form onSubmit={(e) => handleSubmit(e, prompt, setPrompt)} className="flex justify-center">
            <div className="absolute bg-background bottom-3 border border-primary left-1/2 transform -translate-x-1/2 shadow-lg w-[90%] rounded-xl flex flex-col items-end p-2 gap-2 justify-center">
                <TextareaAutosize
                    rows={1}
                    minRows={1}
                    maxRows={3}
                    className="w-full p-2 focus:outline-none resize-none text-base"
                    placeholder="Ask me anything..."
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === "Enter" && !e.shiftKey) {
                            e.preventDefault();
                            handleSubmit(e, prompt, setPrompt);
                        }
                    }}
                />
                <div className="flex items-center gap-2 relative">
                    {modelShown && (
                        <div className={`border p-2 text-white bg-black absolute ${bestModelClicked ? "-top-39" : "-top-43"} rounded-md flex flex-col gap-3`}>
                            <h2 className="font-semibold text-sm">Choose a mode</h2>
                            <div className="flex items-center cursor-pointer gap-4 p-1 justify-between" onClick={() => {
                                setBestModelClicked(false);
                                handleMultiChat();
                            }} >
                                <div className="flex items-center gap-2">
                                    <svg xmlns="http://www.w3.org/2000/svg"
                                        width="20"
                                        height="20"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        className="lucide lucide-bot-icon lucide-bot">
                                        <path d="M12 8V4H8" />
                                        <rect width="16" height="12" x="4" y="8" rx="2" />
                                        <path d="M2 14h2" /><path d="M20 14h2" />
                                        <path d="M15 13v2" /><path d="M9 13v2" />
                                    </svg>
                                    <div>
                                        <h3 className="text-sm font-semibold">Multi-Chat</h3>
                                        <p className="text-xs">Response from multiple AIs</p>
                                    </div>
                                </div>
                                <div>
                                    {bestModelClicked ? (
                                        ""
                                    ) : (
                                        <svg xmlns="http://www.w3.org/2000/svg"
                                            width="20"
                                            height="20"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            className="lucide lucide-check-icon lucide-check">
                                            <path d="M20 6 9 17l-5-5" />
                                        </svg>
                                    )}
                                </div>
                            </div>
                            <div className="flex items-center cursor-pointer gap-4 p-1 justify-between" onClick={() => setBestModelClicked(true)}>
                                <div className="flex items-center gap-2">
                                    <svg xmlns="http://www.w3.org/2000/svg"
                                        width="20"
                                        height="20"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        className="lucide lucide-brain-icon lucide-brain">
                                        <path d="M12 18V5" />
                                        <path d="M15 13a4.17 4.17 0 0 1-3-4 4.17 4.17 0 0 1-3 4" />
                                        <path d="M17.598 6.5A3 3 0 1 0 12 5a3 3 0 1 0-5.598 1.5" />
                                        <path d="M17.997 5.125a4 4 0 0 1 2.526 5.77" />
                                        <path d="M18 18a4 4 0 0 0 2-7.464" />
                                        <path d="M19.967 17.483A4 4 0 1 1 12 18a4 4 0 1 1-7.967-.517" />
                                        <path d="M6 18a4 4 0 0 1-2-7.464" />
                                        <path d="M6.003 5.125a4 4 0 0 0-2.526 5.77" />
                                    </svg>
                                    <div>
                                        <h3 className="text-sm font-semibold">SuperDiffy</h3>
                                        <p className="text-xs">Choose best model</p>
                                    </div>
                                </div>
                                <div>
                                    {bestModelClicked ? (
                                        <svg xmlns="http://www.w3.org/2000/svg"
                                            width="20"
                                            height="20"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            className="lucide lucide-check-icon lucide-check">
                                            <path d="M20 6 9 17l-5-5" />
                                        </svg>
                                    ) : ""}
                                </div>
                            </div>
                        </div>
                    )}
                    <div>
                        {bestModelClicked ? (
                            <div className="flex items-center gap-2 rounded-md cursor-pointer" onClick={handleModelShown}>
                                <div className="text-white p-[6.8px] px-3 rounded-lg flex items-center gap-2 font-semibold bg-gradient-to-r from-[#ca3f51] via-orange-400 to-yellow-400 hover:from-yellow-400 hover:via-orange-400 hover:to-[#ca3f51] transition-all duration-700 shadow-lg" disabled={disabledButton} onClick={handleBestModel}>
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
                                        className="lucide lucide-brain"
                                    >
                                        <path d="M12 18V5" />
                                        <path d="M15 13a4.17 4.17 0 0 1-3-4 4.17 4.17 0 0 1-3 4" />
                                        <path d="M17.598 6.5A3 3 0 1 0 12 5a3 3 0 1 0-5.598 1.5" />
                                        <path d="M17.997 5.125a4 4 0 0 1 2.526 5.77" />
                                        <path d="M18 18a4 4 0 0 0 2-7.464" />
                                        <path d="M19.967 17.483A4 4 0 1 1 12 18a4 4 0 1 1-7.967-.517" />
                                        <path d="M6 18a4 4 0 0 1-2-7.464" />
                                        <path d="M6.003 5.125a4 4 0 0 0-2.526 5.77" />
                                    </svg>
                                    <div className="flex items-center gap-1">
                                        <p>SuperDiffy</p>
                                        <svg xmlns="http://www.w3.org/2000/svg"
                                            width="20"
                                            height="20"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            className="lucide lucide-chevron-down-icon lucide-chevron-down">
                                            <path d="m6 9 6 6 6-6" />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="flex border items-center gap-2 p-1.5 rounded-md cursor-pointer" onClick={handleModelShown}>
                                <svg xmlns="http://www.w3.org/2000/svg"
                                    width="20"
                                    height="20"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="lucide lucide-bot-icon lucide-bot">
                                    <path d="M12 8V4H8" />
                                    <rect width="16" height="12" x="4" y="8" rx="2" />
                                    <path d="M2 14h2" /><path d="M20 14h2" />
                                    <path d="M15 13v2" /><path d="M9 13v2" />
                                </svg>
                                <div className="flex items-center gap-1">
                                    <p>Multi Chat</p>
                                    <svg xmlns="http://www.w3.org/2000/svg"
                                        width="20"
                                        height="20"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        className="lucide lucide-chevron-down-icon lucide-chevron-down">
                                        <path d="m6 9 6 6 6-6" />
                                    </svg>
                                </div>
                            </div>
                        )}
                    </div>

                    <button
                        type="submit"
                        className={`border w-20 p-1.5 flex justify-center items-center rounded-lg text-gray-300 ${!prompt
                            ? "bg-[#7585a2] cursor-not-allowed"
                            : "bg-primary text-white cursor-pointer"
                            }`}
                        disabled={disabledButton}
                    >
                        {!prompt ? "Disabled" : "Enter"}
                    </button>
                </div>
            </div>
        </form>
    )
}

export default PromptBar;