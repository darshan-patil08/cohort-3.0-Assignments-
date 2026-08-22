import React, { useState } from "react";
import { Input, type InputProps } from "./Input";
import { cn } from "@/libs/utils";
import { Eye, EyeOff } from "lucide-react";

type Props = Omit<InputProps, "type">;

export const PasswordInput = React.forwardRef<HTMLInputElement, Props>(
  (props, ref) => {
    const [show, setShow] = useState(false);

    return (
      // wrapping in form stops the browser "not contained in a form" warning
      <form onSubmit={(e) => e.preventDefault()} className="w-full">
        <div className="relative w-full">
          <Input
            {...props}
            ref={ref}
            type={show ? "text" : "password"}
            className={cn("pr-10", props.className)}
          />
          <button
            type="button"
            aria-label={show ? "Hide password" : "Show password"}
            onClick={() => setShow((s) => !s)}
            className="absolute right-3 inset-y-0 my-auto h-fit p-1 rounded text-gray-400 dark:text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
            style={{ top: props.label ? "calc(50% + 11px)" : "50%", transform: "translateY(-50%)" }}
          >
            {show ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>
      </form>
    );
  }
);
PasswordInput.displayName = "PasswordInput";
