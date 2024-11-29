import { useAnimeState } from "~/state/status";
import StatusList from "~/components/home/statusList";

export default function Home() {
  const animeStatus = useAnimeState();

  if (animeStatus.length > 0) return <StatusList animeStatus={animeStatus} />;

  return (
    <div className="text-center font-bold text-2xl">
      記録されている情報がありません。
      右上の検索バーから、アニメ名を検索してみましょう。
    </div>
  );
}
