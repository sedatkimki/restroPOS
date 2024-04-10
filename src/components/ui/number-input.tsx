import { Minus, Plus } from "lucide-react";
import { FC } from "react";

import { Button } from "./button";

type NumberInputProps = {
  onChange: (value: number) => void;
  value: number;
  max?: number;
  min?: number;
};

export const NumberInput: FC<NumberInputProps> = ({
  onChange,
  value = 0,
  min,
  max,
}) => {
  return (
    <div className="flex gap-2">
      <Button
        variant="outline"
        size="icon"
        className="h-6 w-6 shrink-0 rounded-md"
        onClick={() => onChange(value - 1)}
        disabled={min !== undefined && value <= min}
      >
        <Minus className="h-4 w-4" />
        <span className="sr-only">Decrease</span>
      </Button>
      <div className="text-center">
        <div className="text-md font-bold tracking-tighter">{value}</div>
      </div>
      <Button
        variant="outline"
        size="icon"
        className="h-6 w-6 shrink-0 rounded-md"
        onClick={() => onChange(value + 1)}
        disabled={max !== undefined && value >= max}
      >
        <Plus className="h-4 w-4" />
        <span className="sr-only">Increase</span>
      </Button>
    </div>
  );
};
