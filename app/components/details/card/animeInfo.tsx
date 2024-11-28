import { Work } from "@types";

export default function AnimeInfo({ work }: { work: Work }) {
  return (
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
        <li>
          <span className="font-medium">Wikipedia:</span>
          {work.data.wikipedia_url && (
            <a
              href={work.data.wikipedia_url}
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
}
