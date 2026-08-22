import { Layout } from "@/components/Layout";
import { Card } from "@/components/Card/Card";
import { Button } from "@/components/Button/Button";
import ComponentDemo from "../ComponentsDemo";
import PropsTable from "@/components/Personal/PropsTable";

const LayoutPage = () => {
  const centeredCode = `import { Layout } from "@/components/Layout";

<Layout variant="centered" padding="md" direction="column">
  <h2>Centered Content</h2>
  <p>Content is centered with a max-width of 56rem.</p>
</Layout>`;

  const gridCode = `<Layout variant="container" direction="grid3" gap={24}>
  <Card title="Card 1" description="Grid item" variant="light" size="sm" />
  <Card title="Card 2" description="Grid item" variant="light" size="sm" />
  <Card title="Card 3" description="Grid item" variant="light" size="sm" />
</Layout>`;

  const rowCode = `<Layout direction="row" gap={12} padding="sm">
  <Button variant="primary" size="sm">Button 1</Button>
  <Button variant="secondary" size="sm">Button 2</Button>
  <Button variant="outline" size="sm">Button 3</Button>
</Layout>`;

  const narrowCode = `<Layout variant="narrow" padding="lg">
  <p>This layout constrains content to a narrow readable width, great for articles or forms.</p>
</Layout>`;

  const propsData = [
    {
      prop: "variant",
      type: '"centered" | "full" | "container" | "narrow"',
      default: '"centered"',
      description: "Controls max-width and horizontal alignment of the layout",
    },
    {
      prop: "padding",
      type: '"none" | "sm" | "md" | "lg" | "xl"',
      default: '"md"',
      description: "Vertical padding applied to the layout container",
    },
    {
      prop: "direction",
      type: '"column" | "row" | "grid2" | "grid3"',
      default: '"column"',
      description: "Sets flex or grid layout of children inside the container",
    },
    {
      prop: "gap",
      type: "number",
      default: "-",
      description: "Gap between children in pixels (sets CSS gap property)",
    },
    {
      prop: "asChild",
      type: "boolean",
      default: "false",
      description: "Render as a different element using Radix Slot",
    },
    {
      prop: "className",
      type: "string",
      default: "-",
      description: "Extra class names for custom overrides",
    },
  ];

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-12">
      <header className="space-y-2">
        <h1 className="text-4xl font-bold tracking-tight" style={{ color: "var(--text-color)" }}>
          Layout
        </h1>
        <p className="text-lg text-gray-700 dark:text-gray-400">
          A flexible wrapper component for composing centered, full-width, grid, and row layouts with consistent spacing.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Centered</h2>
        <ComponentDemo code={centeredCode}>
          <Layout variant="centered" padding="sm" direction="column" gap={8} className="w-full">
            <h3 className="text-lg font-semibold" style={{ color: "var(--text-color)" }}>Centered Content</h3>
            <p className="text-gray-500 dark:text-gray-400 text-sm">
              Content is centered with a max-width of 56rem and consistent horizontal padding.
            </p>
          </Layout>
        </ComponentDemo>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Grid Layout</h2>
        <ComponentDemo code={gridCode}>
          <Layout variant="container" direction="grid3" gap={16} className="w-full" padding="none">
            <Card title="Design" description="Create beautiful UI" variant="light" size="sm" />
            <Card title="Develop" description="Build fast components" variant="light" size="sm" />
            <Card title="Deploy" description="Ship to production" variant="light" size="sm" />
          </Layout>
        </ComponentDemo>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Row Layout</h2>
        <ComponentDemo code={rowCode}>
          <Layout direction="row" gap={12} padding="none">
            <Button variant="primary" size="sm" hoverAnimation="none">Button 1</Button>
            <Button variant="secondary" size="sm" hoverAnimation="none">Button 2</Button>
            <Button variant="outline" size="sm" hoverAnimation="none">Button 3</Button>
            <Button variant="ghost" size="sm" hoverAnimation="none">Button 4</Button>
          </Layout>
        </ComponentDemo>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Narrow (Article Width)</h2>
        <ComponentDemo code={narrowCode}>
          <Layout variant="narrow" padding="none" className="w-full">
            <p className="text-gray-700 dark:text-gray-400 text-sm leading-relaxed">
              The narrow variant constrains content to a comfortable reading width — ideal for articles,
              forms, or any single-column content that benefits from a tighter max-width.
            </p>
          </Layout>
        </ComponentDemo>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">API Reference</h2>
        <PropsTable data={propsData} />
      </section>
    </div>
  );
};

export default LayoutPage;
