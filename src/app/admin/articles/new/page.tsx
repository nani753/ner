import { AdminLayout } from "@/components/layout/admin-layout";
import { ArticleForm } from "@/components/articles/article-form";

export const metadata = {
  title: "New Article | Admin Dashboard",
  description: "Create a new article",
};

export default function NewArticlePage() {
  return (
    <AdminLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-semibold">New Article</h1>
        <p className="text-sm text-muted-foreground">
          Create a new article or blog post
        </p>
      </div>

      <ArticleForm />
    </AdminLayout>
  );
}