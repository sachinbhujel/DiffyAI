import { streamText, convertToModelMessages } from "ai";
import { createOpenRouter } from "@openrouter/ai-sdk-provider";

export async function POST(request) {
    try {
        const data = await request.json();
        const apiKey = await request.headers.get("x-openrouter-api-key");

        if (!apiKey) {
            return new Response("Missing Api Key", { status: 401 });
        }

        const openrouter = createOpenRouter({
            apiKey: apiKey,
        });

        const result = streamText({
            model: openrouter.chat("anthropic/claude-3.7-sonnet"),
            messages: convertToModelMessages(data.messages),
        });

        return result.toUIMessageStreamResponse();
    } catch (error) {
        return new Response("Failed", { status: 500 });
    }
}
