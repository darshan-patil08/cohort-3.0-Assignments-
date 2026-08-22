import { Tooltip } from "@/components/Tooltip";
import { Button } from "@/components/Button/Button";
import ComponentDemo from "../ComponentsDemo";
import PropsTable from "@/components/Personal/PropsTable";

const TooltipPage = () => {
  const basicCode = `import { Tooltip } from "@/components/Tooltip";
import { Button } from "@/components/Button/Button";

<Tooltip content="This is a tooltip" position="top">
  <Button variant="primary" size="sm">Hover me</Button>
</Tooltip>`;

  const positionsCode = `<Tooltip content="Top tooltip" position="top">
  <Button variant="outline" size="sm">Top</Button>
</Tooltip>

<Tooltip content="Bottom tooltip" position="bottom">
  <Button variant="outline" size="sm">Bottom</Button>
</Tooltip>

<Tooltip content="Left tooltip" position="left">
  <Button variant="outline" size="sm">Left</Button>
</Tooltip>

<Tooltip content="Right tooltip" position="right">
  <Button variant="outline" size="sm">Right</Button>
</Tooltip>`;

  const variantsCode = `<Tooltip content="Dark variant" variant="dark" position="top">
  <Button variant="dark" size="sm">Dark</Button>
</Tooltip>

<Tooltip content="Primary variant" variant="primary" position="top">
  <Button variant="primary" size="sm">Primary</Button>
</Tooltip>

<Tooltip content="Danger variant" variant="danger" position="top">
  <Button variant="destructive" size="sm">Danger</Button>
</Tooltip>

<Tooltip content="Light variant" variant="light" position="top">
  <Button variant="ghost" size="sm">Light</Button>
</Tooltip>`;

  const delayCode = `<Tooltip content="Shows after 500ms" delay={500} position="top">
  <Button variant="secondary" size="sm">Delayed</Button>
</Tooltip>`;

  const propsData = [
    {
      prop: "content",
      type: "string",
      default: "-",
      description: "The text shown inside the tooltip",
    },
    {
      prop: "position",
      type: '"top" | "bottom" | "left" | "right"',
      default: '"top"',
      description: "Where the tooltip appears relative to the trigger element",
    },
    {
      prop: "variant",
      type: '"dark" | "light" | "primary" | "danger"',
      default: '"dark"',
      description: "Visual style of the tooltip bubble",
    },
    {
      prop: "delay",
      type: "number",
      default: "0",
      description: "Delay in milliseconds before the tooltip appears",
    },
    {
      prop: "children",
      type: "ReactNode",
      default: "-",
      description: "The element that triggers the tooltip on hover",
    },
    {
      prop: "className",
      type: "string",
      default: "-",
      description: "Extra classes to extend tooltip styling",
    },
  ];

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-12">
      <header className="space-y-2">
        <h1 className="text-4xl font-bold tracking-tight" style={{ color: "var(--text-color)" }}>
          Tooltip
        </h1>
        <p className="text-lg text-gray-700 dark:text-gray-400">
          A floating label that appears on hover with GSAP-powered entrance animations and 4 placement options.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Usage</h2>
        <ComponentDemo code={basicCode}>
          <Tooltip content="This is a tooltip!" position="top">
            <Button variant="primary" size="sm">Hover me</Button>
          </Tooltip>
        </ComponentDemo>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Positions</h2>
        <ComponentDemo code={positionsCode}>
          <div className="flex flex-wrap items-center gap-6">
            <Tooltip content="Top tooltip" position="top">
              <Button variant="outline" size="sm" hoverAnimation="none">Top</Button>
            </Tooltip>
            <Tooltip content="Bottom tooltip" position="bottom">
              <Button variant="outline" size="sm" hoverAnimation="none">Bottom</Button>
            </Tooltip>
            <Tooltip content="Left tooltip" position="left">
              <Button variant="outline" size="sm" hoverAnimation="none">Left</Button>
            </Tooltip>
            <Tooltip content="Right tooltip" position="right">
              <Button variant="outline" size="sm" hoverAnimation="none">Right</Button>
            </Tooltip>
          </div>
        </ComponentDemo>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Variants</h2>
        <ComponentDemo code={variantsCode}>
          <div className="flex flex-wrap items-center gap-6">
            <Tooltip content="Dark variant" variant="dark" position="top">
              <Button variant="dark" size="sm" hoverAnimation="none">Dark</Button>
            </Tooltip>
            <Tooltip content="Primary variant" variant="primary" position="top">
              <Button variant="primary" size="sm" hoverAnimation="none">Primary</Button>
            </Tooltip>
            <Tooltip content="Danger variant" variant="danger" position="top">
              <Button variant="destructive" size="sm" hoverAnimation="none">Danger</Button>
            </Tooltip>
            <Tooltip content="Light variant" variant="light" position="top">
              <Button variant="ghost" size="sm" hoverAnimation="none">Light</Button>
            </Tooltip>
          </div>
        </ComponentDemo>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">With Delay</h2>
        <ComponentDemo code={delayCode}>
          <Tooltip content="Shows after 500ms" delay={500} position="top">
            <Button variant="secondary" size="sm" hoverAnimation="none">Delayed Tooltip</Button>
          </Tooltip>
        </ComponentDemo>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">API Reference</h2>
        <PropsTable data={propsData} />
      </section>
    </div>
  );
};

export default TooltipPage;
