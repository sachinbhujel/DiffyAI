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
            model: groq("llama-3.3-70b-versatile"),
            providerOptions: {
                groq: {
                    reasoningFormat: "hidden",
                }
            },
            messages: convertToModelMessages(data.messages),
        });
        console.log(result);

        return result.toUIMessageStreamResponse();
    } catch (error) {
        return new Response("Failed", { status: 500 });
    }
}
