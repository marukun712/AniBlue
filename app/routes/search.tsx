import { LoaderFunction, MetaFunction, redirect } from "@remix-run/node";
import { useLoaderData, useSearchParams } from "@remix-run/react";
import { Work } from "@types";
import { AnimeCard } from "~/components/details/card/animeCard";
import Main from "~/components/main";
import { Button } from "~/components/ui/button";
import { AnnictAPI } from "~/lib/annict/annict";
import { getSessionAgent } from "~/lib/auth/session";

export const meta: MetaFunction = () => {
  return [
    { title: "検索結果 | AniBlue" },
    {
      property: "og:title",
      content: "検索結果 | AniBlue",
    },
  ];
};

export const loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url);
  const title = url.searchParams.get("title");
  const page = url.searchParams.get("page");

  if (!title) {
    return { error: "検索ワードが指定されていません。" };
  }

  const agent = await getSessionAgent(request);
  if (agent == null) return redirect("/login");

  const annict = new AnnictAPI(process.env.ANNICT_TOKEN!);

  const { result, error } = await annict.search(title, page);

  return { result, error };
};

export default function Search() {
  const { result, error } = useLoaderData<typeof loader>();

  const [searchParams, setSearchParams] = useSearchParams();

  const handlePageChange = (newPage: number) => {
    const currentTitle = searchParams.get("title");
    setSearchParams({
      title: currentTitle || "",
      page: newPage.toString(),
    });
  };

  if (!error && result)
    return (
      <Main>
        <div className="grid md:grid-cols-5 gap-8">
          {result.works.map((item: Work["data"]) => {
            return (
              <AnimeCard
                key={item.id}
                id={item.id}
                title={item.title}
                image={item.images.recommended_url}
              />
            );
          })}
        </div>
        <div className="text-center space-x-8 py-12">
          {result.prev_page && (
            <Button onClick={() => handlePageChange(result.prev_page)}>
              前のページ
            </Button>
          )}
          {result.next_page && (
            <Button onClick={() => handlePageChange(result.next_page)}>
              次のページ
            </Button>
          )}
        </div>
      </Main>
    );

  return (
    <Main>
      <h2 className="text-2xl text-center font-bold">
        {error ?? "検索結果が見つかりませんでした。"}
      </h2>
    </Main>
  );
}
