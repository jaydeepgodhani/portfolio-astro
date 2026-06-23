// Import the glob loader
import { glob } from "astro/loaders";
// Import utilities from `astro:content`
import { defineCollection, z } from "astro:content";
// Define a `loader` and `schema` for each collection
const knowledge = defineCollection({
  loader: glob({ pattern: "**/[^_]*.md", base: "./src/content/knowledge" }),
  schema: z.object({
    title: z.string()
  }),
});

const posts = defineCollection({
  loader: glob({ pattern: "**/[^_]*.md", base: "./src/content/posts" }),
  schema: z.object({
    title: z.string(),
    tags: z.array(z.string()),
    date: z.string().date()
  }),
});

// Export a single `collections` object to register your collection(s)
export const collections = { knowledge, posts };