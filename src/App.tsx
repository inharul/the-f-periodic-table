import { useState } from "react";
import React from "react";
import { ModeToggle } from "./components/toggle-theme";
import { ModeSize } from "./components/toggle-size";
import { ColorPicker } from "./components/ui/colorpicker";
import "./App.css";
import { ToggleGroup, ToggleGroupItem } from "./components/ui/toggle-group";
import { CheckLine, PaintBucket, SquareDashed } from "lucide-react";
import { cn } from "./lib/utils";

// 0: Alkali metals, 1: Alkaline earth metals, 2: Lanthanides, 3: Actinides, 4: Transition metals, 5: Post-transition metals, 6: Metalloids, 7: Nonmetals, 8: Halogens, 9: Noble gases

const elementGroups = [
  // 1-10
  7, // 0: H - Nonmetal
  9, // 1: He - Noble gas
  0, // 2: Li - Alkali metal
  1, // 3: Be - Alkaline earth metal
  6, // 4: B - Metalloid
  7, // 5: C - Nonmetal
  7, // 6: N - Nonmetal
  7, // 7: O - Nonmetal
  8, // 8: F - Halogen
  9, // 9: Ne - Noble gas

  // 11-20
  0, // 10: Na - Alkali metal
  1, // 11: Mg - Alkaline earth metal
  5, // 12: Al - Post-transition metal
  6, // 13: Si - Metalloid
  7, // 14: P - Nonmetal
  7, // 15: S - Nonmetal
  8, // 16: Cl - Halogen
  9, // 17: Ar - Noble gas
  0, // 18: K - Alkali metal
  1, // 19: Ca - Alkaline earth metal

  // 21-30
  4, // 20: Sc - Transition metal
  4, // 21: Ti - Transition metal
  4, // 22: V - Transition metal
  4, // 23: Cr - Transition metal
  4, // 24: Mn - Transition metal
  4, // 25: Fe - Transition metal
  4, // 26: Co - Transition metal
  4, // 27: Ni - Transition metal
  4, // 28: Cu - Transition metal
  4, // 29: Zn - Transition metal

  // 31-40
  5, // 30: Ga - Post-transition metal
  6, // 31: Ge - Metalloid
  6, // 32: As - Metalloid
  7, // 33: Se - Nonmetal
  8, // 34: Br - Halogen
  9, // 35: Kr - Noble gas
  0, // 36: Rb - Alkali metal
  1, // 37: Sr - Alkaline earth metal
  4, // 38: Y - Transition metal
  4, // 39: Zr - Transition metal

  // 41-50
  4, // 40: Nb - Transition metal
  4, // 41: Mo - Transition metal
  4, // 42: Tc - Transition metal
  4, // 43: Ru - Transition metal
  4, // 44: Rh - Transition metal
  4, // 45: Pd - Transition metal
  4, // 46: Ag - Transition metal
  4, // 47: Cd - Transition metal
  5, // 48: In - Post-transition metal
  5, // 49: Sn - Post-transition metal

  // 51-60
  6, // 50: Sb - Metalloid
  6, // 51: Te - Metalloid
  8, // 52: I - Halogen
  9, // 53: Xe - Noble gas
  0, // 54: Cs - Alkali metal
  1, // 55: Ba - Alkaline earth metal
  2, // 56: La - Lanthanide
  2, // 57: Ce - Lanthanide
  2, // 58: Pr - Lanthanide
  2, // 59: Nd - Lanthanide

  // 61-70
  2, // 60: Pm - Lanthanide
  2, // 61: Sm - Lanthanide
  2, // 62: Eu - Lanthanide
  2, // 63: Gd - Lanthanide
  2, // 64: Tb - Lanthanide
  2, // 65: Dy - Lanthanide
  2, // 66: Ho - Lanthanide
  2, // 67: Er - Lanthanide
  2, // 68: Tm - Lanthanide
  2, // 69: Yb - Lanthanide

  // 71-80
  2, // 70: Lu - Lanthanide
  4, // 71: Hf - Transition metal
  4, // 72: Ta - Transition metal
  4, // 73: W - Transition metal
  4, // 74: Re - Transition metal
  4, // 75: Os - Transition metal
  4, // 76: Ir - Transition metal
  4, // 77: Pt - Transition metal
  4, // 78: Au - Transition metal
  4, // 79: Hg - Transition metal

  // 81-90
  5, // 80: Tl - Post-transition metal
  5, // 81: Pb - Post-transition metal
  5, // 82: Bi - Metalloid
  6, // 83: Po - Metalloid
  8, // 84: At - Halogen
  9, // 85: Rn - Noble gas
  0, // 86: Fr - Alkali metal
  1, // 87: Ra - Alkaline earth metal
  3, // 88: Ac - Actinide
  3, // 89: Th - Actinide

  // 91-100
  3, // 90: Pa - Actinide
  3, // 91: U - Actinide
  3, // 92: Np - Actinide
  3, // 93: Pu - Actinide
  3, // 94: Am - Actinide
  3, // 95: Cm - Actinide
  3, // 96: Bk - Actinide
  3, // 97: Cf - Actinide
  3, // 98: Es - Actinide
  3, // 99: Fm - Actinide

  // 101-110
  3, // 100: Md - Actinide
  3, // 101: No - Actinide
  3, // 102: Lr - Actinide
  4, // 103: Rf - Transition metal
  4, // 104: Db - Transition metal
  4, // 105: Sg - Transition metal
  4, // 106: Bh - Transition metal
  4, // 107: Hs - Transition metal
  4, // 108: Mt - Post-transition metal
  4, // 109: Ds - Post-transition metal

  // 111-118
  4, // 110: Rg - Post-transition metal
  4, // 111: Cn - Post-transition metal
  10, // 112: Nh - Post-transition metal
  10, // 113: Fl - Post-transition metal
  10, // 114: Mc - Post-transition metal
  10, // 115: Lv - Halogen
  10, // 116: Ts
  10, // 118: Og
];

