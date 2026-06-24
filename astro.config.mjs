// @ts-check
import react from "@astrojs/react";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeSlug from "rehype-slug";

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
  },
  site: "https://godhani.in",
  integrations: [react()],
  markdown: {
    shikiConfig: {
      themes: {
        light: "catppuccin-latte",
        dark: "dark-plus",
      },
      defaultColor: false,
    },
    rehypePlugins: [
      rehypeSlug,
      [
        rehypeAutolinkHeadings,
        {
          behavior: "wrap", // Adds the anchor link after the heading text
          properties: {
            className: ["anchor-link"],
            ariaHidden: true,
            tabIndex: -1,
            style: "text-decoration: none; font-style: normal;",
          },

        },
      ],
    ],
  },
});
