import { AnimeState } from "@types";
import { atom } from "recoil";

export const animeState = atom<AnimeState[]>({
  key: "anime",
  default: [],
});
