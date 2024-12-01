import StatusList from "~/components/home/statusList";
import { LoaderFunction, redirect } from "@remix-run/node";
import { getSessionAgent } from "~/lib/auth/session";
import { StatusAgent } from "~/lib/agent/statusAgent";
import { useLoaderData } from "@remix-run/react";
import Main from "~/components/main";

export const loader: LoaderFunction = async ({ request }) => {
  const agent = await getSessionAgent(request);
  if (agent == null) return redirect("/login");

  try {
    const statusAgent = new StatusAgent(agent);
    const status = await statusAgent.get(agent.assertDid);

    return { status };
  } catch {
    return { error: "データの取得に失敗しました。" };
  }
};

export default function Home() {
  const { status, error } = useLoaderData<typeof loader>();

  if (error) {
    return (
      <Main>
        <div className="text-center font-bold text-2xl">{error}</div>
      </Main>
    );
  }

  return (
    <Main>
      {status && status.value.status.length > 0 ? (
        <StatusList animeStatus={status.value.status} />
      ) : (
        <div className="text-center font-bold text-2xl">
          記録されている情報がありません。
          右上の検索バーから、アニメ名を検索してみましょう。
        </div>
      )}
    </Main>
  );
}
