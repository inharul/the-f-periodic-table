import { AArrowUp } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type ModeSizeProps = {
  size: number;
  setSize: React.Dispatch<React.SetStateAction<number>>;
};

export const ModeSize = ({ setSize }: ModeSizeProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" className="w-10 cursor-pointer">
          <AArrowUp className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setSize(4)}>smol</DropdownMenuItem>
        <DropdownMenuItem onClick={() => setSize(4.5)}>
          Standard
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setSize(5)}>THICC</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
