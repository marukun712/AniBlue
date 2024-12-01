import { AnimeStatus } from "@types";
import { AnimeCard } from "~/components/details/card/animeCard";
import { ScrollArea, ScrollBar } from "~/components/ui/scroll-area";

const StatusSection = ({
  title,
  items,
  showEpisode = false,
}: {
  title: string;
  items: AnimeStatus[];
  showEpisode?: boolean;
}) => {
  if (items.length === 0) return null;

  return (
    <section className="space-y-4">
      <h2 className="text-2xl font-semibold">{title}</h2>
      <ScrollArea className="w-full rounded-md border">
        <div className="flex p-4">
          <div className="flex gap-4">
            {items.map((item) => (
              <div className="w-[250px] flex-none" key={item.id}>
                <AnimeCard
                  id={item.id}
                  title={item.title}
                  image={item.thumbnail}
                  statusText={
                    showEpisode && item.episode_text
                      ? `${item.episode_text}まで視聴しています`
                      : undefined
                  }
                />
              </div>
            ))}
          </div>
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </section>
  );
};

export default function StatusList({
  animeStatus,
}: {
  animeStatus: AnimeStatus[];
}) {
  const favorite = animeStatus.filter((item) => item.favorite === true);
  const watching = animeStatus.filter((item) => item.status === "watching");
  const pending = animeStatus.filter((item) => item.status === "pending");
  const watched = animeStatus.filter((item) => item.status === "watched");

  return (
    <div className="space-y-12">
      <StatusSection title="お気に入り" items={favorite} showEpisode={true} />
      <StatusSection title="視聴中" items={watching} showEpisode={true} />
      <StatusSection title="見たい" items={pending} />
      <StatusSection title="視聴済み" items={watched} />
    </div>
  );
}
