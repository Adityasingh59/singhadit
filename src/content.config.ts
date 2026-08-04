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
    /** 'build' ships code; 'experiment' ships a decision. Shown in the spec bar. */
    kind: z.enum(['build', 'experiment']).default('build'),
    tech: z.array(z.string()),
    metrics: z.array(z.object({ value: z.string(), label: z.string() })),
    /** Downloadable/viewable evidence — rendered as a linked list on the case study. */
    artifacts: z
      .array(z.object({ label: z.string(), href: z.string(), note: z.string().optional() }))
      .optional(),
    repo: z.string().url().optional(),
    role: z.string().optional(),
    timeframe: z.string().optional(),
    /** Legacy fields from the pre-redesign build; unused by the current design. */
    emoji: z.string().optional(),
    visual: z.string().optional(),
  }),
});

export const collections = { projects };
