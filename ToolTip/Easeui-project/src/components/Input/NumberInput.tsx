import React from "react";
import { Input, type InputProps } from "./Input";

type NumberProps = Omit<InputProps, "type" | "onChange"> & {
  onChange?: (value: number) => void;
  step?: number;
  min?: number;
  max?: number;
};

export const NumberInput = React.forwardRef<HTMLInputElement, NumberProps>(
  ({ onChange, step = 1, min, max, ...props }, ref) => {
    const handleInc = () => {
      const cur = Number((ref as any)?.current?.value || props.value || 0);
      const next = cur + step;
      if (max !== undefined && next > max) return;
      onChange?.(next);
    };
    const handleDec = () => {
      const cur = Number((ref as any)?.current?.value || props.value || 0);
      const next = cur - step;
      if (min !== undefined && next < min) return;
      onChange?.(next);
    };

    return (
      <div className="flex items-stretch gap-2">
        <div className="flex-1">
          <Input {...(props as any)} ref={ref} type="number" />
        </div>
        <div className="flex flex-col gap-1">
          <button
            type="button"
            onClick={handleInc}
            className="px-3 py-1 bg-gray-100 dark:bg-zinc-700 text-gray-800 dark:text-gray-100 hover:bg-gray-200 dark:hover:bg-zinc-600 rounded transition-colors text-sm font-medium"
          >
            +
          </button>
          <button
            type="button"
            onClick={handleDec}
            className="px-3 py-1 bg-gray-100 dark:bg-zinc-700 text-gray-800 dark:text-gray-100 hover:bg-gray-200 dark:hover:bg-zinc-600 rounded transition-colors text-sm font-medium"
          >
            −
          </button>
        </div>
      </div>
    );
  }
);
NumberInput.displayName = "NumberInput";
