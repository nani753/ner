import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AdminLayout } from "@/components/layout/admin-layout";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { requireAdmin } from "@/lib/auth-utils";
import { cn } from "@/lib/utils";

export const metadata = {
  title: "Manage Articles | Admin Dashboard",
  description: "Manage news articles and blog posts",
};

async function getArticles() {
  await requireAdmin();
  const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/news`, {
    cache: "no-cache",
  });
  if (!res.ok) throw new Error("Failed to fetch articles");
  return res.json();
}

export default async function ArticlesPage() {
  const articles = await getArticles();

  return (
    <AdminLayout>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-semibold">Articles</h1>
          <p className="text-sm text-muted-foreground">
            Manage your news articles and blog posts
          </p>
        </div>
        <Link href="/admin/articles/new">
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            New Article
          </Button>
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Articles</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Published</TableHead>
                <TableHead>Created</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {articles.map((article: any) => (
                <TableRow key={article._id}>
                  <TableCell>{article.title}</TableCell>
                  <TableCell>
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
                  </TableCell>
                  <TableCell>
                    {article.publishedAt
                      ? new Date(article.publishedAt).toLocaleDateString()
                      : "-"}
                  </TableCell>
                  <TableCell>
                    {new Date(article.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell className="text-right">
                    <Link href={`/admin/articles/${article._id}/edit`}>
                      <Button variant="ghost" size="sm">
                        Edit
                      </Button>
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </AdminLayout>
  );
}