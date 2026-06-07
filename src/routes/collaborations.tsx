import { createFileRoute } from "@tanstack/react-router";
import { CategoryView } from "@/components/alps/CategoryPage";

export const Route = createFileRoute("/collaborations")({
  head: () => ({
    meta: [
      { title: "alps collaborations — ALPS Annie Ling" },
      { name: "description", content: "Limited collaborations with designers, artists and technologists." },
      { property: "og:title", content: "alps collaborations" },
      { property: "og:description", content: "Designers in dialogue." },
    ],
  }),
  component: () => <CategoryView slug="collaborations" />,
});
