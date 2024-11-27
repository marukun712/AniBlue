import { Check, Eye, Heart, Pause, Star } from "lucide-react";
import { Button } from "~/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";

export default function AnimeDetails({ work }: any) {
  return (
    <div className="container mx-auto px-4 py-8">
      <img
        src={work.data.images.recommended_url || "/no_image_yoko.jpg"}
        alt="thumbnail"
        className="py-12 w-full h-96 object-cover"
      ></img>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <h1 className="text-3xl font-bold mb-4">{work.data.title}</h1>
          <div className="flex items-center space-x-4 mb-4">
            <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
              {work.data.season_name_text}
            </span>
            <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded">
              {work.data.media_text}
            </span>
          </div>

          <div className="md:flex md:space-x-4 mb-8">
            <Button variant="outline" className="flex items-center space-x-2">
              <Star className="w-4 h-4" />
              <span>見たい</span>
            </Button>
            <Button variant="outline" className="flex items-center space-x-2">
              <Eye className="w-4 h-4" />
              <span>視聴中</span>
            </Button>
            <Button className="flex items-center space-x-2 bg-green-500">
              <Check className="w-4 h-4" />
              <span>視聴済み</span>
            </Button>
            <Button className="flex items-center text-white space-x-2 bg-red-500">
              <Pause className="w-4 h-4" />
              <span>中断</span>
            </Button>
            <Button variant="outline" className="flex items-center space-x-2">
              <Heart className="w-4 h-4" />
              <span>お気に入り</span>
            </Button>
          </div>

          <Tabs defaultValue="episodes" className="w-full">
            <TabsList>
              <TabsTrigger value="episodes">エピソード</TabsTrigger>
              <TabsTrigger value="cast">キャスト</TabsTrigger>
              <TabsTrigger value="staff">スタッフ</TabsTrigger>
            </TabsList>

            <TabsContent value="episodes">
              <ul className="space-y-4">
                {work.episodes.map((episode) => (
                  <li key={episode.id} className="border-b pb-4">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">
                        第{episode.number}話 {episode.title}
                      </span>
                      <Button variant="ghost" size="sm">
                        視聴記録
                      </Button>
                    </div>
                  </li>
                ))}
              </ul>
            </TabsContent>

            <TabsContent value="cast">
              <ul className="grid grid-cols-2 gap-4">
                {work.casts.map((cast) => (
                  <li key={cast.id} className="flex items-center space-x-2">
                    <div>
                      <p className="font-medium">{cast.name}</p>
                      <p className="text-sm text-gray-500">
                        {cast.character.name}役
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </TabsContent>

            <TabsContent value="staff">
              <ul className="space-y-6">
                {work.staffs.map((staff) => (
                  <li key={staff.id}>
                    <span className="font-medium">{staff.role_text}:</span>
                    {staff.name}
                  </li>
                ))}
              </ul>
            </TabsContent>
          </Tabs>
        </div>

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
      </div>
    </div>
  );
}
