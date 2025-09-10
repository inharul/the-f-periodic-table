import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatTime = (totalSeconds: number): string => {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
};

export const formatCountdown = (totalTime: number, elapsed: number): string => {
  const remaining = Math.max(totalTime - elapsed, 0); // don't want negatives
  const mins = Math.floor(remaining / 60);
  return `${String(mins).padStart(2, "0")}:${String(remaining % 60).padStart(
    2,
    "0"
  )}`;
};
