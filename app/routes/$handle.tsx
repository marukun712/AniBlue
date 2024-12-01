import { useLoaderData } from "@remix-run/react";
import { LoaderFunction, MetaFunction, redirect } from "@remix-run/node";
import { getSessionAgent } from "~/lib/auth/session";
import StatusList from "~/components/home/statusList";
import { StatusAgent } from "~/lib/agent/statusAgent";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { createIdResolver, getServiceEndpoint } from "~/lib/resolver";
import { DidDocument } from "@atproto/identity";
import { Share2 } from "lucide-react";
import Main from "~/components/main";

export const loader: LoaderFunction = async ({ request, params }) => {
  const { handle } = params;

  const agent = await getSessionAgent(request);
  if (agent == null) return redirect("/login");

  if (!handle) return { error: "ハンドルを指定してください。" };

  try {
    //ハンドルからDidDocumentを取得
    const did = await agent.resolveHandle({ handle });

    const resolver = createIdResolver();
    const didDoc = await resolver.did.resolve(did.data.did);

    //PDSのURLを取得
    const serviceUrl = getServiceEndpoint(didDoc as DidDocument);

    //PDSのURLからクライアントを作成
    const statusAgent = StatusAgent.credential(serviceUrl!);

    //各種情報の取得
    const profile = await agent.getProfile({ actor: handle });
    const status = await statusAgent.get(handle);

    return { profile, status, handle };
  } catch (e) {
    return { error: "ユーザーが見つかりませんでした。" };
  }
};

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  const user = data.profile.data.displayName;

  if (user) {
    return [
      { title: `${user}さんのプロフィール | AniBlue` },
      { property: "og:title", content: `${user}さんのプロフィール | AniBlue` },
    ];
  }

  return [
    { title: `ユーザー情報 | AniBlue` },
    { property: "og:title", content: `ユーザー情報 | AniBlue` },
  ];
};

export default function ProfilePage() {
  const { profile, status, handle, error } = useLoaderData<typeof loader>();

  if (error) {
    return (
      <Main>
        <div className="text-center font-bold text-2xl">{error}</div>
      </Main>
    );
  }

  return (
    <Main>
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
              `AniBlueで視聴ステータスを記録しました! #AniBlue https://aniblue.netlify.app/${handle}`
            )}`}
            className="inline-block"
          >
            <Share2 />
          </a>
        </div>

        <h2 className="text-center font-bold">{profile.data.description}</h2>
      </section>

      {status && status.value.status.length > 0 && (
        <StatusList animeStatus={status.value.status} />
      )}
    </Main>
  );
}
