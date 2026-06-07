import { createFileRoute } from "@tanstack/react-router";
import { CategoryView } from "@/components/alps/CategoryPage";

export const Route = createFileRoute("/accessories")({
  head: () => ({
    meta: [
      { title: "alps accessories — ALPS Annie Ling" },
      { name: "description", content: "Bags, socks and the finishing details that complete the wardrobe." },
      { property: "og:title", content: "alps accessories" },
      { property: "og:description", content: "The finishing detail." },
    ],
  }),
  component: () => <CategoryView slug="accessories" />,
});
