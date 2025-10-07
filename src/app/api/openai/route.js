import { streamText, convertToModelMessages } from "ai";
import { createOpenAI } from "@ai-sdk/openai";

export async function POST(request) {
    try {
        const data = await request.json();
        const apiKey = await request.headers.get("x-openai-api-key");

        if (!apiKey) {
            return new Response("Missing Api Key", { status: 401 });
        }

        const openai = createOpenAI({
            apiKey: apiKey,
        });

        const result = streamText({
            model: openai("gpt-5-nano"),
            messages: convertToModelMessages(data.messages),
        });

        return result.toUIMessageStreamResponse();
    } catch (error) {
        return new Response("Failed", { status: 500 });
    }
}