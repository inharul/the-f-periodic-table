import {
  DialogClose,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";

import noob from "@/assets/noob.png";
import pro1 from "@/assets/pro-1.png";
import pro2 from "@/assets/pro-2.png";
import pro3 from "@/assets/pro-3.png";
import monster from "@/assets/lvl-monster.png";

import check from "@/assets/spell-check.png";
import colors from "@/assets/spell-colors.png";

import { useAtom, useSetAtom } from "jotai";
import { durationAtom, selectedLevel } from "@/global";
import { useState, useEffect } from "react";
import { BorderTrail } from "./ui/borderTrail";
import { TextShimmer } from "./ui/textShimmer";
import { cn } from "@/lib/utils";
import { timeAtom } from "@/machine";

const proLevels = ["pro-1", "pro-2", "pro-3"] as const;
type ProLevel = (typeof proLevels)[number];
const imageMap: Record<ProLevel, string> = {
  "pro-1": pro1,
  "pro-2": pro2,
  "pro-3": pro3,
};
const labelMap: Record<ProLevel, string> = {
  "pro-1": "Pro 1",
  "pro-2": "Pro 2",
  "pro-3": "Pro 3",
};

const modeDurationMap: Record<string, number> = {
  noob: 0,
  "pro-1": 5 * 60,
  "pro-2": 3 * 60,
  "pro-3": 2 * 60,
  monster: 60,
};

export const Levels = () => {
  const [chosenLevel, setChosenLevel] = useAtom(selectedLevel);
  const [proLevel, setProLevel] = useState<ProLevel>("pro-1");

  const setDuration = useSetAtom(durationAtom);

  const send = useSetAtom(timeAtom);
  useEffect(() => {
    if (proLevels.includes(chosenLevel as ProLevel)) {
      setProLevel(chosenLevel as ProLevel);
    }
  }, [chosenLevel]);

  return (
    <>
      <DialogHeader>
        <DialogTitle className="text-center pixel">Level Selection</DialogTitle>
        <DialogDescription className="font-mono">
          Select a level according to your aura. You can equip some spells if
          you need additional help in some levels.
        </DialogDescription>
      </DialogHeader>
      <div className="grid grid-cols-4 p-8 w-full h-[70vh] gap-5 place-items-center">
        <Level
          name="noob"
          badge={noob}
          title="Noob"
          description="More like a practice mode"
        />

        {/* SPECIAL PRO LEVEL DISPLAY */}
        <div className="h-full w-full">
          <div
            className={cn(
              "h-[80%] w-full hover:border-muted-foreground border rounded-sm border-transparent ease-out duration-300",
              chosenLevel != "monster" && chosenLevel != "noob" ? "p-0" : "p-3"
            )}
            onClick={() => setChosenLevel(proLevel)}
          >
            <div
              className="relative w-full h-full rounded-sm dark:bg-[#2e2e2e3b] bg-[#2e2e2e17]
        grid place-items-center grid-rows-[20%_5%_5%]
        cursor-pointer"
            >
              {chosenLevel != "monster" && chosenLevel != "noob" && (
                <BorderTrail
                  style={{
                    boxShadow:
                      "0px 0px 60px 30px rgb(255 255 255 / 50%), 0 0 100px 60px rgb(0 0 0 / 50%), 0 0 140px 90px rgb(0 0 0 / 50%)",
                  }}
                  size={200}
                />
              )}
              <img
                src={imageMap[proLevel]}
                className="size-12"
                alt={proLevel}
              />
              <h4 className="pixel">{labelMap[proLevel]}</h4>
              <p className="font-mono text-muted-foreground text-sm"></p>
            </div>
          </div>
          <div className="w-full h-[20%] py-3 flex justify-center">
            <div
              className="w-[80%] h-full rounded-sm dark:bg-[#2e2e2e3b] bg-[#2e2e2e17] mt-2
            grid grid-cols-3 place-items-center gap-1 z-100"
            >
              <img
                src={pro1}
                alt="pro-1"
                className="cursor-pointer hover:scale-150 ease-in-out duration-300"
                onClick={() => setChosenLevel("pro-1")}
              />
              <img
                src={pro2}
                alt="pro-2"
                className="cursor-pointer hover:scale-150 ease-in-out duration-300 opacity-20"
                onClick={() => setChosenLevel("pro-2")}
              />
              <img
                src={pro3}
                alt="pro-3"
                className="cursor-pointer hover:scale-150 ease-in-out duration-300 opacity-20"
                onClick={() => setChosenLevel("pro-3")}
              />
            </div>
          </div>
        </div>

        <Level
          name="monster"
          badge={monster}
          title="MONSTER"
          description="Feel like a monster."
        />

        {/* SPELLS */}
        <div className="w-[20rem] h-full grid grid-rows-3 gap-2 place-items-center font-mono">
          <p>Spells</p>
          <img src={check} alt="Check Spell" />
          <img src={colors} alt="Color Spell" />
        </div>
      </div>
      <DialogFooter>
        <DialogClose asChild>
          <TextShimmer
            className="pixel text-2xl cursor-pointer"
            onClick={() => {
              setDuration(
                chosenLevel
                  ? modeDurationMap[chosenLevel]
                  : modeDurationMap["pro-1"]
              );
              send({ type: "RESET" });
              send({ type: "START" });
            }}
          >
            {chosenLevel == "monster" ? "SLAUGHTER." : "Start"}
          </TextShimmer>
        </DialogClose>
      </DialogFooter>
    </>
  );
};

interface LevelProps {
  badge: string;
  title: string;
  name: "noob" | "monster";
  description: string;
}

const Level = ({ name, badge, title, description }: LevelProps) => {
  const [chosenLevel, setChosenLevel] = useAtom(selectedLevel);
  return (
    <div
      className={cn(
        "h-full w-full hover:border-muted-foreground border rounded-sm border-transparent ease-out duration-300",
        chosenLevel == name ? "p-0" : "p-3"
      )}
      onClick={() => setChosenLevel(name)}
    >
      <div
        className="relative w-full h-full rounded-sm dark:bg-[#2e2e2e3b] bg-[#2e2e2e17]
        grid place-items-center grid-rows-[20%_5%_5%]
        cursor-pointer"
      >
        {chosenLevel == name && (
          <BorderTrail
            style={{
              boxShadow:
                "0px 0px 60px 30px rgb(255 255 255 / 50%), 0 0 100px 60px rgb(0 0 0 / 50%), 0 0 140px 90px rgb(0 0 0 / 50%)",
            }}
            size={200}
          />
        )}
        <img src={badge} className="size-12" alt="monster" />
        <h4 className="pixel">{title}</h4>
        <p className="font-mono text-muted-foreground text-sm">{description}</p>
      </div>
    </div>
  );
};
