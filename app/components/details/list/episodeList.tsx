import { AnimeStatus, Work } from "@types";
import { Button } from "../../ui/button";

export default function EpisodeList({
  episodes,
  currentEpisodeStatus,
  onEpisodeUpdate,
  prevState,
}: {
  episodes: Work["episodes"];
  currentEpisodeStatus?: string;
  onEpisodeUpdate: (episode: string) => void;
  prevState: AnimeStatus | undefined;
}) {
  return (
    <ul className="space-y-4">
      {episodes.map((episode) => (
        <li key={episode.id} className="border-b pb-4">
          <div className="flex justify-between items-center">
            <span className="font-medium">
              {episode.number_text} {episode.title}
            </span>

            {currentEpisodeStatus == episode.number_text && (
              <span className="font-bold">この回まで視聴しています</span>
            )}

            {prevState && (
              <Button
                size="sm"
                onClick={() => onEpisodeUpdate(episode.number_text ?? "")}
              >
                記録
              </Button>
            )}
          </div>
        </li>
      ))}
    </ul>
  );
}
