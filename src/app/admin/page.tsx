import { Metadata } from "next";
import { AdminLayout } from "@/components/layout/admin-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { requireAdmin } from "@/lib/auth-utils";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Admin Dashboard | NerlumaHub",
  description: "Admin dashboard for NerlumaHub",
};

async function getAdminStats() {
  await requireAdmin();
  
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
  const res = await fetch(`${baseUrl}/api/admin/stats`, {
    cache: "no-cache",
    credentials: "include", // Include cookies for authentication
  });
  
  if (!res.ok) {
    const error = await res.text().catch(() => null);
    throw new Error(`Failed to fetch admin stats: ${error || res.statusText}`);
  }

  return res.json();
}

export default async function AdminDashboard() {
  const { stats, recentContent } = await getAdminStats();

  return (
    <AdminLayout>
      <div className="space-y-8">
        {/* Stats Overview */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Articles</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.articles.total}</div>
              <p className="text-xs text-muted-foreground mt-1">
                {stats.articles.published} published · {stats.articles.draft} drafts
              </p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Events</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.events.total}</div>
              <p className="text-xs text-muted-foreground mt-1">
                {stats.events.upcoming} upcoming events
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">RSS Items</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.rssItems}</div>
              <p className="text-xs text-muted-foreground mt-1">
                From all sources
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Users</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.users}</div>
              <p className="text-xs text-muted-foreground mt-1">
                Total registered users
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Recent Content */}
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Recent Articles</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentContent.articles.map((article: any) => (
                  <div
                    key={article._id}
                    className="flex items-center justify-between"
                  >
                    <div>
                      <p className="text-sm font-medium">{article.title}</p>
                      <p className="text-sm text-muted-foreground">
                        {new Date(
                          article.publishedAt || article.createdAt
                        ).toLocaleDateString()}
                      </p>
                    </div>
                    <span
                      className={cn(
                        "rounded-full px-2 py-1 text-xs",
                        article.status === "published"
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                      )}
                    >
                      {article.status}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Upcoming Events</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentContent.events.map((event: any) => (
                  <div
                    key={event._id}
                    className="flex items-center justify-between"
                  >
                    <div>
                      <p className="text-sm font-medium">{event.title}</p>
                      <p className="text-sm text-muted-foreground">
                        {new Date(event.dateTime.start).toLocaleDateString()}
                      </p>
                    </div>
                    <span
                      className={cn(
                        "rounded-full px-2 py-1 text-xs",
                        event.status === "upcoming"
                          ? "bg-blue-100 text-blue-700"
                          : "bg-gray-100 text-gray-700"
                      )}
                    >
                      {event.status}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
}