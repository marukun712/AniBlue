import { Favorite } from "@types";
import { atom, useRecoilValue, useSetRecoilState } from "recoil";

export const favoriteStatus = atom<Favorite[]>({
  key: "favorite",
  default: [],
});

export const useFavorite = () => useRecoilValue(favoriteStatus);
export const useSetFavorite = () => useSetRecoilState(favoriteStatus);
