import { NextRequest, NextResponse } from "next/server";
import { JsonResume, defaultResume } from "@/types/resume";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { content, type } = body as { content: string; type: "pdf" | "docx" | "text" };

    if (!content) {
      return NextResponse.json(
        { error: "Content is required" },
        { status: 400 }
      );
    }

    // TODO: Implement DeepSeek API integration
    // For now, return mock data
    // In production, this will:
    // 1. Parse the uploaded file content
    // 2. Send to DeepSeek API for extraction
    // 3. Return structured JSON Resume data

    const mockResponse: JsonResume = {
      ...defaultResume,
      basics: {
        ...defaultResume.basics,
        name: "Parsed Resume",
        summary: `This is a mock response. In production, the ${type} content will be parsed by DeepSeek API and converted to JSON Resume format.`,
      },
    };

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    return NextResponse.json({ data: mockResponse });
  } catch (error) {
    console.error("Error parsing CV:", error);
    return NextResponse.json(
      { error: "Failed to parse CV" },
      { status: 500 }
    );
  }
}
