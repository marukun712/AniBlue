import { ReactNode } from "react";
import { Header } from "./ui/header";

export default function Main({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main className="container mx-auto px-4 py-8 space-y-8">{children}</main>
    </div>
  );
}
