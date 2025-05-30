export interface DocCategory {
  id: string;
  title: string;
  slug: string;
  description: string;
  icon?: string;
  order: number;
}

export interface DocArticle {
  id: string;
  title: string;
  slug: string;
  content: string;
  categoryId: string;
  createdAt: string;
  updatedAt: string;
  author: string;
  tags?: string[];
  order: number;
}

export interface DocSearchResult {
  id: string;
  title: string;
  type: 'article' | 'category';
  slug: string;
  categoryId?: string;
  excerpt: string;
  relevance: number;
}

export interface DocumentationState {
  categories: DocCategory[];
  articles: DocArticle[];
  currentArticle: DocArticle | null;
  currentCategory: DocCategory | null;
  searchResults: DocSearchResult[];
  isLoading: boolean;
  error: string | null;
}
