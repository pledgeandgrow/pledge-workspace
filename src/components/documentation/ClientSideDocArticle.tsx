"use client";

import { useEffect, useState } from "react";
import { DocArticleView } from "@/components/documentation/DocArticle";
import { Skeleton } from "@/components/ui/skeleton";

export function ClientSideDocArticle({ slug }: { slug: string }) {
  const [isClient, setIsClient] = useState(false);
  
  // This ensures hydration issues are avoided
  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-12 w-3/4" />
        <Skeleton className="h-4 w-1/3" />
        <Skeleton className="h-4 w-1/4" />
        <div className="space-y-2 mt-8">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-4 w-full" />
        </div>
      </div>
    );
  }

  return <DocArticleView slug={slug} />;
}
