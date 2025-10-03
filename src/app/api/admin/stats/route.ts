import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import { Article, Event, User, RSSItem } from "@/lib/models";
import { requireAdmin } from "@/lib/auth-utils";

export async function GET() {
  try {
    await requireAdmin();
    await connectDB();

    const [
      totalArticles,
      publishedArticles,
      totalEvents,
      upcomingEvents,
      totalRssItems,
      totalUsers,
      recentArticles,
      recentEvents,
    ] = await Promise.all([
      Article.countDocuments(),
      Article.countDocuments({ status: "published" }),
      Event.countDocuments(),
      Event.countDocuments({
        "dateTime.start": { $gt: new Date() },
        status: "upcoming",
      }),
      RSSItem.countDocuments(),
      User.countDocuments(),
      Article.find()
        .sort({ createdAt: -1 })
        .limit(5)
        .select("title status createdAt publishedAt"),
      Event.find({
        "dateTime.start": { $gt: new Date() },
      })
        .sort({ "dateTime.start": 1 })
        .limit(5)
        .select("title status dateTime"),
    ]);

    return NextResponse.json({
      stats: {
        articles: {
          total: totalArticles,
          published: publishedArticles,
          draft: totalArticles - publishedArticles,
        },
        events: {
          total: totalEvents,
          upcoming: upcomingEvents,
        },
        rssItems: totalRssItems,
        users: totalUsers,
      },
      recentContent: {
        articles: recentArticles,
        events: recentEvents,
      },
    });
  } catch (error) {
    console.error("Error fetching admin stats:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}