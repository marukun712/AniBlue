import { LoaderFunction } from "@vercel/remix";
import { useLoaderData, useSearchParams, Link } from "@remix-run/react";
import { Work } from "@types";
import { AnimeCard } from "~/components/details/card/animeCard";
import { Button } from "~/components/ui/button";

export const loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url);
  const title = url.searchParams.get("title");
  const page = url.searchParams.get("page");

  if (!title) {
    return { error: "検索ワードが指定されていません。" };
  }

  try {
    const res = await fetch(
      `https://api.annict.com/v1/works?filter_title=${title}${
        page ? `&page=${page}` : ""
      }`,
      {
        headers: {
          Authorization: "bearer " + process.env.ANNICT_TOKEN,
        },
      }
    );
    const result = await res.json();
    return { result };
  } catch (e) {
    return {
      error: "データの取得に失敗しました",
    };
  }
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
      <div>
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
      </div>
    );

  return (
    <section className="space-y-4">
      <h2 className="text-2xl text-center font-bold">
        {error ?? "検索結果が見つかりませんでした。"}
      </h2>
    </section>
  );
}
