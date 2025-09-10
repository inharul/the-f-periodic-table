import { useAtomValue } from "jotai/react";
import {
  actinideSeries,
  elementGroups,
  lanthanideSeries,
  mainTable,
  noGroupBgColors,
} from "./data";
import { elementFontSize } from "./global";
import {
  getElementIndex,
  getBorderColor,
  handleMainTableKeyDown,
  handleFBlockKeyDown,
} from "./lib/helpers";
import type React from "react";

interface TableProps {
  groupColors: string[];
  handleInputChange: (symbol: string, value: string) => void;
  userInputs: Record<string, string>;
  inputRefs: React.RefObject<Record<string, HTMLInputElement | null>>;
}

const Table = ({
  groupColors,
  handleInputChange,
  userInputs,
  inputRefs,
}: TableProps) => {
  const size = useAtomValue(elementFontSize);
  const fontColor =
    groupColors === noGroupBgColors ? "dark:text-white" : "dark:text-black";

  return (
    <>
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
                  className={`border-2 ${borderColor} ${fontColor} cn rounded-lg text-center font-semibold text-black flex items-center justify-center transition-colors duration-300`}
                >
                  <input
                    ref={(el) => {
                      inputRefs.current[symbol] = el;
                    }}
                    id={`input-${symbol}`}
                    type="text"
                    value={inputValue}
                    onChange={(e) => handleInputChange(symbol, e.target.value)}
                    style={{ fontSize: `${size * 0.3}rem` }}
                    className="w-10 h-10 bg-transparent text-center font-bold focus:outline-none font-mono"
                    maxLength={2}
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
                  className={`border-2 cn ${borderColor} ${fontColor} rounded-lg w-${size} h-${size} text-center flex items-center justify-center transition-colors duration-300`}
                >
                  <input
                    ref={(el) => {
                      inputRefs.current[symbol] = el;
                    }}
                    id={`input-${symbol}`}
                    type="text"
                    autoComplete="off"
                    value={inputValue}
                    onChange={(e) => handleInputChange(symbol, e.target.value)}
                    style={{ fontSize: `${size * 0.3}rem` }}
                    className="w-10 h-10 bg-transparent text-center focus:outline-none"
                    maxLength={2}
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
                  className={`border-2 cn ${borderColor} ${fontColor} rounded-lg w-${size} h-${size} text-center font-semibold flex items-center justify-center transition-colors duration-300`}
                >
                  <input
                    ref={(el) => {
                      inputRefs.current[symbol] = el;
                    }}
                    id={`input-${symbol}`}
                    type="text"
                    value={inputValue}
                    onChange={(e) => handleInputChange(symbol, e.target.value)}
                    style={{ fontSize: `${size * 0.3}rem` }}
                    className="w-10 h-10 bg-transparent text-center font-semibold focus:outline-none"
                    maxLength={2}
                    autoComplete="off"
                    onKeyDown={handleFBlockKeyDown(actinideSeries, idx, "act")}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default Table;
