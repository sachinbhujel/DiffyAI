import React from "react";
import ChatContainer from "../components/ChatContainer";

export const metadata = {
    title: `Create a new chat | DiffyAI`,
    description: "Create a new chat | DiffyAI lets you easily compare responses from multiple AI models, like OpenAI GPT, Claude, Gemini, LLaMA, and more - all side by side in one place.",
    keywords: "create a new chat, ai, diffyai, mutli model ai"
};

function ModelContainer() {
    return (
        <ChatContainer />
    );
}

export default ModelContainer;
