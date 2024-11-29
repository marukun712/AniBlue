import { Agent } from "@atproto/api";
import { LoaderFunction, redirect } from "@vercel/remix";
import { Outlet, useLoaderData } from "@remix-run/react";
import { Header } from "~/components/ui/header";
import { getSessionAgent } from "~/lib/auth/session";
import { useSetAnimeState } from "~/state/status";
import { StatusAgent } from "~/lib/agent/statusAgent";

export const loader: LoaderFunction = async ({ request }) => {
  const agent: Agent | null = await getSessionAgent(request);
  if (agent == null) return redirect("/");
  const statusAgent = new StatusAgent(agent);

  let status = null;

  try {
    const statusData = await statusAgent.get(agent.assertDid);

    status = statusData;
  } catch (e) {
    console.log("No status record found");
  }

  return { status };
};

export default function Home() {
  const { status } = useLoaderData<typeof loader>();
  const setAnimeState = useSetAnimeState();

  if (status.value.status) {
    setAnimeState(status.value.status);
  } else {
    setAnimeState([]);
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main className="container mx-auto px-4 py-8 space-y-8">
        <Outlet />
      </main>
    </div>
  );
}
