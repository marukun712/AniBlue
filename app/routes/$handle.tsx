import { useLoaderData } from "@remix-run/react";
import { LoaderFunction, MetaFunction } from "@remix-run/node";
import StatusList from "~/components/home/statusList";
import { StatusAgent } from "~/lib/agent/statusAgent";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { createIdResolver, getServiceEndpoint } from "~/lib/resolver";
import { DidDocument } from "@atproto/identity";
import { Share2 } from "lucide-react";
import Main from "~/components/main";
import { generateMetadata } from "~/lib/meta";
import { Agent } from "@atproto/api";

export const loader: LoaderFunction = async ({ params }) => {
  const { handle } = params;

  if (!handle) return { error: "ハンドルを指定してください。" };

  //public Agentを作成
  const agent = new Agent("https://public.api.bsky.app");

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
    console.error(e);

    return { error: "ユーザーが見つかりませんでした。" };
  }
};

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  if (data.error) {
    return generateMetadata(data.error);
  } else if (data.data) {
    const user = data.profile.data.displayName;
    const handle = data.profile.data.handle;

    if (user && handle) {
      return generateMetadata(`${user}さんのプロフィール`, `/api/og/${handle}`);
    }
  }
  return generateMetadata(`ユーザー情報`);
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
              `AniBlueでステータスを記録しました! #AniBlue 
              https://aniblue.netlify.app/${handle}`
            )}`}
            className="inline-block"
          >
            <Share2 />
          </a>
        </div>

        <h2 className="text-center font-bold">{profile.data.description}</h2>
      </section>

      {status && status.value.status.length > 0 && (
        <div>
          <h1 className="text-center py-2">record uri : {status.uri}</h1>

          <StatusList animeStatus={status.value.status} />
        </div>
      )}
    </Main>
  );
}
