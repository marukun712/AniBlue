import { Agent } from "@atproto/api";
import { useLoaderData } from "@remix-run/react";
import { LoaderFunction, redirect } from "@vercel/remix";
import { getSessionAgent } from "~/lib/auth/session";
import StatusList from "~/components/home/statusList";
import { StatusAgent } from "~/lib/agent/statusAgent";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { createIdResolver, getServiceEndpoint } from "~/lib/resolver";
import { DidDocument } from "@atproto/identity";
import { Share2 } from "lucide-react";

export const loader: LoaderFunction = async ({ request, params }) => {
  const { handle } = params;

  const agent: Agent | null = await getSessionAgent(request);
  if (agent == null) return redirect("/");

  let profile = null;
  let status = null;

  if (handle) {
    //ハンドルからDidDocumentを取得
    const did = await agent.resolveHandle({ handle });
    const resolver = createIdResolver();
    const didDoc = await resolver.did.resolve(did.data.did);

    //PDSのURLを取得
    const serviceUrl = getServiceEndpoint(didDoc as DidDocument);

    const statusAgent = StatusAgent.credential(serviceUrl!);

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
      console.log(e);

      console.log("No status record found");
    }
  }

  return { profile, status };
};

export default function ProfilePage() {
  const { profile, status } = useLoaderData<typeof loader>();

  if (profile.data) {
    return status ? (
      <>
        <section className="space-y-4">
          <Avatar className="m-auto w-32 h-32">
            <AvatarImage src={profile.data.avatar} />
            <AvatarFallback> {profile.data.displayName}</AvatarFallback>
          </Avatar>

          <h2 className="text-2xl text-center font-bold">
            {profile.data.displayName}
          </h2>

          <div className="text-center space-x-4">
            <a
              href={`https://bsky.app/profile/${profile.data.handle}`}
              className="inline-block"
            >
              <img src="/bsky.png" alt="bsky" className="w-8"></img>
            </a>

            <a
              href={`https://bsky.app/intent/compose?text=${encodeURIComponent(
                "AniBlueで視聴ステータスを記録しました! #AniBlue url"
              )}`}
              className="inline-block"
            >
              <Share2 />
            </a>
          </div>

          <h2 className="text-center font-bold">{profile.data.description}</h2>
        </section>
        <StatusList animeStatus={status.value.status} />
      </>
    ) : (
      <></>
    );
  }

  return (
    <section className="space-y-4">
      <h2 className="text-2xl text-center font-bold">
        ユーザーが見つかりませんでした。
      </h2>
    </section>
  );
}
