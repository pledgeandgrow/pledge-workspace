
import Link from "next/link";
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <div className="relative overflow-hidden bg-background py-20 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl">
            Pledge Workspace
          </h1>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            Collaborate, create, and manage your projects in one unified workspace. 
            Streamline your workflow and boost productivity with our powerful tools.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Button asChild size="lg">
              <Link href="/dashboard">
                Get Started
              </Link>
            </Button>
          </div>
        </div>

      </div>
    </div>
  );
}
