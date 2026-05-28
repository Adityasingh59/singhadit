import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    tagline: z.string(),
    summary: z.string(),
    category: z.string(),
    year: z.string(),
    order: z.number(),
    featured: z.boolean().default(false),
    emoji: z.string(),
    visual: z.string(), // css class for the project visual gradient
    tech: z.array(z.string()),
    metrics: z.array(z.object({ value: z.string(), label: z.string() })),
    repo: z.string().url().optional(),
    role: z.string().optional(),
    timeframe: z.string().optional(),
  }),
});

export const collections = { projects };
