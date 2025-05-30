"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { DocArticle, DocCategory } from "@/types/documentation";
import { documentationService } from "@/services/documentationService";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { ChevronLeft, ChevronRight, Home, Clock, User } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

interface DocArticleViewProps {
  slug: string;
}

export function DocArticleView({ slug }: DocArticleViewProps) {
  const router = useRouter();
  const [article, setArticle] = useState<DocArticle | null>(null);
  const [category, setCategory] = useState<DocCategory | null>(null);
  const [nextArticle, setNextArticle] = useState<DocArticle | null>(null);
  const [prevArticle, setPrevArticle] = useState<DocArticle | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        // Fetch the article
        const articleData = await documentationService.getArticleBySlug(slug);
        
        if (!articleData) {
          setError("Article non trouvé");
          return;
        }
        
        setArticle(articleData);
        
        // Fetch the category
        const categoryData = await documentationService.getCategoryBySlug(
          (await documentationService.getCategoryBySlug(
            (await documentationService.getCategories()).find(
              cat => cat.id === articleData.categoryId
            )?.slug || ""
          ))?.slug || ""
        );
        
        if (categoryData) {
          setCategory(categoryData);
          
          // Fetch all articles in the category to determine next/prev
          const categoryArticles = await documentationService.getArticlesByCategory(categoryData.id);
          const sortedArticles = categoryArticles.sort((a, b) => a.order - b.order);
          const currentIndex = sortedArticles.findIndex(art => art.id === articleData.id);
          
          if (currentIndex > 0) {
            setPrevArticle(sortedArticles[currentIndex - 1]);
          } else {
            setPrevArticle(null);
          }
          
          if (currentIndex < sortedArticles.length - 1) {
            setNextArticle(sortedArticles[currentIndex + 1]);
          } else {
            setNextArticle(null);
          }
        }
      } catch (err) {
        console.error("Error fetching article:", err);
        setError("Une erreur est survenue lors du chargement de l'article");
      } finally {
        setIsLoading(false);
      }
    };

    if (slug) {
      fetchArticle();
    }
  }, [slug]);

  if (isLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-12 w-3/4" />
        <Skeleton className="h-4 w-1/3" />
        <Skeleton className="h-4 w-1/4" />
        <div className="space-y-2 mt-8">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
          <Skeleton className="h-4 w-full" />
        </div>
      </div>
    );
  }

  if (error || !article) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-red-500 mb-4">{error || "Article non trouvé"}</h2>
        <p className="text-gray-500 mb-6">
          L&apos;article que vous recherchez n&apos;existe pas ou a été déplacé.
        </p>
        <Button onClick={() => router.push("/documentation")}>
          Retour à la documentation
        </Button>
      </div>
    );
  }

  const formattedDate = article.updatedAt 
    ? format(new Date(article.updatedAt), "d MMMM yyyy", { locale: fr })
    : "";

  return (
    <div className="max-w-3xl mx-auto">
      {/* Breadcrumb */}
      <div className="flex items-center text-sm text-gray-500 mb-6">
        <Link href="/documentation" className="hover:text-primary">
          <Home className="h-4 w-4 inline mr-1" />
          Documentation
        </Link>
        {category && (
          <>
            <ChevronRight className="h-4 w-4 mx-1" />
            <Link href={`/documentation/${category.slug}`} className="hover:text-primary">
              {category.title}
            </Link>
          </>
        )}
        <ChevronRight className="h-4 w-4 mx-1" />
        <span className="text-primary">{article.title}</span>
      </div>

      {/* Article metadata */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4 text-white">{article.title}</h1>
        <div className="flex items-center text-sm text-gray-500">
          <div className="flex items-center mr-4">
            <Clock className="h-4 w-4 mr-1" />
            <span>Mis à jour le {formattedDate}</span>
          </div>
          <div className="flex items-center">
            <User className="h-4 w-4 mr-1" />
            <span>{article.author}</span>
          </div>
        </div>
        {article.tags && article.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-3">
            {article.tags.map(tag => (
              <span 
                key={tag} 
                className="px-2 py-1 text-xs rounded-full bg-primary/10 text-primary"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Article content */}
      <div className="prose prose-invert max-w-none">
        <ReactMarkdown>{article.content}</ReactMarkdown>
      </div>

      {/* Navigation between articles */}
      <div className="mt-12 flex justify-between border-t border-border pt-6">
        {prevArticle ? (
          <Link href={`/documentation/${prevArticle.slug}`}>
            <Button variant="outline" className="flex items-center text-white">
              <ChevronLeft className="h-4 w-4 mr-2" />
              <div className="text-left">
                <div className="text-xs text-gray-500">Précédent</div>
                <div>{prevArticle.title}</div>
              </div>
            </Button>
          </Link>
        ) : (
          <div />
        )}
        
        {nextArticle ? (
          <Link href={`/documentation/${nextArticle.slug}`}>
            <Button variant="outline" className="flex items-center text-white">
              <div className="text-right">
                <div className="text-xs text-gray-500">Suivant</div>
                <div>{nextArticle.title}</div>
              </div>
              <ChevronRight className="h-4 w-4 ml-2" />
            </Button>
          </Link>
        ) : (
          <div />
        )}
      </div>
    </div>
  );
}

export default DocArticleView;
