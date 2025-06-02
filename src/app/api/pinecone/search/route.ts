// use searchContext from src/app/api/pinecone/search/context.ts
import searchContext from "@src/utils/search";
import { NextResponse } from "next/server";
export async function POST(request: Request) {
  try {
    const { input } = await request.json();

    if (!input) {
      return NextResponse.json(
        { error: "Input and API key are required" },
        { status: 400 }
      );
    }

    const context = await searchContext(
      input,
      "pcsk_5xSV3S_EHzAgLbJKRqk1Vd9pCmiZXxPakwz2LNCDePQ9ur1CEydGJx1BpHoqmjvhEfW3zr"
    );

    return NextResponse.json({ context });
  } catch (error) {
    console.error("Error searching context in Pinecone:", error);
    return NextResponse.json(
      { error: "Failed to search context in Pinecone" },
      { status: 500 }
    );
  }
}
