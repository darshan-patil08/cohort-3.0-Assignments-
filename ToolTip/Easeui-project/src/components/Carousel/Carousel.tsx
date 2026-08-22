import React, { useRef, useState, useEffect, useCallback } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/libs/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";
import gsap from "gsap";

const carouselVariants = cva("relative w-full overflow-hidden rounded-xl", {
  variants: {
    variant: {
      default: "bg-gray-100 dark:bg-zinc-800",
      dark: "bg-zinc-900",
      bordered: "border-2 border-gray-200 dark:border-zinc-700 bg-transparent",
    },
    size: {
      sm: "h-48",
      md: "h-72",
      lg: "h-96",
      xl: "h-[28rem]",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "md",
  },
});

export interface CarouselSlide {
  image?: string;
  title?: string;
  description?: string;
}

interface CarouselProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof carouselVariants> {
  slides: CarouselSlide[];
  autoPlay?: boolean;
  autoPlayInterval?: number;
  showDots?: boolean;
  showArrows?: boolean;
}

const Carousel = React.forwardRef<HTMLDivElement, CarouselProps>(
  (
    {
      slides,
      variant,
      size,
      autoPlay = false,
      autoPlayInterval = 3000,
      showDots = true,
      showArrows = true,
      className,
      ...props
    },
    ref
  ) => {
    const [current, setCurrent] = useState(0);
    const trackRef = useRef<HTMLDivElement | null>(null);
    const isAnimating = useRef(false);

    const goTo = useCallback(
      (index: number) => {
        if (isAnimating.current) return;
        const next = (index + slides.length) % slides.length;
        isAnimating.current = true;

        const direction = next > current ? -1 : 1;

        gsap.to(trackRef.current, {
          x: `${direction * 30}px`,
          opacity: 0,
          duration: 0.2,
          ease: "power2.in",
          onComplete: () => {
            setCurrent(next);
            gsap.fromTo(
              trackRef.current,
              { x: `${-direction * 30}px`, opacity: 0 },
              {
                x: "0px",
                opacity: 1,
                duration: 0.25,
                ease: "power2.out",
                onComplete: () => {
                  isAnimating.current = false;
                },
              }
            );
          },
        });
      },
      [current, slides.length]
    );

    const prev = () => goTo(current - 1);
    const next = () => goTo(current + 1);

    useEffect(() => {
      if (!autoPlay) return;
      const id = setInterval(() => goTo(current + 1), autoPlayInterval);
      return () => clearInterval(id);
    }, [autoPlay, autoPlayInterval, current, goTo]);

    const slide = slides[current];

    return (
      <div
        ref={ref}
        className={cn(carouselVariants({ variant, size }), className)}
        {...props}
      >
        {/* slide content */}
        <div ref={trackRef} className="w-full h-full">
          {slide.image && (
            <img
              src={slide.image}
              alt={slide.title || `Slide ${current + 1}`}
              className="w-full h-full object-cover"
            />
          )}

          {(slide.title || slide.description) && (
            <div className="absolute bottom-0 left-0 right-0 px-6 py-4 bg-gradient-to-t from-black/70 to-transparent">
              {slide.title && (
                <h3 className="text-white font-semibold text-lg leading-tight">
                  {slide.title}
                </h3>
              )}
              {slide.description && (
                <p className="text-gray-300 text-sm mt-1">{slide.description}</p>
              )}
            </div>
          )}
        </div>

        {/* prev / next buttons */}
        {showArrows && slides.length > 1 && (
          <>
            <button
              onClick={prev}
              className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 flex items-center justify-center bg-black/40 hover:bg-black/60 rounded-full text-white transition-colors"
              aria-label="Previous slide"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={next}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 flex items-center justify-center bg-black/40 hover:bg-black/60 rounded-full text-white transition-colors"
              aria-label="Next slide"
            >
              <ChevronRight size={18} />
            </button>
          </>
        )}

        {/* dot indicators */}
        {showDots && slides.length > 1 && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                className={`w-2 h-2 rounded-full transition-all duration-200 ${
                  i === current
                    ? "bg-white w-5"
                    : "bg-white/50 hover:bg-white/70"
                }`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    );
  }
);

Carousel.displayName = "Carousel";
export { Carousel, carouselVariants };
