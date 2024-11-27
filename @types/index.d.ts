export type Status = "watching" | "watched" | "paused" | "pending";

export type AnimeStatus = {
  id: string;
  title: string;
  thumbnail: string | null;
  status: Status;
  episode_count: number;
};

export type Favorite = {
  id: string;
};

export type Work = {
  data: {
    id: string;
    title: string;
    images: {
      recommended_url: string;
    };
    season_name_text: string;
    media_text: string;
    episodes_count?: number;
    official_site_url?: string;
  };
  episodes: Array<{
    id: string;
    number: number;
    title: string;
  }>;
  casts: Array<{
    id: string;
    name: string;
    character: {
      name: string;
    };
  }>;
  staffs: Array<{
    id: string;
    role_text: string;
    name: string;
  }>;
};
