import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import { Article } from "@/lib/models";

export async function GET() {
  try {
    await connectDB();

    const articles = await Article.find({ status: "published" })
      .sort({ publishedAt: -1 })
      .limit(10);

    return NextResponse.json(articles);
  } catch (error) {
    console.error("Error fetching articles:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}