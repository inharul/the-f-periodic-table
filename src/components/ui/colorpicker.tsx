import { forwardRef, useMemo, useState } from "react";
import { HexColorPicker } from "react-colorful";
import { cn } from "@/lib/utils";
import { useForwardedRef } from "@/lib/use-forward-ref";
import type { buttonVariants } from "@/components/ui/button";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import type { VariantProps } from "class-variance-authority";

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}
interface ColorPickerProps {
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
}

const ColorPicker = forwardRef<
  HTMLInputElement,
  Omit<ButtonProps, "value" | "onChange" | "onBlur"> & ColorPickerProps
>(
  (
    { disabled, value, onChange, onBlur, name, className, ...props },
    forwardedRef
  ) => {
    const ref = useForwardedRef(forwardedRef);
    const [open, setOpen] = useState(false);

    const parsedValue = useMemo(() => {
      return value || "#FFFFFF";
    }, [value]);

    return (
      <Popover onOpenChange={setOpen} open={open}>
        <PopoverTrigger asChild disabled={disabled} onBlur={onBlur}>
          <Button
            {...props}
            className={cn("block", className, "grid justify-items-center")}
            name={name}
            onClick={() => {
              setOpen(true);
            }}
            size="icon"
            style={{
              backgroundColor: parsedValue,
            }}
            variant="outline"
          >
            <div />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full">
          <HexColorPicker color={parsedValue} onChange={onChange} />
          <Input
            maxLength={7}
            onChange={(e: { currentTarget: { value: string } }) => {
              onChange(e?.currentTarget?.value);
            }}
            ref={ref}
            value={parsedValue}
          />
        </PopoverContent>
      </Popover>
    );
  }
);
ColorPicker.displayName = "ColorPicker";

export { ColorPicker };
