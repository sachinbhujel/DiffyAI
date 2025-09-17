import { streamText, convertToModelMessages } from "ai";
import { createGroq } from "@ai-sdk/groq";

export async function POST(request) {
    try {
        const data = await request.json();
        const apiKey = await request.headers.get("x-groq-api-key");
        if (!apiKey) {
            return new Response("Missing Api Key", { status: 401 });
        }

        const groq = createGroq({
            apiKey: apiKey,
        });

        const result = streamText({
            model: groq("openai/gpt-oss-120b"),
            messages: convertToModelMessages(data.messages),
        });

        return result.toUIMessageStreamResponse();
    } catch (error) {
        console.log(error);
        return new Response("Failed", { status: 500 });
    }
}
