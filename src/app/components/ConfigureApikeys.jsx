"use client";

import React, { useState, useEffect } from "react";
import { encryptData } from "../actions/encrypt";

function ConfigureApikeys() {
    const [keys, setKeys] = useState({
        groq: "",
        openai: "",
        openrouter: "",
        gemini: "",
    });

    const [localKeys, setLocalKeys] = useState({
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
        setLocalKeys(savedApi);
    }, []);

    const handleChange = (model_name, value) => {
        setKeys((prev) => ({
            ...prev,
            [model_name]: value,
        }));
    };


    async function encryptText(keyData) {
        const result = await encryptData(keyData);

        if (result.groqEncrypted) {
            localStorage.setItem("groqkey", result.groqEncrypted);
        }

        if (result.openaiEncrypted) {
            localStorage.setItem("openaikey", result.openaiEncrypted);
        }

        if (result.openrouterEncrypted) {
            localStorage.setItem("openrouterkey", result.openrouterEncrypted);
        }

        if (result.geminiEncrypted) {
            localStorage.setItem("geminikey", result.geminiEncrypted);
        }


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
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        let groqSet = false;
        let openaiSet = false;
        let openrouterSet = false;
        let geminiSet = false;

        if (keys.groq === localKeys.groq) {
            groqSet = true;
        }

        if (keys.groq === "") {
            localStorage.removeItem("groqkey")
        }

        if (keys.openai === "") {
            localStorage.removeItem("openaikey")
        }

        if (keys.gemini === "") {
            localStorage.removeItem("geminikey")
        }

        if (keys.openrouter === "") {
            localStorage.removeItem("openrouterkey")
        }

        if (keys.openai === localKeys.openai) {
            openaiSet = true;
        }

        if (keys.openrouter === localKeys.openrouter) {
            openrouterSet = true;
        }

        if (keys.gemini === localKeys.gemini) {
            geminiSet = true;
        }

        encryptText({
            "groqkey": keys.groq,
            "groqSet": groqSet,
            "openaiSet": openaiSet,
            "openrouterSet": openrouterSet,
            "geminiSet": geminiSet,
            "openaikey": keys.openai,
            "openrouterkey": keys.openrouter,
            "geminikey": keys.gemini,
        });
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