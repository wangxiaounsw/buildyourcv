import { NextRequest, NextResponse } from "next/server";
import { JsonResume } from "@/types/resume";
import { PARSE_CV_SYSTEM_PROMPT, PARSE_CV_USER_PROMPT } from "@/prompts/parseCV";

const DEEPSEEK_API_KEY = process.env.DEEPSEEK_API_KEY;
const DEEPSEEK_API_URL = "https://api.deepseek.com/v1/chat/completions";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { content } = body as { content: string };

    if (!content) {
      return NextResponse.json(
        { error: "Content is required" },
        { status: 400 }
      );
    }

    // Check for API key
    if (!DEEPSEEK_API_KEY) {
      console.error("DEEPSEEK_API_KEY not configured");
      return NextResponse.json(
        { error: "API key not configured. Please set DEEPSEEK_API_KEY environment variable." },
        { status: 500 }
      );
    }

    // Call DeepSeek API
    const response = await fetch(DEEPSEEK_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${DEEPSEEK_API_KEY}`,
      },
      body: JSON.stringify({
        model: "deepseek-chat",
        messages: [
          {
            role: "system",
            content: PARSE_CV_SYSTEM_PROMPT,
          },
          {
            role: "user",
            content: PARSE_CV_USER_PROMPT(content),
          },
        ],
        temperature: 0.1,
        max_tokens: 8192, // Increased for longer CVs
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error("DeepSeek API error:", response.status, errorData);
      return NextResponse.json(
        { error: `DeepSeek API error: ${response.status}` },
        { status: response.status }
      );
    }

    const data = await response.json();
    const aiResponse = data.choices?.[0]?.message?.content;

    if (!aiResponse) {
      return NextResponse.json(
        { error: "No response from AI" },
        { status: 500 }
      );
    }

    // Parse the JSON response
    let jsonResume: JsonResume;
    try {
      // Try to extract JSON from the response (in case AI added extra text)
      const jsonMatch = aiResponse.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        throw new Error("No JSON found in response");
      }
      jsonResume = JSON.parse(jsonMatch[0]);
    } catch (parseError) {
      console.error("Failed to parse AI response:", aiResponse);
      return NextResponse.json(
        { error: "Failed to parse AI response as JSON" },
        { status: 500 }
      );
    }

    // Ensure basics.name exists
    if (!jsonResume.basics?.name) {
      jsonResume.basics = {
        ...jsonResume.basics,
        name: "Unknown",
      };
    }

    return NextResponse.json({ data: jsonResume });
  } catch (error) {
    console.error("Error parsing CV:", error);
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      { error: `Failed to parse CV: ${message}` },
      { status: 500 }
    );
  }
}