const groupBgColors = [
  "#fde047", // bg-yellow-300 - Alkali metals
  "#fca5a5", // bg-red-300 - Alkaline earth metals
  "#f9a8d4", // bg-pink-300 - Lanthanides
  "#fdba74", // bg-orange-300 - Actinides
  "#60a5fa", // bg-blue-400 - Transition metals
  "#14b8a6", // bg-teal-500 - Post-transition metals
  "#22c55e", // bg-green-500 - Metalloids
  "#d1d5db", // bg-gray-300 - Nonmetals
  "#7dd3fc", // bg-sky-300 - Halogens
  "#fde68a", // bg-yellow-400 - Noble gases
  "#a78bfa", // bg-purple-400 - Unknown Elements
];

const noGroupBgColors = new Array(11).fill("#FFFFFF00");

const groupNames = [
  "Alkali metals",
  "Alkaline earth metals",
  "Lanthanides",
  "Actinides",
  "Transition metals",
  "Post-transition metals",
  "Metalloids",
  "Nonmetals",
  "Halogens",
  "Noble gases",
  "Unknown Elements",
];

const correctAbbreviations = [
  "H",
  "He",
  "Li",
  "Be",
  "B",
  "C",
  "N",
  "O",
  "F",
  "Ne",
  "Na",
  "Mg",
  "Al",
  "Si",
  "P",
  "S",
  "Cl",
  "Ar",
  "K",
  "Ca",
  "Sc",
  "Ti",
  "V",
  "Cr",
  "Mn",
  "Fe",
  "Co",
  "Ni",
  "Cu",
  "Zn",
  "Ga",
  "Ge",
  "As",
  "Se",
  "Br",
  "Kr",
  "Rb",
  "Sr",
  "Y",
  "Zr",
  "Nb",
  "Mo",
  "Tc",
  "Ru",
  "Rh",
  "Pd",
  "Ag",
  "Cd",
  "In",
  "Sn",
  "Sb",
  "Te",
  "I",
  "Xe",
  "Cs",
  "Ba",
  "La",
  "Ce",
  "Pr",
  "Nd",
  "Pm",
  "Sm",
  "Eu",
  "Gd",
  "Tb",
  "Dy",
  "Ho",
  "Er",
  "Tm",
  "Yb",
  "Lu",
  "Hf",
  "Ta",
  "W",
  "Re",
  "Os",
  "Ir",
  "Pt",
  "Au",
  "Hg",
  "Tl",
  "Pb",
  "Bi",
  "Po",
  "At",
  "Rn",
  "Fr",
  "Ra",
  "Ac",
  "Th",
  "Pa",
  "U",
  "Np",
  "Pu",
  "Am",
  "Cm",
  "Bk",
  "Cf",
  "Es",
  "Fm",
  "Md",
  "No",
  "Lr",
  "Rf",
  "Db",
  "Sg",
  "Bh",
  "Hs",
  "Mt",
  "Ds",
  "Rg",
  "Cn",
  "Nh",
  "Fl",
  "Mc",
  "Lv",
  "Ts",
  "Og",
];

