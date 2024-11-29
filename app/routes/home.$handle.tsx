import { Agent } from "@atproto/api";
import { useLoaderData } from "@remix-run/react";
import { LoaderFunction, redirect } from "@vercel/remix";
import { getSessionAgent } from "~/lib/auth/session";
import StatusList from "~/components/home/statusList";
import { StatusAgent } from "~/lib/agent/statusAgent";

export const loader: LoaderFunction = async ({ request, params }) => {
  const { handle } = params;

  const agent: Agent | null = await getSessionAgent(request);
  if (agent == null) return redirect("/");
  const statusAgent = new StatusAgent(agent);

  let profile = null;
  let status = null;

  if (handle) {
    try {
      const profileRecord = await agent.getProfile({ actor: handle });

      profile = profileRecord;
    } catch (e) {
      console.log("No profile record found");
    }

    try {
      const statusData = await statusAgent.get(handle);
      status = statusData;
    } catch (e) {
      console.log("No status record found");
    }
  }

  return { profile, status };
};

export default function ProfilePage() {
  const { profile, status } = useLoaderData<typeof loader>();

  if (profile.data) {
    return status ? <StatusList animeStatus={status.value.status} /> : <></>;
  }

  return (
    <section className="space-y-4">
      <h2 className="text-2xl text-center font-bold">
        ユーザーが見つかりませんでした。
      </h2>
    </section>
  );
}
