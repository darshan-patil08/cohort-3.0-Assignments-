import { Carousel } from "@/components/Carousel";
import type { CarouselSlide } from "@/components/Carousel";
import ComponentDemo from "../ComponentsDemo";
import PropsTable from "@/components/Personal/PropsTable";

const travelSlides: CarouselSlide[] = [
  {
    image: "https://i.pinimg.com/1200x/f2/36/a2/f236a27daa7d5b774cef01a96f246d37.jpg",
    title: "Santorini, Greece",
    description: "White-washed buildings overlooking the Aegean Sea",
  },
  {
    image: "https://i.pinimg.com/736x/3f/91/ca/3f91ca5bb89f9980f7840350224bb393.jpg",
    title: "Kyoto, Japan",
    description: "Ancient temples surrounded by cherry blossoms",
  },
  {
    image: "https://i.pinimg.com/1200x/e6/5b/f2/e65bf21c976ed9cf2f6f8cc0fbeb802d.jpg",
    title: "Amalfi Coast, Italy",
    description: "Dramatic cliffs and turquoise Mediterranean waters",
  },
];

const autoPlaySlides: CarouselSlide[] = [
  {
    image: "https://i.pinimg.com/1200x/b5/31/25/b531258b000970f686f4508b1cb51736.jpg",
    title: "City Lights",
    description: "Urban glow at night",
  },
  {
    image: "https://i.pinimg.com/236x/30/db/ff/30dbff3089d4f9de0895471adbe67938.jpg",
    title: "Desert Dunes",
    description: "Sand sculpted by the wind",
  },
  {
    image: "https://i.pinimg.com/736x/93/15/50/931550f3149ce8d40111b2fcb1c1e2c0.jpg",
    title: "Lavender Fields",
    description: "Purple stretching to the horizon",
  },
];

const minimalSlides: CarouselSlide[] = [
  {
    image: "https://i.pinimg.com/1200x/e4/1a/db/e41adb97090971c777698c72ac6d7834.jpg",
    title: "Mountain Sunrise",
    description: "Golden hour over the peaks",
  },
  {
    image: "https://i.pinimg.com/1200x/72/4c/5c/724c5c646e2f685a527f1ca93524701c.jpg",
    title: "Ocean Calm",
    description: "Peaceful waters at dusk",
  },
  {
    image: "https://i.pinimg.com/1200x/f3/9f/4b/f39f4bf5b2ecd682e370eeae413d43b3.jpg",
    title: "Forest Path",
    description: "A quiet walk through the trees",
  },
];

const CarouselPage = () => {
  const basicCode = `import { Carousel } from "@/components/Carousel";

const slides = [
  {
    image: "https://i.pinimg.com/1200x/f2/36/a2/f236a27daa7d5b774cef01a96f246d37.jpg",
    title: "Santorini, Greece",
    description: "White-washed buildings overlooking the Aegean Sea",
  },
  // ...more slides
];

<Carousel slides={slides} size="lg" />`;

  const autoPlayCode = `<Carousel
  slides={slides}
  size="md"
  autoPlay
  autoPlayInterval={2500}
/>`;

  const variantsCode = `{/* bordered variant */}
<Carousel slides={slides} variant="bordered" size="md" />

{/* dark variant */}
<Carousel slides={slides} variant="dark" size="md" />`;

  const noControlsCode = `<Carousel
  slides={slides}
  size="sm"
  autoPlay
  showArrows={false}
  showDots={false}
/>`;

  const propsData = [
    {
      prop: "slides",
      type: "CarouselSlide[]",
      default: "-",
      description: "Array of slide objects — each can have image, title, and description",
    },
    {
      prop: "variant",
      type: '"default" | "dark" | "bordered"',
      default: '"default"',
      description: "Background style of the carousel container",
    },
    {
      prop: "size",
      type: '"sm" | "md" | "lg" | "xl"',
      default: '"md"',
      description: "Height of the carousel",
    },
    {
      prop: "autoPlay",
      type: "boolean",
      default: "false",
      description: "Automatically advances slides on a set interval",
    },
    {
      prop: "autoPlayInterval",
      type: "number",
      default: "3000",
      description: "Milliseconds between auto-play slide changes",
    },
    {
      prop: "showDots",
      type: "boolean",
      default: "true",
      description: "Show clickable dot indicators at the bottom",
    },
    {
      prop: "showArrows",
      type: "boolean",
      default: "true",
      description: "Show previous and next arrow buttons",
    },
    {
      prop: "className",
      type: "string",
      default: "-",
      description: "Additional classes applied to the wrapper element",
    },
  ];

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-12">
      <header className="space-y-2">
        <h1 className="text-4xl font-bold tracking-tight" style={{ color: "var(--text-color)" }}>
          Carousel
        </h1>
        <p className="text-lg text-gray-700 dark:text-gray-400">
          A smooth image carousel with GSAP transitions, auto-play, dot indicators, and arrow navigation.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Usage</h2>
        <ComponentDemo code={basicCode}>
          <div className="w-full max-w-xl">
            <Carousel slides={travelSlides} size="lg" />
          </div>
        </ComponentDemo>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Auto Play</h2>
        <ComponentDemo code={autoPlayCode}>
          <div className="w-full max-w-xl">
            <Carousel slides={autoPlaySlides} size="md" autoPlay autoPlayInterval={2500} />
          </div>
        </ComponentDemo>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Variants</h2>
        <div className="flex flex-col gap-6">
          <div className="space-y-2">
            <h3 className="text-lg font-medium text-gray-700 dark:text-gray-400">Bordered</h3>
            <ComponentDemo code={variantsCode}>
              <div className="w-full max-w-xl">
                <Carousel slides={minimalSlides} variant="bordered" size="md" />
              </div>
            </ComponentDemo>
          </div>

          <div className="space-y-2">
            <h3 className="text-lg font-medium text-gray-700 dark:text-gray-400">Dark</h3>
            <ComponentDemo code={variantsCode}>
              <div className="w-full max-w-xl">
                <Carousel slides={travelSlides} variant="dark" size="md" />
              </div>
            </ComponentDemo>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">No Controls</h2>
        <ComponentDemo code={noControlsCode}>
          <div className="w-full max-w-xl">
            <Carousel
              slides={autoPlaySlides}
              size="sm"
              autoPlay
              showArrows={false}
              showDots={false}
            />
          </div>
        </ComponentDemo>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">API Reference</h2>
        <PropsTable data={propsData} />
      </section>
    </div>
  );
};

export default CarouselPage;
