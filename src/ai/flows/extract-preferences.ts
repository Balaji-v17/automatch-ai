'use server';

/**
 * @fileOverview Extracts structured vehicle preferences from natural language queries.
 *
 * - extractPreferences - A function that handles preference extraction.
 * - ExtractPreferencesInput - The input type for the extractPreferences function.
 * - ExtractPreferencesOutput - The return type for the extractPreferences function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';
import {
  FuelType,
  MaintenanceSensitivity,
  Priority,
  UsagePattern,
  VehicleType,
} from '@/lib/types';

const ExtractPreferencesInputSchema = z.object({
  query: z.string().describe('The user\'s natural language query about vehicle preferences.'),
  conversation: z.array(z.object({
    role: z.enum(['user', 'model']),
    content: z.string(),
  })).optional().describe('The history of the conversation so far.'),
});
export type ExtractPreferencesInput = z.infer<typeof ExtractPreferencesInputSchema>;


const vehicleTypes: VehicleType[] = ['Car', 'SUV', 'EV', 'Bike', 'Scooter'];
const fuelTypes: FuelType[] = ['Petrol', 'Diesel', 'Electric', 'Hybrid'];
const usagePatterns: UsagePattern[] = ['City', 'Highway', 'Mixed'];
const priorities: Priority[] = ['Mileage', 'Performance'];
const maintenanceSensitivities: MaintenanceSensitivity[] = ['Low', 'Medium', 'High'];


const PreferencesSchema = z.object({
  budget: z.array(z.number()).length(2).describe('The user\'s budget range as [min, max]. Extract numbers from the query. Use reasonable defaults if not specified. E.g., "under 10 lakhs" is [0, 1000000]. "around 15 lakhs" could be [1400000, 1600000]. Default to [500000, 2500000] if not mentioned.'),
  vehicleTypes: z.array(z.enum(vehicleTypes)).describe('An array of vehicle types the user is interested in. Default to ["Car", "SUV"] if not mentioned.'),
  usage: z.enum(usagePatterns).describe('The primary usage pattern. Default to "Mixed" if not mentioned.'),
  fuelTypes: z.array(z.enum(fuelTypes)).describe('An array of preferred fuel types. Default to ["Petrol", "Electric"] if not mentioned.'),
  priority: z.enum(priorities).describe('The user\'s main priority. Default to "Mileage" if not mentioned.'),
  maintenance: z.enum(maintenanceSensitivities).describe('The user\'s maintenance cost sensitivity. Default to "Medium" if not mentioned.'),
});

const ExtractPreferencesOutputSchema = z.object({
  preferences: PreferencesSchema.optional().describe('The fully extracted user preferences. This should be populated only when you have high confidence in all fields.'),
  clarification: z.string().optional().describe('A short, friendly question to ask the user if their query is ambiguous or incomplete. For example, if budget is missing, ask for it.'),
  thought: z.string().describe('Your step-by-step thinking process. First, analyze the user query. Second, identify each preference. Third, if all preferences are clear, structure them into the `preferences` object. If not, formulate a `clarification` question.'),
  error: z.string().optional(),
});
export type ExtractPreferencesOutput = z.infer<typeof ExtractPreferencesOutputSchema>;


export async function extractPreferences(input: ExtractPreferencesInput): Promise<ExtractPreferencesOutput> {
  return extractPreferencesFlow(input);
}

const prompt = ai.definePrompt({
  name: 'extractPreferencesPrompt',
  input: { schema: ExtractPreferencesInputSchema },
  output: { schema: ExtractPreferencesOutputSchema },
  prompt: `You are an expert AI assistant for AutoMatch AI, a vehicle recommendation service. Your goal is to understand a user's request and extract their preferences into a structured format.

  Current user query: "{{query}}"

  {{#if conversation}}
  Conversation History:
  {{#each conversation}}
  - {{role}}: {{content}}
  {{/each}}
  {{/if}}

  Follow these steps:
  1.  Analyze the user's query (and conversation history if available) to identify their preferences for: budget, vehicleTypes, usage, fuelTypes, priority, and maintenance.
  2.  The available options for each preference are:
      - vehicleTypes: ${vehicleTypes.join(', ')}
      - usage: ${usagePatterns.join(', ')}
      - fuelTypes: ${fuelTypes.join(', ')}
      - priority: ${priorities.join(', ')}
      - maintenance: ${maintenanceSensitivities.join(', ')}
  3.  When extracting budget, "lakh" means 100,000. For example, "10 lakhs" is 1000000.
  4.  If the user's query is clear and you can determine all preferences, populate the 'preferences' object. Use these defaults for any UNSPECIFIED preferences:
      - budget: [500000, 2500000]
      - vehicleTypes: ['Car', 'SUV']
      - usage: 'Mixed'
      - fuelTypes: ['Petrol', 'Electric']
      - priority: 'Mileage'
      - maintenance: 'Medium'
  5.  If the query is ambiguous or key information (like budget or vehicle type) is missing, do NOT populate the 'preferences' object. Instead, formulate a single, friendly clarification question to ask the user and put it in the 'clarification' field. For example: "That sounds like a great start! To help me narrow it down, what is your approximate budget?"
  6.  Always explain your reasoning in the 'thought' field.
  `,
});


const extractPreferencesFlow = ai.defineFlow(
  {
    name: 'extractPreferencesFlow',
    inputSchema: ExtractPreferencesInputSchema,
    outputSchema: ExtractPreferencesOutputSchema,
  },
  async (input) => {
    try {
      const { output } = await prompt(input);
      return output!;
    } catch (error) {
      return {
        thought: 'An error occurred while processing the request.',
        error:
          'Sorry, I am having trouble connecting right now. Please try again in a moment or use the detailed form below.',
      };
    }
  }
);
