import { Hero } from "./Hero";
import { Features } from "./Features";
import { ToolsOverview } from "./ToolsOverview";
import { GettingStarted } from "./GettingStarted";

export function HomeContent() {
  return (
    <div className="flex flex-col min-h-screen">
      <Hero />
      <ToolsOverview />
      <Features />
      <GettingStarted />
    </div>
  );
}
