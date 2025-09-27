import React from "react";
import ConfigureApikeys from "../components/ConfigureApikeys";

export const metadata = {
    title: `Configure | DiffyAI`,
    description: "Configure | DiffyAI lets you easily compare responses from multiple AI models, like OpenAI GPT, Claude, Gemini, LLaMA, and more - all side by side in one place.",
    keywords: "configure, ai, diffyai, mutli model ai"
};

function Configure() {
    return (
        <div className="w-full p-2 flex flex-col text-text border-2 border-primary rounded-md overflow-auto custom-scrollbar">
            <div className="my-10 flex flex-col gap-4 justify-center items-center text-center">
                <h1 className="text-5xl font-bold text-primary">Configure</h1>
                <p className="text-lg text-text w-[90%] sm:w-[70%]">
                    Your API keys will be stored in your browser so you do not
                    have to re-enter it every time — it never leaves your
                    device.
                </p>
            </div>
            <ConfigureApikeys />
        </div>
    );
}

export default Configure;
