import { LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { AnimeCard } from "~/components/card/animeCard";

export const loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url);
  const title = url.searchParams.get("title");

  const res = await fetch(
    `https://api.annict.com/v1/works?filter_title=${title}`,
    {
      headers: {
        Authorization: "bearer " + process.env.ANNICT_TOKEN,
      },
    }
  );

  const json = await res.json();

  return json;
};

export default function Search() {
  const result = useLoaderData<typeof loader>();

  return (
    <div className="grid md:grid-cols-5 gap-8">
      {result.works.map((item) => {
        return (
          <AnimeCard
            key={item.id}
            id={item.id}
            title={item.title}
            image={item.images.recommended_url}
            status={null}
          />
        );
      })}
    </div>
  );
}
