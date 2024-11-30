import { LoaderFunction, MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import AnimeDetails from "~/components/details/details";

export const meta: MetaFunction = () => {
  return [{ title: "アニメ詳細 | AniBlue" }];
};

export const loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url);
  const id = url.searchParams.get("id");

  if (!id) {
    return { error: "作品IDが指定されていません" };
  }

  try {
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
  } catch (error) {
    return {
      error: "データの取得に失敗しました",
    };
  }
};

export default function WorkDetail() {
  const { work, error } = useLoaderData<typeof loader>();

  if (!error) return <AnimeDetails work={work} />;

  return (
    <section className="space-y-4">
      <h2 className="text-2xl text-center font-bold">{error}</h2>
    </section>
  );
}
