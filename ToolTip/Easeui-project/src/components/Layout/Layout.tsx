import React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/libs/utils";

const layoutVariants = cva("w-full", {
  variants: {
    variant: {
      centered: "max-w-4xl mx-auto px-6",
      full: "w-full px-0",
      container: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",
      narrow: "max-w-2xl mx-auto px-6",
    },
    padding: {
      none: "py-0",
      sm: "py-6",
      md: "py-10",
      lg: "py-16",
      xl: "py-24",
    },
    direction: {
      column: "flex flex-col",
      row: "flex flex-row flex-wrap",
      grid2: "grid grid-cols-1 sm:grid-cols-2 gap-6",
      grid3: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6",
    },
  },
  defaultVariants: {
    variant: "centered",
    padding: "md",
    direction: "column",
  },
});

interface LayoutProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof layoutVariants> {
  asChild?: boolean;
  gap?: number;
}

const Layout = React.forwardRef<HTMLDivElement, LayoutProps>(
  (
    {
      asChild = false,
      variant,
      padding,
      direction,
      gap,
      children,
      className,
      style,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : "div";

    return (
      <Comp
        ref={ref}
        className={cn(layoutVariants({ variant, padding, direction }), className)}
        style={{ gap: gap ? `${gap}px` : undefined, ...style }}
        {...props}
      >
        {children}
      </Comp>
    );
  }
);

Layout.displayName = "Layout";
export { Layout, layoutVariants };
