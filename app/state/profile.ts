import { ProfileView } from "@atproto/api/dist/client/types/app/bsky/actor/defs";
import { atom, useRecoilValue, useSetRecoilState } from "recoil";

export const profileState = atom<ProfileView | null>({
  key: "profile",
  default: null,
});

export const useProfile = () => useRecoilValue(profileState);
export const useSetProfile = () => useSetRecoilState(profileState);
