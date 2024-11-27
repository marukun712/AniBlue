import { AnimeStatus, Status, Work } from "@types";
import { Check, Eye, Heart, Star, Trash } from "lucide-react";
import { Button } from "~/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { useAnimeState, useSetAnimeState } from "~/state/status";

type StatusButtonProps = {
  icon: React.ReactNode;
  label: string;
  status: Status;
  isActive: boolean;
  onClick: () => void;
};

const StatusButton = ({
  icon,
  label,
  isActive,
  onClick,
}: StatusButtonProps) => (
  <Button
    variant="outline"
    className={`flex items-center space-x-2 ${isActive ? "bg-green-500" : ""}`}
    onClick={onClick}
  >
    {icon}
    <span>{label}</span>
  </Button>
);

const EpisodeList = ({
  episodes,
  currentEpisode,
  onEpisodeUpdate,
  prevState,
}: {
  episodes: Work["episodes"];
  currentEpisode?: number;
  onEpisodeUpdate: (episode: number) => void;
  prevState: AnimeStatus | undefined;
}) => (
  <ul className="space-y-4">
    {episodes.map((episode) => (
      <li key={episode.id} className="border-b pb-4">
        <div className="flex justify-between items-center">
          <span className="font-medium">
            {episode.number} {episode.title}
          </span>
          {currentEpisode === episode.number && (
            <span className="font-bold">この回まで視聴しています</span>
          )}

          {prevState && (
            <Button size="sm" onClick={() => onEpisodeUpdate(episode.number)}>
              記録
            </Button>
          )}
        </div>
      </li>
    ))}
  </ul>
);

const CastList = ({ casts }: { casts: Work["casts"] }) => (
  <ul className="grid grid-cols-2 gap-4">
    {casts.map((cast) => (
      <li key={cast.id} className="flex items-center space-x-2">
        <div>
          <p className="font-medium">{cast.name}</p>
          <p className="text-sm text-gray-500">{cast.character.name}役</p>
        </div>
      </li>
    ))}
  </ul>
);

const StaffList = ({ staffs }: { staffs: Work["staffs"] }) => (
  <ul className="space-y-6">
    {staffs.map((staff) => (
      <li key={staff.id}>
        <span className="font-medium">{staff.role_text}:</span>
        {staff.name}
      </li>
    ))}
  </ul>
);

const AnimeInfo = ({ work }: { work: Work }) => (
  <div>
    <h3 className="font-bold mb-2">アニメ情報</h3>
    <ul className="space-y-2 text-sm">
      <li>
        <span className="font-medium">放送時期:</span>
        {work.data.season_name_text}
      </li>
      <li>
        <span className="font-medium">エピソード数:</span>
        {work.data.episodes_count || "なし"}
      </li>
      <li>
        <span className="font-medium">公式サイト:</span>
        {work.data.official_site_url && (
          <a
            href={work.data.official_site_url}
            className="text-blue-600 hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            リンク
          </a>
        )}
      </li>
    </ul>
  </div>
);

export default function AnimeDetails({ work }: { work: Work }) {
  const animeState = useAnimeState();
  const setAnimeState = useSetAnimeState();

  const { id, title } = work.data;
  const imageUrl = work.data.images.recommended_url;
  const prevState = animeState.find((anime) => anime.id === id);

  const updateAnimeState = async (newState: typeof animeState) => {
    setAnimeState(newState);
    await fetch("/api/status/update", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        $type: "app.vercel.aniblue.status",
        status: newState,
      }),
    });
  };

  const handleStatusUpdate = async (status: Status) => {
    const newState = prevState
      ? animeState.map((item) => (item.id === id ? { ...item, status } : item))
      : [
          ...animeState,
          { id, title, thumbnail: imageUrl, status, episode_count: 0 },
        ];
    await updateAnimeState(newState);
  };

  const handleStatusRemove = async () => {
    const newState = animeState.filter((item) => item.id !== id);
    await updateAnimeState(newState);
  };

  const handleEpisodeUpdate = async (episode: number) => {
    const newState = animeState.map((item) =>
      item.id === id ? { ...item, episode_count: episode } : item
    );
    await updateAnimeState(newState);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <img
        src={imageUrl || "/no_image_yoko.jpg"}
        alt={title || "No thumbnail available"}
        className="py-12 w-full h-96 object-cover"
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <h1 className="text-3xl font-bold mb-4">{title}</h1>
          <div className="flex items-center space-x-4 mb-4">
            <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
              {work.data.season_name_text}
            </span>
            <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded">
              {work.data.media_text}
            </span>
          </div>

          <div className="md:flex md:space-x-4 mb-8">
            <StatusButton
              icon={<Star className="w-4 h-4" />}
              label="見たい"
              status="pending"
              isActive={prevState?.status === "pending"}
              onClick={() => handleStatusUpdate("pending")}
            />
            <StatusButton
              icon={<Eye className="w-4 h-4" />}
              label="視聴中"
              status="watching"
              isActive={prevState?.status === "watching"}
              onClick={() => handleStatusUpdate("watching")}
            />
            <StatusButton
              icon={<Check className="w-4 h-4" />}
              label="視聴済み"
              status="watched"
              isActive={prevState?.status === "watched"}
              onClick={() => handleStatusUpdate("watched")}
            />

            {prevState && (
              <Button
                variant="outline"
                className="flex items-center space-x-2 bg-red-500"
                onClick={handleStatusRemove}
              >
                <Trash className="w-4 h-4" />
                <span>記録を消去</span>
              </Button>
            )}

            <Button variant="outline" className="flex items-center space-x-2">
              <Heart className="w-4 h-4" />
              <span>お気に入り</span>
            </Button>
          </div>

          <Tabs defaultValue="episodes" className="w-full">
            <TabsList>
              {work.episodes.length > 0 && (
                <TabsTrigger value="episodes">エピソード</TabsTrigger>
              )}
              <TabsTrigger value="cast">キャスト</TabsTrigger>
              <TabsTrigger value="staff">スタッフ</TabsTrigger>
            </TabsList>

            {work.episodes.length > 0 && (
              <TabsContent value="episodes">
                <EpisodeList
                  episodes={work.episodes}
                  currentEpisode={prevState?.episode_count}
                  onEpisodeUpdate={handleEpisodeUpdate}
                  prevState={prevState}
                />
              </TabsContent>
            )}

            <TabsContent value="cast">
              <CastList casts={work.casts} />
            </TabsContent>

            <TabsContent value="staff">
              <StaffList staffs={work.staffs} />
            </TabsContent>
          </Tabs>
        </div>

        <AnimeInfo work={work} />
      </div>
    </div>
  );
}
