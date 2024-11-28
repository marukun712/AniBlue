import { Agent } from "@atproto/api";
import { LoaderFunction, redirect } from "@vercel/remix";
import { Outlet, useLoaderData } from "@remix-run/react";
import { Header } from "~/components/ui/header";
import { getSessionAgent } from "~/lib/auth/session";
import { useSetFavorite } from "~/state/favorite";
import { useSetAnimeState } from "~/state/status";

export const loader: LoaderFunction = async ({ request }) => {
  const agent: Agent | null = await getSessionAgent(request);
  if (agent == null) return redirect("/");

  let statusData = null;
  let favoriteData = null;

  try {
    const status = await agent.com.atproto.repo.getRecord({
      collection: "app.vercel.aniblue.status",
      repo: agent.assertDid,
      rkey: "self",
    });
    statusData = status;
  } catch (e) {
    console.log("No status record found");
  }

  try {
    const favorite = await agent.com.atproto.repo.getRecord({
      collection: "app.vercel.aniblue.favorite",
      repo: agent.assertDid,
      rkey: "self",
    });

    favoriteData = favorite;
  } catch (e) {
    console.log("No favorite record found");
  }

  return { status: statusData, favorite: favoriteData };
};

export default function Home() {
  const { status, favorite } = useLoaderData<typeof loader>();
  const setAnimeState = useSetAnimeState();
  const setFavoriteState = useSetFavorite();

  if (status?.data?.value?.status) {
    setAnimeState(status.data.value.status);
  } else {
    setAnimeState([]);
  }

  if (favorite?.data?.value?.favorites) {
    setFavoriteState(favorite.data.value.favorites);
  } else {
    setFavoriteState([]);
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
