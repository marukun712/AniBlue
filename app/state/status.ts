import { AnimeStatus } from "@types";
import { atom, useRecoilValue, useSetRecoilState } from "recoil";

export const animeStatus = atom<AnimeStatus[]>({
  key: "anime",
  default: [],
});

export const useAnimeState = () => useRecoilValue(animeStatus);
export const useSetAnimeState = () => useSetRecoilState(animeStatus);
