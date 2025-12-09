'use server';

/**
 * @fileOverview This file defines a Genkit flow for sustainable route planning.
 *
 * - sustainableRoutePlanning - A function that suggests a route combining sustainable transportation options.
 * - SustainableRoutePlanningInput - The input type for the sustainableRoutePlanning function.
 * - SustainableRoutePlanningOutput - The return type for the sustainableRoutePlanning function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SustainableRoutePlanningInputSchema = z.object({
  startLocation: z.string().describe('The starting location for the route.'),
  endLocation: z.string().describe('The destination location for the route, such as a waste disposal center or charging location.'),
  preferences: z
    .array(z.enum(['walking', 'publicTransport', 'electricVehicle']))
    .optional()
    .describe('Preferred modes of sustainable transportation.'),
});
export type SustainableRoutePlanningInput = z.infer<typeof SustainableRoutePlanningInputSchema>;

const SustainableRoutePlanningOutputSchema = z.object({
  routeDescription: z
    .string()
    .describe(
      'A detailed description of the suggested route, including transportation modes and directions.'
    ),
  estimatedTime: z.string().describe('The estimated travel time for the suggested route.'),
  sustainabilityScore: z
    .number()
    .optional()
    .describe('A score indicating the sustainability of the route (optional).'),
});
export type SustainableRoutePlanningOutput = z.infer<typeof SustainableRoutePlanningOutputSchema>;

export async function sustainableRoutePlanning(
  input: SustainableRoutePlanningInput
): Promise<SustainableRoutePlanningOutput> {
  return sustainableRoutePlanningFlow(input);
}

const prompt = ai.definePrompt({
  name: 'sustainableRoutePlanningPrompt',
  input: {schema: SustainableRoutePlanningInputSchema},
  output: {schema: SustainableRoutePlanningOutputSchema},
  prompt: `You are a route planning expert specializing in sustainable transportation.
  Given a starting location, a destination, and transportation preferences, suggest the best route.

  Starting Location: {{{startLocation}}}
  Destination: {{{endLocation}}}
  Transportation Preferences: {{#if preferences}}{{{preferences}}}{{else}}No preferences specified.{{/if}}

  Provide a detailed route description, estimated travel time, and a sustainability score (if available).
`,
});

const sustainableRoutePlanningFlow = ai.defineFlow(
  {
    name: 'sustainableRoutePlanningFlow',
    inputSchema: SustainableRoutePlanningInputSchema,
    outputSchema: SustainableRoutePlanningOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
