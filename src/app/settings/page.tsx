"use client";

import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
import { 
  User, 
  Building, 
  FileText, 
  Key, 
  Webhook, 
  Bell, 
  Palette,
  Globe,
  ArrowRight
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

interface SettingCard {
  title: string;
  description: string;
  icon: React.ReactNode;
  href: string;
}

const settingCards: SettingCard[] = [
  {
    title: "Profil",
    description: "Gérez vos informations personnelles et votre compte",
    icon: <User className="h-6 w-6 text-blue-500" />,
    href: "/settings/profile"
  },
  {
    title: "Entreprise",
    description: "Configurez les informations de votre entreprise pour les documents",
    icon: <Building className="h-6 w-6 text-green-500" />,
    href: "/settings/company"
  },
  {
    title: "Documents",
    description: "Paramètres par défaut pour vos documents et factures",
    icon: <FileText className="h-6 w-6 text-amber-500" />,
    href: "/settings/documents"
  },
  {
    title: "API Keys",
    description: "Gérez vos clés API pour l'intégration avec d'autres services",
    icon: <Key className="h-6 w-6 text-purple-500" />,
    href: "/settings/api-keys"
  },
  {
    title: "Webhooks",
    description: "Configurez des webhooks pour réagir aux événements",
    icon: <Webhook className="h-6 w-6 text-red-500" />,
    href: "/settings/webhooks"
  },
  {
    title: "Notifications",
    description: "Gérez vos préférences de notification par email et navigateur",
    icon: <Bell className="h-6 w-6 text-indigo-500" />,
    href: "/settings/notifications"
  },
  {
    title: "Apparence",
    description: "Personnalisez l'apparence de l'application",
    icon: <Palette className="h-6 w-6 text-pink-500" />,
    href: "/settings/appearance"
  },
  {
    title: "Langue",
    description: "Changez la langue de l'application",
    icon: <Globe className="h-6 w-6 text-teal-500" />,
    href: "/settings/language"
  }
];

export default function SettingsPage() {
  // Router is available for navigation if needed
  const [isClient, setIsClient] = useState(false);
  
  // This ensures hydration issues are avoided
  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Paramètres</h1>
      <p className="text-gray-500 mb-8">
        Configurez votre compte et personnalisez votre expérience
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {settingCards.map((card) => (
          <Link key={card.title} href={card.href}>
            <Card className="h-full hover:shadow-md transition-all duration-200 cursor-pointer border-gray-200 bg-background">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <div className="p-2 rounded-full bg-background/10">
                  {card.icon}
                </div>
                <ArrowRight className="h-5 w-5 text-gray-400" />
              </CardHeader>
              <CardContent>
                <CardTitle className="text-xl mb-2 text-white">{card.title}</CardTitle>
                <CardDescription className="text-gray-400">{card.description}</CardDescription>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
