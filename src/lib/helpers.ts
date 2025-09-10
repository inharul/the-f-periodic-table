import {
  mainTable,
  lanthanideSeries,
  actinideSeries,
  correctAbbreviations,
} from "@/data";

import { isBorderAtom, nakedAtom } from "@/global";
import { getDefaultStore } from "jotai";

let inputRefs: { current: Record<string, HTMLInputElement | null> } | null =
  null;

// Register the refs object from main component once on mount
export function registerInputRefs(refs: {
  current: Record<string, HTMLInputElement | null>;
}) {
  inputRefs = refs;
}

// Focus the input by symbol, safe to call from child or anywhere
export function focusInput(symbol: string) {
  if (!inputRefs?.current) {
    console.log(
      `%c[DEBUG] %c${"`focusInput` called before `refs` were registered in client."} \n%cIf you encounter this please let me know about this. This might affect keyboard movements.`,
      "color: cyan",
      "color: white",
      "color: gray"
    );
    return;
  }
  inputRefs.current[symbol]?.focus();
}

// Function to determine the border color based on the input value
export const getBorderColor = (symbol: string, value: string) => {
  const globalStore = getDefaultStore();
  const isBorder = globalStore.get(isBorderAtom);
  const naked = globalStore.get(nakedAtom);
  // Helper to check if input should be evaluated and its correctness
  const shouldEvaluate = (
    symbol: string,
    value: string
  ): { shouldEvaluate: boolean; isCorrect?: boolean } => {
    const normalizedValue = value.trim();
    if (symbol.length === 1) {
      return {
        shouldEvaluate: true,
        isCorrect: normalizedValue.toUpperCase() === symbol.toUpperCase(),
      };
    }
    if (symbol.length === 2) {
      if (normalizedValue.length < 2) {
        return { shouldEvaluate: false };
      }
      return {
        shouldEvaluate: true,
        isCorrect: normalizedValue.toUpperCase() === symbol.toUpperCase(),
      };
    }
    return { shouldEvaluate: true, isCorrect: false };
  };
  // Case 1: Naked mode on, no borders
  if (naked === true && isBorder === false) {
    return "border-transparent";
  }

  // Case 2: Both isBorder and naked are true
  if (isBorder === true && naked === true) {
    if (!value || value.trim() === "") {
      return "border-transparent";
    }
    const evaluation = shouldEvaluate(symbol, value);
    if (!evaluation.shouldEvaluate) {
      return "border-transparent";
    }
    return evaluation.isCorrect ? "border-green-500" : "border-red-500";
  }

  // Case 3: isBorder true, naked false
  if (isBorder && !naked) {
    if (!value || value.trim() === "") {
      return "light:border-gray-300 dark:border-gray-600";
    }
    const evaluation = shouldEvaluate(symbol, value);
    if (!evaluation.shouldEvaluate) {
      return "light:border-gray-300 dark:border-gray-600";
    }
    return evaluation.isCorrect ? "border-green-500" : "border-red-500";
  }

  // Default case
  return "light:border-gray-300 dark:border-gray-600";
};

// Function to get element index from symbol
export const getElementIndex = (symbol: string) => {
  return correctAbbreviations.findIndex((abbr) => abbr === symbol);
};

// Helper to get symbol at a given main table position
export const getMainTableSymbol = (row: number, col: number) => {
  if (row < 0 || row >= mainTable.length) return null;
  if (col < 0 || col >= mainTable[row].length) return null;
  return mainTable[row][col];
};

// Arrow key navigation handler for main table
export const handleMainTableKeyDown =
  (rowIdx: number, colIdx: number) =>
  (e: React.KeyboardEvent<HTMLInputElement>) => {
    const symbol = mainTable[rowIdx][colIdx];
    if (!symbol) return;
    let nextRow = rowIdx;
    let nextCol = colIdx;
    if (e.key === "ArrowRight") {
      do {
        nextCol++;
        if (!(nextCol < 18)) {
          nextCol = 0; // Going to the starting of the row after it finishes
          // nextRow += 1; -- Going to the next row after the previous row ends
        }
      } while (nextCol < 18 && !getMainTableSymbol(rowIdx, nextCol));
    } else if (e.key === "ArrowLeft") {
      do {
        nextCol--;
        if (nextCol < 0) {
          nextCol = 18; // Going to the end of the current row
        }
      } while (nextCol >= 0 && !getMainTableSymbol(rowIdx, nextCol));
    } else if (e.key === "ArrowDown") {
      do {
        nextRow++;
      } while (nextRow < 7 && !getMainTableSymbol(nextRow, colIdx));
      nextCol = colIdx;
    } else if (e.key === "ArrowUp") {
      // console.log(`current: ${rowIdx + " " + colIdx} `);
      // If cursor is in second period then select correct group in fisrt period
      if (rowIdx == 1) {
        nextRow--;
        colIdx > 2 ? (nextCol = 17) : (nextCol = 0);
      }
      // If cursor is in fourth period then select the group in third period
      else if (rowIdx == 3) {
        nextRow--;
        // Sc - Mn
        if (1 < colIdx && colIdx < 7) nextCol = 1;
        else if (6 < colIdx && colIdx < 12) nextCol = 12;
      } else {
        // default behavior
        do {
          nextRow--;
        } while (nextRow >= 0 && !getMainTableSymbol(nextRow, colIdx));
        nextCol = colIdx;
      }
    } else {
      return;
    }
    e.preventDefault();
    if (e.key === "ArrowDown" && rowIdx > 5) {
      focusInput("Ce");
      e.preventDefault();
    }
    // Try to focus in main table
    const nextSymbol = getMainTableSymbol(nextRow, nextCol);
    if (nextSymbol) {
      focusInput(nextSymbol);
      e.preventDefault();
      return;
    } else {
      return;
    }
  };

// Arrow key navigation for f-blocks
export const handleFBlockKeyDown =
  (series: string[], idx: number, block: "lan" | "act") =>
  (e: React.KeyboardEvent<HTMLInputElement>) => {
    console.log(e.key, block, idx);
    // frst we gonna see if it's a starting or end element

    // Right movements
    if (e.key === "ArrowRight" && idx < series.length - 1) {
      focusInput(series[idx + 1]);
      e.preventDefault();
    } else if (e.key === "ArrowRight" && idx == series.length - 1) {
      block == "lan" ? focusInput("Hf") : focusInput("Rf");
      e.preventDefault();
    }
    // Left movements
    else if (e.key === "ArrowLeft" && idx > 0) {
      focusInput(series[idx - 1]);
      e.preventDefault();
    } else if (e.key === "ArrowLeft" && idx == 0) {
      block == "lan" ? focusInput("Ba") : focusInput("Ra");
      e.preventDefault();
    }
    // Up and Down navigation between f-block
    else if (e.key === "ArrowUp" && block == "lan") {
      focusInput("Rf");
    } else if (e.key === "ArrowUp" && block == "act") {
      focusInput(lanthanideSeries[idx]);
      e.preventDefault();
    } else if (e.key === "ArrowDown" && block == "lan") {
      focusInput(actinideSeries[idx]);
      e.preventDefault();
    }
  };
