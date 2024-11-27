export type State = "watching" | "watched" | "paused" | "pending";

export type AnimeState = {
  id: string;
  title: string;
  thumbnail: string | null;
  state: State;
  episodes_count: number;
};

export type Favorite = {
  id: string;
};
