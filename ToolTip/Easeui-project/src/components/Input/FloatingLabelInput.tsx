import React, { useState } from "react";
import { cn } from "@/libs/utils";
import { cva } from "class-variance-authority";

const wrapper = cva("relative w-full");
const inputCls = cva(
  "w-full bg-transparent border-b border-gray-400 dark:border-zinc-600 pb-2 pt-6 focus:outline-none focus:border-blue-500 dark:focus:border-blue-400 transition-all text-gray-900 dark:text-gray-100",
  {
    variants: {
      size: {
        sm: "text-sm",
        md: "text-base",
        lg: "text-lg",
      },
    },
    defaultVariants: { size: "md" },
  }
);

export interface FloatingLabelProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  label: string;
  size?: "sm" | "md" | "lg";
}

export const FloatingLabelInput = React.forwardRef<
  HTMLInputElement,
  FloatingLabelProps
>(({ label, size = "md", className, ...props }, ref) => {
  const [focused, setFocused] = useState(false);
  const filled = !!(props.value ?? props.defaultValue);
  const shrink = focused || filled;
  return (
    <div className={wrapper()}>
      <input
        ref={ref}
        {...props}
        onFocus={(e) => {
          setFocused(true);
          props.onFocus?.(e);
        }}
        onBlur={(e) => {
          setFocused(false);
          props.onBlur?.(e);
        }}
        className={cn(inputCls({ size }), className)}
      />
      <label
        className={cn(
          "absolute left-0 top-2 origin-left pointer-events-none transform transition-all",
          shrink
            ? "-translate-y-4 scale-75 text-blue-500 dark:text-blue-400"
            : "translate-y-0 scale-100 text-gray-400 dark:text-gray-500"
        )}
      >
        {label}
      </label>
    </div>
  );
});
FloatingLabelInput.displayName = "FloatingLabelInput";
