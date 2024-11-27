import { AnimeCard } from "~/components/card/animeCard";
import { ScrollArea, ScrollBar } from "~/components/ui/scroll-area";
import { useAnimeState } from "~/state/status";

export default function Home() {
  const animeState = useAnimeState();

  const watching = animeState.filter((item) => {
    return item.status === "watching";
  });

  const pending = animeState.filter((item) => {
    return item.status === "pending";
  });

  const watched = animeState.filter((item) => {
    return item.status === "watched";
  });

  return (
    <div className="space-y-12">
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
                    status={item.status}
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
                    status={item.status}
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
                    status={item.status}
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
