import { useState } from "react";
import React from "react";
import { ModeToggle } from "./components/toggle-theme";
import { ModeSize } from "./components/toggle-size";
import "./App.css";
import { ToggleGroup } from "./components/ui/toggle-group";
import { CheckLine, PaintBucket, SquareDashed } from "lucide-react";
import { cn, formatCountdown } from "./lib/utils";
import { Progress } from "./components/ui/progress";

import {
  correctAbbreviations,
  groupBgColors,
  groupNames,
  noGroupBgColors,
} from "./data";

import { durationAtom, isBorderAtom, nakedAtom } from "./global";

import { useAtom, useAtomValue } from "jotai";
import { timeAtom } from "./machine";
import { Dialog, DialogContent, DialogTrigger } from "./components/ui/dialog";
import { Levels } from "./components/Levels";
import { useTheme } from "./components/theme-provider";
import { TextRoll } from "./components/ui/textShimmer";
import { motion, AnimatePresence } from "motion/react";
import { getElementIndex, registerInputRefs } from "./lib/helpers";
import Table from "./Table";
import { Rnd } from "react-rnd";

const PeriodicTable = () => {
  // Create a state to track user inputs for all elements
  const [userInputs, setUserInputs] = useState<Record<string, string>>({});
  const inputRefs = React.useRef<Record<string, HTMLInputElement | null>>({});

  React.useEffect(() => {
    registerInputRefs(inputRefs);
    inputRefs.current["H"]?.focus();
  }, []);

  const [groupColors, setGroupColors] = useState(groupBgColors);

  const [isBorder, setIsBorder] = useAtom(isBorderAtom);
  const [naked, setNaked] = useAtom(nakedAtom);

  const [state, send] = useAtom(timeAtom);
  const duration = useAtomValue(durationAtom);

  const fontColor =
    groupColors === noGroupBgColors ? "dark:text-white" : "dark:text-black";

  // Function to handle input change
  const handleInputChange = (symbol: string, value: string) => {
    const capitalizedValue = value.charAt(0).toUpperCase() + value.slice(1);
    setUserInputs({
      ...userInputs,
      [symbol]: capitalizedValue,
    });
  };

  const { theme } = useTheme();
  const [completedIntroduction, setIntroduction] = useState(false);

  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      {state.value == "completed" && (
        <div className="fixed bg-white/50 h-screen w-screen grid place-items-center z-40">
          <Rnd
            default={{
              x: 0,
              y: 0,
              width: 320,
              height: 200,
            }}
            bounds="window"
            className="bg-white ring rounded-2xl z-50 absolute"
            dragHandleClassName="handle"
          >
            <div className="w-full bg-white/20 handle h-10"></div>
            rand
          </Rnd>
        </div>
      )}
      <div className="w-full text-center h-10 py-2">
        <AnimatePresence>
          {!completedIntroduction && (
            <motion.div
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
            >
              <TextRoll
                className="text-lg pixel text-black dark:text-white"
                onAnimationComplete={() =>
                  setIntroduction(!completedIntroduction)
                }
              >
                The fucking Periodc Table
              </TextRoll>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <div className="w-full mx-auto">
        {/* Header */}
        <h1 className="text-3xl font-bold font-mono text-center text-gray-800 mb-6">
          {formatCountdown(duration, state.context.elapsed)} {state.value}
          <button
            onClick={() =>
              send({ type: state.value == "paused" ? "START" : "STOP" })
            }
          >
            click
          </button>
          <Dialog>
            <DialogTrigger>Open</DialogTrigger>
            <DialogContent
              className={cn(
                " w-[90vw]",
                theme == "dark" ? "shadow-6" : "shadow-none"
              )}
              onCloseAutoFocus={(e) => {
                e.preventDefault();
                inputRefs.current["Th"]?.focus();
              }}
            >
              <Levels />
            </DialogContent>
          </Dialog>
        </h1>
        <div className="flex flex-row-reverse gap-3 mr-10">
          <ModeToggle />
          <ModeSize />

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
          <div className="flex justify-center items-center w-full gap-4">
            <span className="dark:text-white light:text-white text-sm font-mono">
              {
                Object.values(userInputs).filter(
                  (input, i) =>
                    input ===
                    correctAbbreviations[
                      getElementIndex(Object.keys(userInputs)[i])
                    ]
                ).length
              }
              {` / 118`}
            </span>
            <Progress
              className="w-[85%]"
              value={
                Object.values(userInputs).filter(
                  (input, i) =>
                    input ===
                    correctAbbreviations[
                      getElementIndex(Object.keys(userInputs)[i])
                    ]
                ).length
              }
              max={118}
            />
          </div>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap gap-3 mt-6 mb-6 justify-center">
          {groupNames.map((name, i) => (
            <div
              key={name}
              className={`flex items-center gap-2 px-2 py-1 rounded-md shadow-sm cn text-sm ${fontColor} transition-colors duration-300`}
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
        <Table
          groupColors={groupColors}
          handleInputChange={handleInputChange}
          userInputs={userInputs}
          inputRefs={inputRefs}
        />

        {/* Progress indicator */}
        <div className="mt-6 p-4 rounded-xl shadow-lg"></div>
      </div>
    </div>
  );
};

export default PeriodicTable;
