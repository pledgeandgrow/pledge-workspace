"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { 
  User, 
  Building, 
  FileText, 
  Key, 
  Webhook, 
  Bell, 
  Palette,
  Globe
} from "lucide-react";

interface NavItem {
  title: string;
  href: string;
  icon: React.ReactNode;
  description: string;
}

const navItems: NavItem[] = [
  {
    title: "Profil",
    href: "/settings/profile",
    icon: <User className="h-5 w-5" />,
    description: "Gérez vos informations personnelles"
  },
  {
    title: "Entreprise",
    href: "/settings/company",
    icon: <Building className="h-5 w-5" />,
    description: "Configurez les informations de votre entreprise"
  },
  {
    title: "Documents",
    href: "/settings/documents",
    icon: <FileText className="h-5 w-5" />,
    description: "Paramètres par défaut pour vos documents"
  },
  {
    title: "API Keys",
    href: "/settings/api-keys",
    icon: <Key className="h-5 w-5" />,
    description: "Gérez vos clés API pour l'intégration"
  },
  {
    title: "Webhooks",
    href: "/settings/webhooks",
    icon: <Webhook className="h-5 w-5" />,
    description: "Configurez des webhooks pour les événements"
  },
  {
    title: "Notifications",
    href: "/settings/notifications",
    icon: <Bell className="h-5 w-5" />,
    description: "Gérez vos préférences de notification"
  },
  {
    title: "Apparence",
    href: "/settings/appearance",
    icon: <Palette className="h-5 w-5" />,
    description: "Personnalisez l'apparence de l'application"
  },
  {
    title: "Langue",
    href: "/settings/language",
    icon: <Globe className="h-5 w-5" />,
    description: "Changez la langue de l'application"
  }
];

export function SettingsNav() {
  const pathname = usePathname();

  return (
    <div className="w-[240px] flex-shrink-0">
      <div className="space-y-1">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex flex-col space-y-1 px-3 py-2 rounded-md transition-colors",
              pathname === item.href
                ? "bg-primary/10 text-primary"
                : "hover:bg-muted text-white"
            )}
          >
            <div className="flex items-center">
              <div className={cn(
                "mr-2",
                pathname === item.href
                  ? "text-primary"
                  : "text-gray-400"
              )}>
                {item.icon}
              </div>
              <span className="font-medium">{item.title}</span>
            </div>
            <p className="text-xs text-gray-500 pl-7">{item.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default SettingsNav;
