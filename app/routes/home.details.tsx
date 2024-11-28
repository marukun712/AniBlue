import { LoaderFunction } from "@vercel/remix";
import { useLoaderData } from "@remix-run/react";
import AnimeDetails from "~/components/details/details";

export const loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url);
  const id = url.searchParams.get("id");

  // 作品データの取得
  const workRes = await fetch(
    `https://api.annict.com/v1/works?filter_ids=${id}`,
    {
      headers: {
        Authorization: "bearer " + process.env.ANNICT_TOKEN,
      },
    }
  );
  // エピソードデータの取得
  const episodesRes = await fetch(
    `https://api.annict.com/v1/episodes?filter_work_id=${id}&sort_id=asc`,
    {
      headers: {
        Authorization: `bearer ${process.env.ANNICT_TOKEN}`,
      },
    }
  );
  // キャストデータの取得
  const castsRes = await fetch(
    `https://api.annict.com/v1/casts?filter_work_id=${id}&sort_id=asc`,
    {
      headers: {
        Authorization: `bearer ${process.env.ANNICT_TOKEN}`,
      },
    }
  );
  // スタッフデータの取得
  const staffsRes = await fetch(
    `https://api.annict.com/v1/staffs?filter_work_id=${id}&sort_id=asc`,
    {
      headers: {
        Authorization: `bearer ${process.env.ANNICT_TOKEN}`,
      },
    }
  );

  const [workData, episodesData, castsData, staffsData] = await Promise.all([
    workRes.json(),
    episodesRes.json(),
    castsRes.json(),
    staffsRes.json(),
  ]);

  return {
    work: {
      data: workData.works[0],
      episodes: episodesData.episodes,
      casts: castsData.casts,
      staffs: staffsData.staffs,
    },
  };
};

export default function WorkDetail() {
  const { work } = useLoaderData<typeof loader>();

  return <AnimeDetails work={work} />;
}
