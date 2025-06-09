import { HomeContent } from "@/components/home/HomeContent";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pledge Workspace | Internal Tools & Collaboration",
  description: "An integrated workspace with tools to facilitate your work and boost productivity",
};


export default function Home() {
  return <HomeContent />;
}
