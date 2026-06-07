import { createFileRoute } from "@tanstack/react-router";
import { CategoryView } from "@/components/alps/CategoryPage";
import { FabricTechnology } from "@/components/alps/FabricTechnology";

export const Route = createFileRoute("/innovation")({
  head: () => ({
    meta: [
      { title: "alps innovation — ALPS Annie Ling" },
      { name: "description", content: "Performance outerwear engineered around textile science. Where fashion meets innovation." },
      { property: "og:title", content: "alps innovation" },
      { property: "og:description", content: "Where fashion meets innovation." },
    ],
  }),
  component: () => (
    <>
      <FabricTechnology />
      <CategoryView slug="innovation" />
    </>
  ),
});
