import React, { useRef, useState } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/libs/utils";
import gsap from "gsap";

const tooltipVariants = cva(
  "absolute z-50 px-3 py-1.5 text-xs font-medium rounded-md pointer-events-none whitespace-nowrap",
  {
    variants: {
      variant: {
        dark: "bg-zinc-900 text-white",
        light: "bg-white text-gray-800 border border-gray-200 shadow-md",
        primary: "bg-indigo-600 text-white",
        danger: "bg-red-600 text-white",
      },
    },
    defaultVariants: {
      variant: "dark",
    },
  }
);

interface TooltipProps extends VariantProps<typeof tooltipVariants> {
  content: string;
  position?: "top" | "bottom" | "left" | "right";
  delay?: number;
  children: React.ReactNode;
  className?: string;
}

const positionClasses = {
  top: "bottom-full left-1/2 -translate-x-1/2 mb-2",
  bottom: "top-full left-1/2 -translate-x-1/2 mt-2",
  left: "right-full top-1/2 -translate-y-1/2 mr-2",
  right: "left-full top-1/2 -translate-y-1/2 ml-2",
};

const arrowClasses = {
  top: "top-full left-1/2 -translate-x-1/2 border-t-zinc-900",
  bottom: "bottom-full left-1/2 -translate-x-1/2 border-b-zinc-900",
  left: "left-full top-1/2 -translate-y-1/2 border-l-zinc-900",
  right: "right-full top-1/2 -translate-y-1/2 border-r-zinc-900",
};

const Tooltip = ({
  content,
  position = "top",
  delay = 0,
  variant,
  children,
  className,
}: TooltipProps) => {
  const [visible, setVisible] = useState(false);
  const tooltipRef = useRef<HTMLDivElement | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const showTooltip = () => {
    timerRef.current = setTimeout(() => {
      setVisible(true);
      if (tooltipRef.current) {
        gsap.fromTo(
          tooltipRef.current,
          { opacity: 0, scale: 0.85, y: position === "top" ? 4 : position === "bottom" ? -4 : 0 },
          { opacity: 1, scale: 1, y: 0, duration: 0.2, ease: "back.out(1.5)" }
        );
      }
    }, delay);
  };

  const hideTooltip = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    if (tooltipRef.current) {
      gsap.to(tooltipRef.current, {
        opacity: 0,
        scale: 0.85,
        duration: 0.15,
        ease: "power2.in",
        onComplete: () => setVisible(false),
      });
    } else {
      setVisible(false);
    }
  };

  return (
    <div
      className="relative inline-flex"
      onMouseEnter={showTooltip}
      onMouseLeave={hideTooltip}
    >
      {children}

      {visible && (
        <div
          ref={tooltipRef}
          className={cn(tooltipVariants({ variant }), positionClasses[position], className)}
        >
          {content}
          {/* small arrow */}
          <span
            className={cn(
              "absolute w-0 h-0 border-4 border-transparent",
              position === "top" && "top-full left-1/2 -translate-x-1/2 border-t-current",
              position === "bottom" && "bottom-full left-1/2 -translate-x-1/2 border-b-current",
              position === "left" && "left-full top-1/2 -translate-y-1/2 border-l-current",
              position === "right" && "right-full top-1/2 -translate-y-1/2 border-r-current"
            )}
          />
        </div>
      )}
    </div>
  );
};

Tooltip.displayName = "Tooltip";
export { Tooltip, tooltipVariants };
