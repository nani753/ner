import { Metadata } from "next";

export const metadata: Metadata = {
  title: "News - NerlumaHub",
  description: "Latest news and updates from NerlumaHub",
};

async function getArticles() {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
    const res = await fetch(`${baseUrl}/api/news`, {
      next: { revalidate: 3600 }, // Revalidate every hour
      cache: 'force-cache',
      signal: AbortSignal.timeout(30000), // 30 second timeout
    });
    if (!res.ok) throw new Error('Failed to fetch articles');
    return res.json();
  } catch (error) {
    console.error('Error fetching articles:', error);
    return [];
  }
}

export default async function NewsPage() {
  const articles = await getArticles();

  return (
    <div className="container py-10">
      <h1 className="text-4xl font-bold mb-8">News</h1>
      {articles.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-muted-foreground">No articles found.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((article: any) => (
            <div
              key={article._id}
              className="rounded-lg border bg-card text-card-foreground shadow-sm hover:shadow-md transition-shadow"
            >
              {article.heroImage && (
                <div className="aspect-video relative rounded-t-lg overflow-hidden">
                  <img
                    src={article.heroImage}
                    alt={article.title}
                    className="object-cover w-full h-full"
                  />
                </div>
              )}
              <div className="p-6">
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                  <span>{new Date(article.publishedAt).toLocaleDateString()}</span>
                  <span>•</span>
                  <span>{article.category}</span>
                </div>
                <h3 className="text-lg font-semibold mb-2">{article.title}</h3>
                <p className="text-sm text-muted-foreground">{article.excerpt}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}