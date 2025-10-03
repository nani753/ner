import { AdminLayout } from "@/components/layout/admin-layout";
import { ArticleForm } from "@/components/articles/article-form";
import { requireAdmin } from "@/lib/auth-utils";
import { notFound } from "next/navigation";

export const metadata = {
  title: "Edit Article | Admin Dashboard",
  description: "Edit an existing article",
};

async function getArticle(id: string) {
  await requireAdmin();
  const res = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/news/${id}`);
  if (!res.ok) return null;
  return res.json();
}

export default async function EditArticlePage({
  params,
}: {
  params: { id: string };
}) {
  const article = await getArticle(params.id);
  if (!article) notFound();

  return (
    <AdminLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-semibold">Edit Article</h1>
        <p className="text-sm text-muted-foreground">
          Edit an existing article or blog post
        </p>
      </div>

      <ArticleForm article={article} />
    </AdminLayout>
  );
}