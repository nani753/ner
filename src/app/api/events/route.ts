import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import { Event } from "@/lib/models";

export async function GET(request: Request) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status") || "upcoming";

    const events = await Event.find({
      status,
      "dateTime.start": { $gte: new Date() },
    })
      .sort({ "dateTime.start": 1 })
      .limit(10);

    return NextResponse.json(events);
  } catch (error) {
    console.error("Error fetching events:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}