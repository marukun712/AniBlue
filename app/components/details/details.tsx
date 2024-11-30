import { AnimeStatus, Status, Work } from "@types";
import { Check, Eye, Heart, Star, Trash } from "lucide-react";
import { Button } from "~/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { useAnimeState, useSetAnimeState } from "~/state/status";
import { Toaster } from "~/components/ui/toaster";
import { useToast } from "~/hooks/use-toast";
import StatusButton from "./button/statusButton";
import EpisodeList from "./list/episodeList";
import CastList from "./list/castList";
import StaffList from "./list/staffList";
import AnimeInfo from "./card/animeInfo";

export default function AnimeDetails({ work }: { work: Work }) {
  const animeState = useAnimeState();
  const setAnimeState = useSetAnimeState();
  const { toast } = useToast();

  if (work.data) {
    const { id, title } = work.data;
    const imageUrl = work.data.images.recommended_url;

    // すでに記録がある場合は取得
    const prevState = animeState.find((anime) => anime.id === id);

    const showToast = (title: string, description: string) => {
      toast({
        title,
        description,
      });
    };

    const showErrorToast = (title: string, description: string) => {
      toast({
        title,
        description,
        variant: "destructive",
      });
    };

    const updateAnimeState = async (newState: AnimeStatus[]) => {
      // ローカルのstateを更新
      setAnimeState(newState);

      // PDS側も更新
      const res = await fetch("/api/status/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          $type: "app.vercel.aniblue.status",
          status: newState,
        }),
      });

      const json = await res.json();

      if (!json.ok) {
        showErrorToast("Error", "情報の更新に失敗しました");
      }
    };

    const toggleFavorite = async () => {
      if (!prevState) {
        showErrorToast("Error", "アニメの記録が見つかりません");
        return;
      }

      try {
        const newState = animeState.map((item) =>
          item.id === id ? { ...item, favorite: !item.favorite } : item
        );

        await updateAnimeState(newState);

        showToast(
          prevState.favorite
            ? `お気に入りから削除しました`
            : `お気に入りに追加しました✅`,
          ""
        );
      } catch (error) {
        showErrorToast("Error", "お気に入りの更新に失敗しました");
      }
    };

    const handleStatusUpdate = async (status: Status) => {
      try {
        // prevStateが存在しない場合はレコードを新規作成
        const newState = prevState
          ? animeState.map((item) =>
              item.id === id ? { ...item, status } : item
            )
          : [
              ...animeState,
              {
                id,
                title,
                thumbnail: imageUrl,
                status,
                episode_text: "",
                favorite: false,
              },
            ];

        await updateAnimeState(newState);

        let statusText;
        switch (status) {
          case "pending":
            statusText = "見たい";
            break;
          case "watched":
            statusText = "視聴済み";
            break;
          case "watching":
            statusText = "視聴中";
            break;
        }

        showToast(`記録を${statusText}に更新しました✅`, "");
      } catch (error) {
        showErrorToast("Error", "ステータスの更新に失敗しました");
      }
    };

    const handleStatusRemove = async () => {
      try {
        const newState = animeState.filter((item) => item.id !== id);
        await updateAnimeState(newState);

        showToast("記録が正常に削除されました。", "");
      } catch (error) {
        showErrorToast("Error", "記録の削除に失敗しました");
      }
    };

    const handleEpisodeUpdate = async (episodeText: string) => {
      if (!episodeText) {
        showErrorToast("Error", "話数を入力してください");
        return;
      }

      try {
        const newState = animeState.map((item) =>
          item.id === id ? { ...item, episode_text: episodeText } : item
        );
        await updateAnimeState(newState);

        showToast(
          "話数を更新しました✅",
          `話数を${episodeText}に更新しました。`
        );
      } catch (error) {
        showErrorToast("Error", "話数の更新に失敗しました");
      }
    };

    return (
      <div className="container mx-auto px-4 py-8">
        <Toaster />
        {imageUrl && (
          <img
            src={imageUrl}
            alt={title || "No thumbnail available"}
            className="py-12 w-full h-full"
          />
        )}

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

            <div className="md:flex md:space-x-4 md:space-y-0 space-y-6 mb-8">
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

              {prevState && (
                <Button
                  variant="outline"
                  className={
                    prevState?.favorite
                      ? "flex items-center space-x-2 bg-yellow-500"
                      : "flex items-center space-x-2"
                  }
                  onClick={toggleFavorite}
                >
                  <Heart className="w-4 h-4" />
                  <span>お気に入り</span>
                </Button>
              )}
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
                    currentEpisodeStatus={prevState?.episode_text}
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

  return (
    <section className="space-y-4">
      <h2 className="text-2xl text-center font-bold">
        作品データが見つかりませんでした。
      </h2>
    </section>
  );
}
