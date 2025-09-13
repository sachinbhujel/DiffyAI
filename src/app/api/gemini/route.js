import { streamText, convertToModelMessages } from "ai";
import { google } from "@ai-sdk/google";

export async function POST(request) {
    try {
        const data = await request.json();

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
