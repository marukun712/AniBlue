import { LoaderFunction, MetaFunction, redirect } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import AnimeDetails from "~/components/details/details";
import Main from "~/components/main";
import { StatusAgent } from "~/lib/agent/statusAgent";
import { AnnictAPI } from "~/lib/annict/annict";
import { getSessionAgent } from "~/lib/auth/session";
import { generateMetadata } from "~/lib/meta";
import { useSetAnimeState } from "~/state/status";

export const loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url);
  const id = url.searchParams.get("id");

  if (!id) {
    return { error: "作品IDが指定されていません" };
  }

  const agent = await getSessionAgent(request);
  if (agent == null) return redirect("/login");

  const statusAgent = new StatusAgent(agent);
  const status = await statusAgent.get(agent.assertDid);

  const annict = new AnnictAPI(process.env.ANNICT_TOKEN!);

  const { work, error } = await annict.getDetails(id);

  return { work, status, error };
};

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  const title = data.work.data.title;

  if (title) {
    return generateMetadata(title);
  }

  return generateMetadata("アニメ情報");
};

export default function WorkDetail() {
  const { work, status, error } = useLoaderData<typeof loader>();

  const setAnimeState = useSetAnimeState();

  if (status) {
    setAnimeState(status.value.status);
  } else {
    setAnimeState([]);
  }

  if (error) {
    return (
      <Main>
        <h2 className="text-2xl text-center font-bold">{error}</h2>
      </Main>
    );
  }

  return (
    <Main>
      <AnimeDetails work={work} />
    </Main>
  );
}
