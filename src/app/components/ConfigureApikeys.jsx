"use client";

import React, { useState, useEffect } from "react";

function ConfigureApikeys() {
    const [keys, setKeys] = useState({
        groq: "",
        openai: "",
        openrouter: "",
        gemini: "",
    });

    useEffect(() => {
        const savedApi = {
            groq: localStorage.getItem("groqkey") || "",
            openai: localStorage.getItem("openaikey") || "",
            openrouter: localStorage.getItem("openrouterkey") || "",
            gemini: localStorage.getItem("geminikey") || "",
        };
        setKeys(savedApi);
    }, []);

    const handleChange = (model_name, value) => {
        setKeys((prev) => ({
            ...prev,
            [model_name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        localStorage.setItem("groqkey", keys.groq);
        localStorage.setItem("openaikey", keys.openai);
        localStorage.setItem("openrouterkey", keys.openrouter);
        localStorage.setItem("geminikey", keys.gemini);

        if (!!localStorage.getItem("groqkey")) {
            localStorage.setItem("llama", true);
            localStorage.setItem("deepseek", true);
            localStorage.setItem("openaiGptOss120b", true);
        } else {
            localStorage.setItem("llama", false);
            localStorage.setItem("deepseek", false);
            localStorage.setItem("openaiGptOss120b", false);
        }

        if (!!localStorage.getItem("openaikey")) {
            localStorage.setItem("openai", true);
        } else {
            localStorage.setItem("openai", false);
        }

        if (!!localStorage.getItem("geminikey")) {
            localStorage.setItem("gemini", true);
        } else {
            localStorage.setItem("gemini", false);
        }

        if (!!localStorage.getItem("openrouterkey")) {
            localStorage.setItem("claude", true);
        } else {
            localStorage.setItem("claude", false);
        }
    };


    return (
        <div>
            <form
                onSubmit={handleSubmit}
                className="border rounded-md border-primary sm:w-[80%] m-auto flex flex-col gap-4 justify-center items-center p-4"
            >
                <input
                    type="password"
                    className="border rounded-sm w-full p-2"
                    value={keys.groq}
                    placeholder="Enter your Groq API key"
                    onChange={(e) => {
                        handleChange("groq", e.target.value);
                    }}
                />
                <input
                    type="password"
                    className="border rounded-sm w-full p-2"
                    value={keys.openai}
                    placeholder="Enter your OpenAI API key"
                    onChange={(e) => {
                        handleChange("openai", e.target.value);
                    }}
                />
                <input
                    type="password"
                    className="border rounded-sm w-full p-2"
                    value={keys.openrouter}
                    onChange={(e) => {
                        handleChange("openrouter", e.target.value);
                    }}
                    placeholder="Enter your Openrouter API key"
                />
                <input
                    type="password"
                    className="border rounded-sm w-full p-2"
                    value={keys.gemini}
                    onChange={(e) => {
                        handleChange("gemini", e.target.value);
                    }}
                    placeholder="Enter your Gemini API key"
                />
                <button
                    type="submit"
                    className="cursor-pointer border shadow-lg border-primary text-background bg-primary rounded-lg w-[90%] p-2"
                >
                    Save
                </button>
            </form>
        </div>
    )
}

export default ConfigureApikeys