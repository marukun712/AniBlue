export type Status = "watching" | "watched" | "pending";

export type AnimeStatus = {
  id: string;
  title: string;
  thumbnail: string | null;
  status: Status;
  episode_text: string;
  favorite: boolean;
};

interface WorkImages {
  recommended_url: string;
  facebook?: {
    og_image_url: string;
  };
  twitter?: {
    mini_avatar_url: string;
    normal_avatar_url: string;
    bigger_avatar_url: string;
    original_avatar_url: string;
    image_url: string;
  };
}

interface WorkData {
  id: string;
  title: string;
  title_kana?: string;
  media?: string;
  media_text: string;
  season_name?: string;
  season_name_text: string;
  released_on?: string;
  released_on_about?: string;
  official_site_url?: string;
  wikipedia_url?: string;
  twitter_username?: string;
  twitter_hashtag?: string;
  syobocal_tid?: string;
  mal_anime_id?: string;
  images: WorkImages;
  episodes_count?: number;
  watchers_count?: number;
}

interface Episode {
  id: string;
  number: number;
  number_text?: string;
  sort_number?: number;
  title: string;
  records_count?: number;
  record_comments_count?: number;
  prev_episode?: Omit<Episode, "prev_episode" | "next_episode">;
  next_episode?: Omit<Episode, "prev_episode" | "next_episode">;
}

interface Character {
  id: number;
  name: string;
}

interface Person {
  id: number;
  name: string;
}

interface Cast {
  id: string;
  name: string;
  name_en?: string;
  sort_number?: number;
  character: Character;
  person?: Person;
}

interface Organization {
  id: number;
  name: string;
}

interface Staff {
  id: string;
  name: string;
  name_en?: string;
  role_text: string;
  role_other?: string;
  role_other_en?: string;
  sort_number?: number;
  organization?: Organization;
}

export type Work = {
  data: WorkData;
  episodes: Episode[];
  casts: Cast[];
  staffs: Staff[];
};