// Main table structure based on provided layout
const mainTable = [
  // Row 1
  [
    "H",
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    "He",
  ],
  // Row 2
  [
    "Li",
    "Be",
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    "B",
    "C",
    "N",
    "O",
    "F",
    "Ne",
  ],
  // Row 3
  [
    "Na",
    "Mg",
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    "Al",
    "Si",
    "P",
    "S",
    "Cl",
    "Ar",
  ],
  // Row 4
  [
    "K",
    "Ca",
    "Sc",
    "Ti",
    "V",
    "Cr",
    "Mn",
    "Fe",
    "Co",
    "Ni",
    "Cu",
    "Zn",
    "Ga",
    "Ge",
    "As",
    "Se",
    "Br",
    "Kr",
  ],
  // Row 5
  [
    "Rb",
    "Sr",
    "Y",
    "Zr",
    "Nb",
    "Mo",
    "Tc",
    "Ru",
    "Rh",
    "Pd",
    "Ag",
    "Cd",
    "In",
    "Sn",
    "Sb",
    "Te",
    "I",
    "Xe",
  ],
  // Row 6
  [
    "Cs",
    "Ba",
    "La",
    "Hf",
    "Ta",
    "W",
    "Re",
    "Os",
    "Ir",
    "Pt",
    "Au",
    "Hg",
    "Tl",
    "Pb",
    "Bi",
    "Po",
    "At",
    "Rn",
  ],
  // Row 7
  [
    "Fr",
    "Ra",
    "Ac",
    "Rf",
    "Db",
    "Sg",
    "Bh",
    "Hs",
    "Mt",
    "Ds",
    "Rg",
    "Cn",
    "Nh",
    "Fl",
    "Mc",
    "Lv",
    "Ts",
    "Og",
  ],
];

// Lanthanide series
const lanthanideSeries = [
  "La",
  "Ce",
  "Pr",
  "Nd",
  "Pm",
  "Sm",
  "Eu",
  "Gd",
  "Tb",
  "Dy",
  "Ho",
  "Er",
  "Tm",
  "Yb",
  "Lu",
];

// Actinide series
const actinideSeries = [
  "Ac",
  "Th",
  "Pa",
  "U",
  "Np",
  "Pu",
  "Am",
  "Cm",
  "Bk",
  "Cf",
  "Es",
  "Fm",
  "Md",
  "No",
  "Lr",
];

// Function to get element index from symbol
const getElementIndex = (symbol: string) => {
  return correctAbbreviations.findIndex((abbr) => abbr === symbol);
};

// Helper to get symbol at a given main table position
const getMainTableSymbol = (row: number, col: number) => {
  if (row < 0 || row >= mainTable.length) return null;
  if (col < 0 || col >= mainTable[row].length) return null;
  return mainTable[row][col];
};

// Helper to focus an input by symbol
const focusInput = (symbol: string) => {
  const el = document.getElementById(
    `input-${symbol}`
  ) as HTMLInputElement | null;
  if (el) el.focus();
};

