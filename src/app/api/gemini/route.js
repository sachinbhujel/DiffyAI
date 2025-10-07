import { streamText, convertToModelMessages } from "ai";
import { createGoogleGenerativeAI } from "@ai-sdk/google";

export async function POST(request) {
    try {
        const data = await request.json();
        console.log(request);
        const apiKey = await request.headers.get("x-gemini-api-key");
        console.log("API KEY GEMINI", apiKey);

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
        console.log(error);
        return new Response("Failed", { status: 500 });
    }
}
