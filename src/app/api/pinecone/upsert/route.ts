// upsert data to pinecone
import { Pinecone } from "@pinecone-database/pinecone";
import { NextResponse } from "next/server";
export async function POST(request: Request) {
  try {
    const { apiKey, records } = await request.json();

    if (!apiKey || !records || !Array.isArray(records)) {
      return NextResponse.json(
        { error: "Invalid input data" },
        { status: 400 }
      );
    }

    const pc = new Pinecone({
      apiKey: apiKey,
    });

    const namespace = pc
      .index("unisnu", "https://unisnu-apbb6nw.svc.aped-4627-b74a.pinecone.io")
      .namespace("all");

    await namespace.upsertRecords(records);

    return NextResponse.json({ message: "Data upserted successfully" });
  } catch (error) {
    console.error("Error upserting data to Pinecone:", error);
    return NextResponse.json(
      { error: "Failed to upsert data to Pinecone" },
      { status: 500 }
    );
  }
}
