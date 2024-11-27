import { Favorite } from "@types";
import { atom } from "recoil";

export const favoriteState = atom<Favorite[]>({
  key: "favorite",
  default: [],
});
