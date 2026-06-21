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

export const metadata = [
  {
    title: 'This is forth title',
    date: '2024-11-01',
    tags: ['javascript', 'xylo'],
    link: 'this-is-forth-title'
  },
  {
    title: 'First ever title ?',
    date: '2024-10-01',
    tags: ['javascript', 'bit'],
    link: 'first-ever-title'
  },
  {
    title: 'How about second title ?',
    date: '2023-10-01',
    tags: ['xylo', 'bit'],
    link: 'how-about-second-title'
  },
  {
    title: 'This is third title',
    date: '2023-01-01',
    tags: ['javascript', 'xylo'],
    link: 'this-is-third-title'
  }
];