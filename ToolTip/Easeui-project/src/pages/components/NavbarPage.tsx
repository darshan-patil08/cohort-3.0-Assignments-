import { Navbar } from "@/components/navbar";
import ComponentDemo from "../ComponentsDemo";
import PropsTable from "@/components/Personal/PropsTable";

const NavbarPage = () => {
  const basicCode = `import { Navbar } from "@/components/navbar";

<Navbar variant="light" size="default" />`;

  const darkCode = `<Navbar variant="dark" size="default" />`;

  const primaryCode = `<Navbar variant="primary" size="lg" />`;

  const glassCode = `<div className="relative h-32 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg overflow-hidden">
  <Navbar variant="glass" size="default" />
</div>`;

  const propsData = [
    {
      prop: "variant",
      type: '"light" | "dark" | "primary" | "glass"',
      default: '"light"',
      description: "Controls the background and text color of the navbar",
    },
    {
      prop: "size",
      type: '"default" | "sm" | "lg" | "xl"',
      default: '"default"',
      description: "Sets the height of the navbar",
    },
    {
      prop: "animation",
      type: '"fadeIn" | "scaleIn" | "slideUp" | "bounceIn" | "none"',
      default: '"fadeIn"',
      description: "Entrance animation when the navbar mounts",
    },
    {
      prop: "hoverAnimation",
      type: '"jiggle" | "scale" | "bounce" | "none"',
      default: '"none"',
      description: "GSAP animation triggered on hover",
    },
    {
      prop: "asChild",
      type: "boolean",
      default: "false",
      description: "Renders as a different element using Radix Slot",
    },
    {
      prop: "className",
      type: "string",
      default: "-",
      description: "Additional class names for custom styling",
    },
  ];

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-12">
      <header className="space-y-2">
        <h1 className="text-4xl font-bold tracking-tight" style={{ color: "var(--text-color)" }}>
          Navbar
        </h1>
        <p className="text-lg text-gray-700 dark:text-gray-400">
          A flexible top navigation bar with multiple variants and GSAP animation support.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Usage</h2>

        <div className="space-y-2">
          <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300">Light</h3>
          <ComponentDemo code={basicCode}>
            <div className="w-full">
              <Navbar variant="light" />
            </div>
          </ComponentDemo>
        </div>

        <div className="space-y-2">
          <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300">Dark</h3>
          <ComponentDemo code={darkCode}>
            <div className="w-full">
              <Navbar variant="dark" />
            </div>
          </ComponentDemo>
        </div>

        <div className="space-y-2">
          <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300">Primary</h3>
          <ComponentDemo code={primaryCode}>
            <div className="w-full">
              <Navbar variant="primary" size="lg" />
            </div>
          </ComponentDemo>
        </div>

        <div className="space-y-2">
          <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300">Glass</h3>
          <ComponentDemo code={glassCode}>
            <div className="relative w-full h-28 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg overflow-hidden flex items-start">
              <Navbar variant="glass" />
            </div>
          </ComponentDemo>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">API Reference</h2>
        <PropsTable data={propsData} />
      </section>
    </div>
  );
};

export default NavbarPage;
