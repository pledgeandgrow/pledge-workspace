"use client";

import { Document } from "@/types/document";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FileText, Clock, CreditCard, FileSignature, FileCheck } from "lucide-react";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import { fr } from "date-fns/locale";

interface DocumentCardProps {
  document: Document;
}

export function DocumentCard({ document }: DocumentCardProps) {
  // Function to get icon based on document type
  const getDocumentTypeIcon = () => {
    switch (document.type) {
      case "devis":
        return <FileText className="h-5 w-5 text-blue-500" />;
      case "facture":
        return <CreditCard className="h-5 w-5 text-green-500" />;
      case "convention-de-stage":
        return <FileSignature className="h-5 w-5 text-purple-500" />;
      case "contrat":
        return <FileCheck className="h-5 w-5 text-amber-500" />;
      default:
        return <FileText className="h-5 w-5 text-gray-500" />;
    }
  };

  // Function to get status badge color
  const getStatusBadge = () => {
    switch (document.status) {
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

  // Function to get document type in French
  const getDocumentTypeLabel = () => {
    switch (document.type) {
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

  // Format the date to show how long ago it was updated
  const formattedDate = formatDistanceToNow(new Date(document.updatedAt), {
    addSuffix: true,
    locale: fr
  });

  return (
    <Link href={`/documents/${document.id}`}>
      <Card className="h-full hover:shadow-md transition-shadow duration-200 cursor-pointer border-gray-200">
        <CardHeader className="pb-2 flex flex-row justify-between items-start">
          <div className="flex items-center space-x-2">
            {getDocumentTypeIcon()}
            <span className="text-sm font-medium text-gray-500">{getDocumentTypeLabel()}</span>
          </div>
          {getStatusBadge()}
        </CardHeader>
        <CardContent className="pb-2">
          <h3 className="font-semibold text-lg mb-1 line-clamp-2">{document.title}</h3>
          
          {document.type === "devis" && document.content.clientInfo && (
            <p className="text-sm text-gray-500 line-clamp-1">
              Client: {(() => {
                const clientInfo = document.content.clientInfo as Record<string, unknown>;
                return typeof clientInfo === 'object' && clientInfo && 'name' in clientInfo ? String(clientInfo.name) : "Non spécifié";
              })()}
            </p>
          )}
          
          {document.type === "facture" && document.content.clientInfo && (
            <p className="text-sm text-gray-500 line-clamp-1">
              Client: {(() => {
                const clientInfo = document.content.clientInfo as Record<string, unknown>;
                return typeof clientInfo === 'object' && clientInfo && 'name' in clientInfo ? String(clientInfo.name) : "Non spécifié";
              })()}
            </p>
          )}
          
          {document.type === "convention-de-stage" && document.content.stagiaireInfo && (
            <p className="text-sm text-gray-500 line-clamp-1">
              Stagiaire: {(() => {
                const stagiaireInfo = document.content.stagiaireInfo as Record<string, unknown>;
                return typeof stagiaireInfo === 'object' && stagiaireInfo && 'name' in stagiaireInfo ? String(stagiaireInfo.name) : "Non spécifié";
              })()}
            </p>
          )}
          
          {document.type === "contrat" && document.content.clientInfo && (
            <p className="text-sm text-gray-500 line-clamp-1">
              Client: {(() => {
                const clientInfo = document.content.clientInfo as Record<string, unknown>;
                return typeof clientInfo === 'object' && clientInfo && 'name' in clientInfo ? String(clientInfo.name) : "Non spécifié";
              })()}
            </p>
          )}
        </CardContent>
        <CardFooter className="pt-0">
          <div className="flex items-center text-xs text-gray-400 w-full">
            <Clock className="h-3 w-3 mr-1" />
            <span>Mis à jour {formattedDate}</span>
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
}

export default DocumentCard;
