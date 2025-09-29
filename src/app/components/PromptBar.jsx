"use client";

import React, { useState } from 'react'

// TextareaAutosize for auto-resizing textarea
import TextareaAutosize from "react-textarea-autosize";

function PromptBar({ handleSubmit, disabledButton }) {
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
        </form>
    )
}

export default PromptBar;