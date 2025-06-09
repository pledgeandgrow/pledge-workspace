"use client";

import Link from "next/link";

export function DashboardFooter() {
  return (
    <footer className="mt-auto p-4 text-center text-sm text-muted-foreground border-t border-gray-200 dark:border-gray-700">
      <div className="flex justify-center space-x-4">
        <Link href="/cgu" className="hover:underline">Conditions générales d'utilisation</Link>
        <Link href="/mentions-legales" className="hover:underline">Mentions légales</Link>
        <Link href="/politique-de-cookies" className="hover:underline">Politique de cookies</Link>
      </div>
    </footer>
  );
}
