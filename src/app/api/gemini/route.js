import { streamText, convertToModelMessages } from "ai";
import { createGoogleGenerativeAI } from "@ai-sdk/google";

export async function POST(request) {
    try {
        const data = await request.json();
        const apiKey = await request.headers.get("x-gemini-api-key");

        if (!apiKey) {
            return new Response("Missing Api Key", { status: 401 });
        }

        const google = createGoogleGenerativeAI({
            apiKey: apiKey,
        });

        const result = streamText({
            model: google("gemini-2.0-flash"),
            messages: convertToModelMessages(data.messages),
        });

        return result.toUIMessageStreamResponse();
    } catch (error) {
        return new Response("Failed", { status: 500 });
    }
}
