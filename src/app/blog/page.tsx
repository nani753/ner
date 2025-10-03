import { Metadata } from "next";
import { Filter } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Blog - NerlumaHub",
  description: "Articles and insights from NerlumaHub",
};

export default function BlogPage() {
  return (
    <div className="container py-10">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-4xl font-bold">Blog</h1>
        <Button variant="outline" size="sm">
          <Filter className="h-4 w-4 mr-2" />
          Filter
        </Button>
      </div>
      
      <div className="grid grid-cols-1 gap-8">
        {Array.from({ length: 4 }).map((_, i) => (
          <article
            key={i}
            className="group relative rounded-lg border bg-card p-6 hover:shadow-lg transition-all"
          >
            <div className="flex flex-col md:flex-row gap-6">
              <div className="w-full md:w-1/3">
                <div className="aspect-[16/9] rounded-lg bg-muted" />
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-semibold mb-2 group-hover:text-primary transition-colors">
                  Coming Soon
                </h2>
                <p className="text-muted-foreground mb-4">
                  Blog content will be available soon.
                </p>
                <div className="flex items-center space-x-4 text-sm">
                  <span className="text-muted-foreground">5 min read</span>
                  <span className="text-muted-foreground">•</span>
                  <span className="text-muted-foreground">Technology</span>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}