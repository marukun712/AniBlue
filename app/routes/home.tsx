import { Agent } from "@atproto/api";
import { LoaderFunction, redirect } from "@remix-run/node";
import { Outlet, useLoaderData } from "@remix-run/react";
import { Header } from "~/components/ui/header";
import { getSessionAgent } from "~/lib/auth/session";
import { useSetAnimeState } from "~/state/status";

export const loader: LoaderFunction = async ({ request }) => {
  const agent: Agent | null = await getSessionAgent(request);
  if (agent == null) return redirect("/");

  try {
    const status = await agent.com.atproto.repo.getRecord({
      collection: "app.vercel.aniblue.status",
      repo: agent.assertDid,
      rkey: "self",
    });

    return { status };
  } catch (e) {
    return { status: null };
  }
};

export default function Home() {
  const { status } = useLoaderData<typeof loader>();

  //アニメの視聴状態をStateに保持
  const setAnimeState = useSetAnimeState();

  if (status) {
    setAnimeState(status.data.value.status);
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
