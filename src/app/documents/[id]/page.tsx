"use client";

import { useEffect, useState } from "react";
import { Document } from "@/types/document";
import { documentService } from "@/services/documentService";

// Import DocumentContentType from document.ts if needed
// We're now using the properly typed Document interface from types/document.ts
import { Button } from "@/components/ui/button";
import { 
  ArrowLeft, 
  FileText, 
  Download, 
  Pencil, 
  Trash2, 
  Send,
  Share2,
  // Clock, // Unused import removed
  User,
  Tag
} from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
// import { formatDistanceToNow, format } from "date-fns";
// import { fr } from "date-fns/locale";
import { Skeleton } from "@/components/ui/skeleton";

export default function DocumentDetailPage({ params }: { params: { id: string } }) {
  // Router is available for navigation if needed
  const [document, setDocument] = useState<Document | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDocument = async () => {
      try {
        setIsLoading(true);
        const data = await documentService.getDocumentById(params.id);
        if (data) {
          setDocument(data);
        } else {
          setError("Document non trouvé");
        }
      } catch (error) {
        console.error("Error fetching document:", error);
        setError("Une erreur est survenue lors du chargement du document");
      } finally {
        setIsLoading(false);
      }
    };

    fetchDocument();
  }, [params.id]);

  // Function to get document type in French
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const getDocumentTypeLabel = (type: string) => {
    switch (type) {
      case "devis":
        return "Devis";
      case "facture":
        return "Facture";
      case "convention-de-stage":
        return "Convention de stage";
      case "contrat":
        return "Contrat";
      default:
        return "Document";
    }
  };

  // Function to get status badge
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "draft":
        return <Badge variant="outline" className="text-gray-500 border-gray-300">Brouillon</Badge>;
      case "final":
        return <Badge variant="outline" className="text-blue-500 border-blue-300">Final</Badge>;
      case "sent":
        return <Badge variant="outline" className="text-amber-500 border-amber-300">Envoyé</Badge>;
      case "paid":
        return <Badge variant="outline" className="text-green-500 border-green-300">Payé</Badge>;
      case "signed":
        return <Badge variant="outline" className="text-purple-500 border-purple-300">Signé</Badge>;
      case "expired":
        return <Badge variant="outline" className="text-red-500 border-red-300">Expiré</Badge>;
      default:
        return <Badge variant="outline">Inconnu</Badge>;
    }
  };

  // Function to get client or person name based on document type
  const getPersonName = (doc: Document) => {
    if (doc.type === "devis" || doc.type === "facture" || doc.type === "contrat") {
      return doc.content.clientInfo?.name || "Client non spécifié";
    } else if (doc.type === "convention-de-stage") {
      return doc.content.stagiaireInfo?.name || "Stagiaire non spécifié";
    }
    return "Non spécifié";
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="container mx-auto py-8 px-4 md:px-6">
        <div className="flex items-center mb-6">
          <Button variant="ghost" className="mr-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Retour
          </Button>
          <Skeleton className="h-8 w-64" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-6">
            <Skeleton className="h-64 w-full" />
            <Skeleton className="h-32 w-full" />
          </div>
          <div className="space-y-6">
            <Skeleton className="h-40 w-full" />
            <Skeleton className="h-40 w-full" />
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error || !document) {
    return (
      <div className="container mx-auto py-8 px-4 md:px-6">
        <div className="flex items-center mb-6">
          <Link href="/documents">
            <Button variant="ghost" className="mr-4">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Retour aux documents
            </Button>
          </Link>
        </div>
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
          <h2 className="text-xl font-semibold text-red-700 mb-2">
            {error || "Document non trouvé"}
          </h2>
          <p className="text-red-600 mb-4">
            Le document que vous recherchez n&apos;existe pas ou a été supprimé.
          </p>
          <Link href="/documents">
            <Button>Retour à la liste des documents</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4 md:px-6">
      {/* Header with back button and actions */}
      <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Link href="/documents" className="text-gray-500 hover:text-gray-700">
              <ArrowLeft className="h-4 w-4" />
            </Link>
            <h1 className="text-2xl font-bold">{document.title}</h1>
            {getStatusBadge(document.status)}
          </div>
          <div className="flex items-center gap-3 text-sm text-gray-500">
            <div className="flex items-center gap-1">
              <FileText className="h-4 w-4" />
              {getDocumentTypeLabel(document.type)}
            </div>
            <div className="flex items-center gap-1">
              <User className="h-4 w-4" />
              {getPersonName(document)}
            </div>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="text-white">
            <Download className="h-4 w-4 mr-2" />
            Télécharger
          </Button>
          <Button variant="outline" className="text-white">
            <Send className="h-4 w-4 mr-2" />
            Envoyer
          </Button>
          <Button variant="outline" className="text-white">
            <Pencil className="h-4 w-4 mr-2" />
            Modifier
          </Button>
        </div>
      </div>

      {/* Main content */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Document preview */}
        <div className="md:col-span-2 space-y-6">
          <div className="bg-background rounded-lg shadow-sm border p-6">
            <div className="bg-gray-800 rounded-lg p-6 min-h-[400px]">
              {/* This is where we would render the actual document preview */}
              <div className="text-center text-gray-400 py-12">
                <FileText className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                <h3 className="text-lg font-medium mb-2">Aperçu du document</h3>
                <p className="text-sm">
                  L&apos;aperçu du document sera affiché ici. Pour l&apos;instant, utilisez les actions ci-dessus pour télécharger ou modifier le document.
                </p>
              </div>
            </div>
          </div>

          {/* Document content details */}
          <div className="bg-background rounded-lg shadow-sm border p-6">
            <h2 className="text-lg font-semibold mb-4">Détails du contenu</h2>
            
            {document.type === "devis" && (
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-400">Client</h3>
                  <p className="text-base text-white">{document.content.clientInfo?.name || "Non spécifié"}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-400">Adresse</h3>
                  <p className="text-base text-white">{document.content.clientInfo?.address || "Non spécifiée"}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-400">Articles</h3>
                  <ul className="space-y-2 mt-2">
                    {document.content.items?.map((item: { description: string; quantity: number; unitPrice: number }, index: number) => (
                      <li key={index} className="flex justify-between border-b border-gray-700 pb-2">
                        <span className="text-white">{item.description}</span>
                        <span className="font-medium text-white">{item.quantity} x {item.unitPrice} €</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {document.type === "facture" && (
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-400">Client</h3>
                  <p className="text-base text-white">{document.content.clientInfo?.name || "Non spécifié"}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-400">Adresse</h3>
                  <p className="text-base text-white">{document.content.clientInfo?.address || "Non spécifiée"}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-400">Articles</h3>
                  <ul className="space-y-2 mt-2">
                    {document.content.items?.map((item: { description: string; quantity: number; unitPrice: number }, index: number) => (
                      <li key={index} className="flex justify-between border-b border-gray-700 pb-2">
                        <span className="text-white">{item.description}</span>
                        <span className="font-medium text-white">{item.quantity} x {item.unitPrice} €</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {document.type === "convention-de-stage" && (
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-400">Stagiaire</h3>
                  <p className="text-base text-white">{document.content.stagiaireInfo?.name || "Non spécifié"}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-400">École</h3>
                  <p className="text-base text-white">{document.content.stagiaireInfo?.school || "Non spécifiée"}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-400">Entreprise</h3>
                  <p className="text-base text-white">{document.content.entrepriseInfo?.name || "Non spécifiée"}</p>
                </div>
              </div>
            )}

            {document.type === "contrat" && (
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-400">Client</h3>
                  <p className="text-base text-white">{document.content.clientInfo?.name || "Non spécifié"}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-400">Adresse</h3>
                  <p className="text-base text-white">{document.content.clientInfo?.address || "Non spécifiée"}</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Sidebar with metadata */}
        <div className="space-y-6">
          {/* Document info */}
          <div className="bg-background rounded-lg shadow-sm border p-6">
            <h2 className="text-lg font-semibold mb-4">Informations</h2>
            <div className="space-y-4">
              <div className="flex items-start">
                <User className="h-5 w-5 text-gray-400 mr-3 mt-0.5" />
                <div>
                  <h3 className="text-sm font-medium text-white">Personne concernée</h3>
                  <p className="text-sm text-gray-500">Téléchargez ce document pour l&apos;envoyer à votre client.</p>
                </div>
              </div>
              
              {document.tags && document.tags.length > 0 && (
                <div className="flex items-start">
                  <Tag className="h-5 w-5 text-gray-400 mr-3 mt-0.5" />
                  <div>
                    <h3 className="text-sm font-medium text-white">Tags</h3>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {document.tags.map((tag, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
          
          {/* Actions */}
          <div className="bg-background rounded-lg shadow-sm border p-6">
            <h2 className="text-lg font-semibold mb-4">Actions</h2>
            <div className="space-y-2">
              <Button variant="outline" className="w-full justify-start text-white">
                <Share2 className="h-4 w-4 mr-2" />
                Partager
              </Button>
              <Button variant="outline" className="w-full justify-start text-white">
                <Pencil className="h-4 w-4 mr-2" />
                Modifier
              </Button>
              <Button variant="outline" className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-50">
                <Trash2 className="h-4 w-4 mr-2" />
                Supprimer
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
