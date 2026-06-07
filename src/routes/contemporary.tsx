import { createFileRoute } from "@tanstack/react-router";
import { CategoryView } from "@/components/alps/CategoryPage";

export const Route = createFileRoute("/contemporary")({
  head: () => ({
    meta: [
      { title: "alps contemporary — ALPS Annie Ling" },
      { name: "description", content: "Contemporary ready-to-wear — timeless with a twist." },
      { property: "og:title", content: "alps contemporary" },
      { property: "og:description", content: "Timeless with a twist." },
    ],
  }),
  component: () => <CategoryView slug="contemporary" />,
});
