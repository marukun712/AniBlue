import { Work } from "@types";

export class AnnictAPI {
  token: string;

  constructor(token: string) {
    this.token = token;
  }

  async search(query: string, page: string | null) {
    try {
      const res = await fetch(
        `https://api.annict.com/v1/works?filter_title=${query}${
          page ? `&page=${page}` : ""
        }`,
        {
          headers: {
            Authorization: `bearer ${this.token}`,
          },
        }
      );
      const result = await res.json();
      return { result };
    } catch (e) {
      return {
        error: "データの取得に失敗しました",
      };
    }
  }

  async getDetails(id: string): Promise<{ work?: Work; error?: string }> {
    try {
      // 作品データの取得
      const workRes = await fetch(
        `https://api.annict.com/v1/works?filter_ids=${id}`,
        {
          headers: {
            Authorization: `bearer ${this.token}`,
          },
        }
      );

      // エピソードデータの取得
      const episodesRes = await fetch(
        `https://api.annict.com/v1/episodes?filter_work_id=${id}&sort_id=asc`,
        {
          headers: {
            Authorization: `bearer ${this.token}`,
          },
        }
      );

      // キャストデータの取得
      const castsRes = await fetch(
        `https://api.annict.com/v1/casts?filter_work_id=${id}&sort_id=asc`,
        {
          headers: {
            Authorization: `bearer ${this.token}`,
          },
        }
      );

      // スタッフデータの取得
      const staffsRes = await fetch(
        `https://api.annict.com/v1/staffs?filter_work_id=${id}&sort_id=asc`,
        {
          headers: {
            Authorization: `bearer ${this.token}`,
          },
        }
      );

      const [workData, episodesData, castsData, staffsData] = await Promise.all(
        [workRes.json(), episodesRes.json(), castsRes.json(), staffsRes.json()]
      );

      return {
        work: {
          data: workData.works[0],
          episodes: episodesData.episodes,
          casts: castsData.casts,
          staffs: staffsData.staffs,
        },
      };
    } catch (e) {
      return {
        error: "データの取得に失敗しました",
      };
    }
  }
}
