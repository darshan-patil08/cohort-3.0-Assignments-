import React, { useRef, useEffect } from "react";
import { Input, type InputProps } from "./Input";
import { cn } from "@/libs/utils";

type Props = InputProps & {
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
};

export const InputWithIcon = React.forwardRef<HTMLInputElement, Props>(
  ({ icon, iconPosition = "left", className, label, ...props }, ref) => {
    const wrapperRef = useRef<HTMLDivElement | null>(null);
    const iconRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
      if (!iconRef.current || !wrapperRef.current) return;
      const input = wrapperRef.current.querySelector("input");

      const handleFocus = () => {
        if (iconRef.current) {
          iconRef.current.style.color = "#3b82f6";
          iconRef.current.style.transform = "scale(1.1)";
        }
      };
      const handleBlur = () => {
        if (iconRef.current) {
          iconRef.current.style.color = "";
          iconRef.current.style.transform = "scale(1)";
        }
      };

      input?.addEventListener("focus", handleFocus);
      input?.addEventListener("blur", handleBlur);

      return () => {
        input?.removeEventListener("focus", handleFocus);
        input?.removeEventListener("blur", handleBlur);
      };
    }, []);

    const paddingClass =
      icon ? (iconPosition === "left" ? "pl-10" : "pr-10") : "";

    return (
      <div ref={wrapperRef} className="flex flex-col gap-1 w-full">
        {label && (
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
            {label}
          </label>
        )}

        <div className="relative">
          {icon && iconPosition === "left" && (
            <div
              ref={iconRef}
              className="absolute left-3 inset-y-0 flex items-center pointer-events-none text-gray-400 dark:text-gray-500 transition-colors duration-200"
              style={{ transformOrigin: "center" }}
            >
              {icon}
            </div>
          )}

          <Input
            ref={ref}
            label={undefined}
            {...props}
            className={cn(paddingClass, className)}
          />

          {icon && iconPosition === "right" && (
            <div
              ref={iconRef}
              className="absolute right-3 inset-y-0 flex items-center pointer-events-none text-gray-400 dark:text-gray-500 transition-colors duration-200"
              style={{ transformOrigin: "center" }}
            >
              {icon}
            </div>
          )}
        </div>
      </div>
    );
  }
);

InputWithIcon.displayName = "InputWithIcon";
