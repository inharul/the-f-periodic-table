import { atom } from "jotai";

type sizeAtom = 4 | 4.5 | 5;
export const elementFontSize = atom<sizeAtom>(5);

export const selectedLevel = atom<
  "noob" | "pro-1" | "pro-2" | "pro-3" | "monster"
>();

export const isBorderAtom = atom<boolean>(false);
export const nakedAtom = atom<boolean>(true);

export const durationAtom = atom<number>(5);
