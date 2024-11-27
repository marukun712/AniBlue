import { AnimeCard } from "~/components/card/animeCard";
import { ScrollArea, ScrollBar } from "~/components/ui/scroll-area";

export default function Home() {
  return (
    <div>
      <section key={"hoge"} className="space-y-4">
        <h2 className="text-2xl font-semibold">hoge</h2>
        <ScrollArea className="w-full whitespace-nowrap rounded-md border">
          <div className="flex w-max space-x-4 p-4">
            <AnimeCard
              key={"fuga"}
              title={"hoge"}
              image={""}
              status={"watching"}
            />
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </section>
    </div>
  );
}
