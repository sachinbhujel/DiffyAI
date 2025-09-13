import { streamText, convertToModelMessages } from "ai";
import { groq } from "@ai-sdk/groq";

export async function POST(request) {
    try {
        const data = await request.json();

        const result = streamText({
            model: groq("deepseek-r1-distill-llama-70b"),
            messages: convertToModelMessages(data.messages),
        });

        return result.toUIMessageStreamResponse();
    } catch (error) {
        console.log(error);
        return new Response("Failed", { status: 500 });
    }
}
