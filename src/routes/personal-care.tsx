import { createFileRoute } from "@tanstack/react-router";
import { CategoryView } from "@/components/alps/CategoryPage";

export const Route = createFileRoute("/personal-care")({
  head: () => ({
    meta: [
      { title: "alps vegan skin & personal care — ALPS Annie Ling" },
      { name: "description", content: "Vegan skin and personal care — made to make a difference." },
      { property: "og:title", content: "alps vegan skin & personal care" },
      { property: "og:description", content: "Made to make a difference." },
    ],
  }),
  component: () => <CategoryView slug="personal-care" />,
});