const PeriodicTable = () => {
  // Create a state to track user inputs for all elements
  const [userInputs, setUserInputs] = useState<Record<string, string>>({});
  const [size, setSize] = useState<number>(4.5);
  const [groupColors, setGroupColors] = useState(groupBgColors);
  const [isBorder, setIsBorder] = useState<boolean>(false);
  const [naked, setNaked] = useState<boolean>(false);

  // Function to handle input change
  const handleInputChange = (symbol: string, value: string) => {
    const capitalizedValue = value.charAt(0).toUpperCase() + value.slice(1);
    setUserInputs({
      ...userInputs,
      [symbol]: capitalizedValue,
    });
  };

  // Function to determine the border color based on the input value
  const getBorderColor = (symbol: string, value: string) => {
    // I want no borders or even instant correctness so I am turning off isBorder and turning naked on
    if (naked === true && isBorder === false) return "border-transparent";

    // Case 2: If isBorder is true
    if (isBorder === true && naked === true) {
      // If not typed yet, show gray border
      if (!value || value.trim() === "") {
        return "border-transparent";
      }
      // Show green/red for correctness
      return value === symbol ? "border-green-500" : "border-red-500";
    }

    if (isBorder && !naked) {
      if (!value || value.trim() === "") {
        return "light:border-gray-300 dark:border-gray-600";
      }
      return value === symbol ? "border-green-500" : "border-red-500";
    }

    return "light:border-gray-300 dark:border-gray-600";
  };

  // Arrow key navigation handler for main table
  const handleMainTableKeyDown =
    (rowIdx: number, colIdx: number) =>
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      const symbol = mainTable[rowIdx][colIdx];
      if (!symbol) return;
      let nextRow = rowIdx;
      let nextCol = colIdx;
      if (e.key === "ArrowRight") {
        do {
          nextCol++;
        } while (nextCol < 18 && !getMainTableSymbol(rowIdx, nextCol));
      } else if (e.key === "ArrowLeft") {
        do {
          nextCol--;
        } while (nextCol >= 0 && !getMainTableSymbol(rowIdx, nextCol));
      } else if (e.key === "ArrowDown") {
        do {
          nextRow++;
        } while (nextRow < 7 && !getMainTableSymbol(nextRow, colIdx));
        nextCol = colIdx;
      } else if (e.key === "ArrowUp") {
        do {
          nextRow--;
        } while (nextRow >= 0 && !getMainTableSymbol(nextRow, colIdx));
        nextCol = colIdx;
      } else {
        return;
      }
      e.preventDefault();
      // Try to focus in main table
      const nextSymbol = getMainTableSymbol(nextRow, nextCol);
      if (nextSymbol) {
        focusInput(nextSymbol);
        return;
      }
      // If not found, try to move to lanthanides/actinides if at La/Ac
      if (symbol === "La" && e.key === "ArrowDown") focusInput("Ce");
      if (symbol === "Ac" && e.key === "ArrowDown") focusInput("Th");
      // If at top of lanthanides/actinides, move up to La/Ac
      if (symbol === "Ce" && e.key === "ArrowUp") focusInput("La");
      if (symbol === "Th" && e.key === "ArrowUp") focusInput("Ac");
    };

  // Arrow key navigation for f-blocks
  const handleFBlockKeyDown =
    (series: string[], idx: number, block: "lan" | "act") =>
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "ArrowRight" && idx < series.length - 1) {
        focusInput(series[idx + 1]);
        e.preventDefault();
      } else if (e.key === "ArrowLeft" && idx > 0) {
        focusInput(series[idx - 1]);
        e.preventDefault();
      } else if (e.key === "ArrowUp") {
        // Up from Ce/Th goes to La/Ac
        if (block === "lan") focusInput("La");
        if (block === "act") focusInput("Ac");
        e.preventDefault();
      } else if (e.key === "ArrowDown") {
        // Down from lan goes to act (same idx)
        if (block === "lan") focusInput(actinideSeries[idx]);
        e.preventDefault();
      } else if (e.key === "ArrowUp" && block === "act") {
        // Up from act goes to lan (same idx)
        focusInput(lanthanideSeries[idx]);
        e.preventDefault();
      }
    };

  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      <div className="w-full mx-auto">
        {/* Header */}
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Periodic Table Challenge
        </h1>
        <div className="flex flex-row-reverse gap-3 mr-10">
          <ModeToggle />
          <ModeSize size={size} setSize={setSize} />

          <ToggleGroup
            type="multiple"
            variant="outline"
            className="border select-none py-1"
          >
            <div
              aria-label="Toggle italic"
              onClick={() => setNaked(!naked)}
              className={cn(
                "flex px-3 mx-1 items-center gap-3 cursor-pointer w-full h-full rounded-md transition-all duration-200",
                !naked ? "border bg-accent" : "border-transparent border-1"
              )}
            >
              <SquareDashed className="h-4 w-4" />
            </div>

            <div
              aria-label="Toggle check"
              onClick={() => setIsBorder(!isBorder)}
              className={cn(
                "flex px-3 mx-1 items-center gap-3 cursor-pointer w-full h-full rounded-md transition-all duration-200",
                isBorder ? "border bg-accent" : "border-transparent border-1"
              )}
            >
              <CheckLine className="h-4 w-4" />
            </div>
            <div
              aria-label="Toggle colors"
              onClick={() =>
                groupColors === noGroupBgColors
                  ? setGroupColors(groupBgColors)
                  : setGroupColors(noGroupBgColors)
              }
              className={cn(
                "flex px-3 mx-1 items-center gap-3 cursor-pointer w-full h-full rounded-md transition-all duration-200",
                groupColors !== noGroupBgColors
                  ? "border bg-accent"
                  : "border-transparent border-1"
              )}
            >
              <PaintBucket className="h-4 w-4" />
            </div>
          </ToggleGroup>
        </div>

        <p className="text-center text-gray-600 mb-6">
          Type the correct element abbreviations in each box
        </p>

        {/* Legend */}
        <div className="flex flex-wrap gap-3 mb-6 justify-center">
          {groupNames.map((name, i) => (
            <div
              key={name}
              className={`flex items-center gap-2 px-2 py-1 rounded-md shadow-sm cn text-sm text-black`}
              style={{ "--bg": groupColors[i] } as React.CSSProperties}
            >
              <input
                type="color"
                value={groupColors[i]}
                onChange={(e) =>
                  setGroupColors((colors) =>
                    colors.map((c, idx) => (idx === i ? e.target.value : c))
                  )
                }
                className="w-6 h-6 p-[2px] border-none cursor-pointer"
              />
              {name}
            </div>
          ))}
        </div>

        {/* Main Periodic Table */}
        <div className="rounded-xl grid px-4 py-4 justify-items-center items-center overflow-x-auto">
          {mainTable.map((row, rowIdx) => (
            <div className="flex gap-1 mb-1" key={`period-${rowIdx}`}>
              {row.map((symbol, colIdx) => {
                if (symbol === null)
                  return (
                    <div
                      key={`empty-${rowIdx}-${colIdx}`}
                      style={{
                        height: `${size}rem`,
                        width: `${size}rem`,
                      }}
                    />
                  );
                const elementIdx = getElementIndex(symbol);
                const inputValue = userInputs[symbol] || "";
                const borderColor = getBorderColor(symbol, inputValue);

                return (
                  <div
                    key={`${rowIdx}-${colIdx}`}
                    style={
                      {
                        "--bg": groupColors[elementGroups[elementIdx]],
                        height: `${size}rem`,
                        width: `${size}rem`,
                      } as React.CSSProperties
                    }
                    className={`border-2 ${borderColor} cn rounded-lg text-center font-semibold text-black flex items-center justify-center transition-colors duration-300`}
                  >
                    <input
                      id={`input-${symbol}`}
                      type="text"
                      value={inputValue}
                      onChange={(e) =>
                        handleInputChange(symbol, e.target.value)
                      }
                      style={{ fontSize: `${size * 0.3}rem` }}
                      className="w-10 h-10 bg-transparent text-center font-bold focus:outline-none font-mono"
                      maxLength={3}
                      autoComplete="off"
                      onKeyDown={handleMainTableKeyDown(rowIdx, colIdx)}
                    />
                  </div>
                );
              })}
            </div>
          ))}
        </div>

        {/* Lanthanides and Actinides */}
        <div className="mt-6 rounded-xl p-4 overflow-x-auto grid justify-items-center items-center text-black font-mono font-bold">
          <div className="mb-4 ">
            <div className="text-sm text-gray-600 mb-1 ml-2">Lanthanides:</div>
            <div className="flex gap-1">
              {lanthanideSeries.map((symbol, idx) => {
                const elementIdx = getElementIndex(symbol);
                const inputValue = userInputs[symbol] || "";
                const borderColor = getBorderColor(symbol, inputValue);

                return (
                  <div
                    key={`lanthanide-${symbol}`}
                    style={
                      {
                        "--bg": groupColors[elementGroups[elementIdx]],
                        height: `${size}rem`,
                        width: `${size}rem`,
                      } as React.CSSProperties
                    }
                    className={`border-2 cn ${borderColor} rounded-lg w-${size} h-${size} text-center flex items-center justify-center transition-colors duration-300`}
                  >
                    <input
                      id={`input-${symbol}`}
                      type="text"
                      value={inputValue}
                      onChange={(e) =>
                        handleInputChange(symbol, e.target.value)
                      }
                      style={{ fontSize: `${size * 0.3}rem` }}
                      className="w-10 h-10 bg-transparent text-center focus:outline-none"
                      maxLength={3}
                      onKeyDown={handleFBlockKeyDown(
                        lanthanideSeries,
                        idx,
                        "lan"
                      )}
                    />
                  </div>
                );
              })}
            </div>
          </div>

          <div>
            <div className="text-sm text-gray-600 mb-1 ml-2">Actinides:</div>
            <div className="flex gap-1">
              {actinideSeries.map((symbol, idx) => {
                const elementIdx = getElementIndex(symbol);
                const inputValue = userInputs[symbol] || "";
                const borderColor = getBorderColor(symbol, inputValue);

                return (
                  <div
                    key={`actinide-${symbol}`}
                    style={
                      {
                        "--bg": groupColors[elementGroups[elementIdx]],
                        height: `${size}rem`,
                        width: `${size}rem`,
                      } as React.CSSProperties
                    }
                    className={`border-2 cn ${borderColor} rounded-lg w-${size} h-${size} text-center font-semibold flex items-center justify-center transition-colors duration-300`}
                  >
                    <input
                      id={`input-${symbol}`}
                      type="text"
                      value={inputValue}
                      onChange={(e) =>
                        handleInputChange(symbol, e.target.value)
                      }
                      style={{ fontSize: `${size * 0.3}rem` }}
                      className="w-10 h-10 bg-transparent text-center font-semibold focus:outline-none"
                      maxLength={3}
                      onKeyDown={handleFBlockKeyDown(
                        actinideSeries,
                        idx,
                        "act"
                      )}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Progress indicator */}
        <div className="mt-6 p-4 rounded-xl shadow-lg">
          <div className="flex justify-between items-center">
            <span className="text-gray-700 font-medium">Your Progress:</span>
            <span className="text-gray-700 font-medium">
              {
                Object.values(userInputs).filter(
                  (input, i) =>
                    input ===
                    correctAbbreviations[
                      getElementIndex(Object.keys(userInputs)[i])
                    ]
                ).length
              }{" "}
              / 118
            </span>
          </div>
          <div className="mt-2 w-full bg-gray-200 rounded-full h-2.5">
            <div
              className="bg-green-500 h-2.5 rounded-full"
              style={{
                width: `${
                  (Object.values(userInputs).filter(
                    (input, i) =>
                      input ===
                      correctAbbreviations[
                        getElementIndex(Object.keys(userInputs)[i])
                      ]
                  ).length /
                    118) *
                  100
                }%`,
              }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PeriodicTable;
