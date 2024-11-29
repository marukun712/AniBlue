import { AnimeStatus } from "@types";
import { AnimeCard } from "~/components/details/card/animeCard";
import { ScrollArea, ScrollBar } from "~/components/ui/scroll-area";

export default function StatusList({
  animeStatus,
}: {
  animeStatus: AnimeStatus[];
}) {
  const favorite = animeStatus.filter((item) => {
    return item.favorite === true;
  });

  const watching = animeStatus.filter((item) => {
    return item.status === "watching";
  });

  const pending = animeStatus.filter((item) => {
    return item.status === "pending";
  });

  const watched = animeStatus.filter((item) => {
    return item.status === "watched";
  });

  return (
    <div className="space-y-12">
      {favorite.length > 0 && (
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">お気に入り</h2>
          <ScrollArea className="w-full whitespace-nowrap rounded-md border">
            <div className="grid md:grid-cols-5 gap-8">
              {favorite.map((item) => {
                return (
                  <AnimeCard
                    key={item.id}
                    id={item.id}
                    title={item.title}
                    image={item.thumbnail}
                    statusText={
                      item.episode_text
                        ? `${item.episode_text}まで視聴しています`
                        : ""
                    }
                  />
                );
              })}
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </section>
      )}
      {watching.length > 0 && (
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">視聴中</h2>
          <ScrollArea className="w-full whitespace-nowrap rounded-md border">
            <div className="grid md:grid-cols-5 gap-8">
              {watching.map((item) => {
                return (
                  <AnimeCard
                    key={item.id}
                    id={item.id}
                    title={item.title}
                    image={item.thumbnail}
                    statusText={
                      item.episode_text
                        ? `${item.episode_text}まで視聴しています`
                        : ""
                    }
                  />
                );
              })}
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </section>
      )}
      {pending.length > 0 && (
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">見たい</h2>
          <ScrollArea className="w-full whitespace-nowrap rounded-md border">
            <div className="grid md:grid-cols-5 gap-8">
              {pending.map((item) => {
                return (
                  <AnimeCard
                    key={item.id}
                    id={item.id}
                    title={item.title}
                    image={item.thumbnail}
                  />
                );
              })}
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </section>
      )}
      {watched.length > 0 && (
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">視聴済み</h2>
          <ScrollArea className="w-full whitespace-nowrap rounded-md border">
            <div className="grid md:grid-cols-5 gap-8">
              {watched.map((item) => {
                return (
                  <AnimeCard
                    key={item.id}
                    id={item.id}
                    title={item.title}
                    image={item.thumbnail}
                  />
                );
              })}
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </section>
      )}
    </div>
  );
}
