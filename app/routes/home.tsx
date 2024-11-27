import { Agent } from "@atproto/api";
import { LoaderFunction, redirect } from "@remix-run/node";
import { Outlet } from "@remix-run/react";
import { Header } from "~/components/ui/header";
import { getSessionAgent } from "~/lib/auth/session";

export const loader: LoaderFunction = async ({ request }) => {
  const agent: Agent | null = await getSessionAgent(request);
  if (agent == null) return redirect("/");

  return null;
};

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />

      <main className="container mx-auto px-4 py-8 space-y-8">
        <Outlet />
      </main>
    </div>
  );
}
