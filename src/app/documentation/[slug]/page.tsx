import { ClientSideDocArticle } from "@/components/documentation/ClientSideDocArticle";

// Define the page parameters type
type PageParams = {
  slug: string;
};

// Define the props type for the page component
type Props = {
  params: PageParams;
};

// Server Component - no client-side state needed
export default function ArticlePage({ params }: Props) {
  // Get the slug from the params
  const { slug } = params;
  
  // Use the slug to render the appropriate documentation article
  return (
    <div className="container mx-auto py-8">
      <ClientSideDocArticle slug={slug} />
    </div>
  );
}
