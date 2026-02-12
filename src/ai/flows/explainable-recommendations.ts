'use server';

/**
 * @fileOverview Generates human-readable explanations for vehicle recommendations.
 *
 * - explainRecommendations - A function that generates explanations for vehicle recommendations.
 * - ExplainRecommendationsInput - The input type for the explainRecommendations function.
 * - ExplainRecommendationsOutput - The return type for the explainRecommendations function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'zod';

const SingleRecommendationInputSchema = z.object({
  budgetMatchPercentage: z.number().describe('The percentage match of the vehicle to the user\'s budget.'),
  usageMatchPercentage: z.number().describe('The percentage match of the vehicle to the user\'s usage pattern.'),
  fuelCompatibilityScore: z.number().describe('A score indicating the compatibility of the vehicle\'s fuel type with the user\'s preference.'),
  maintenanceSuitability: z.number().describe('A score indicating the suitability of the vehicle\'s maintenance requirements for the user.'),
  overallMatchScore: z.number().describe('The overall match score of the vehicle to the user\'s preferences.'),
  vehicleName: z.string().describe('The name of the vehicle.'),
});

const ExplainRecommendationsInputSchema = z.object({
  recommendations: z.array(SingleRecommendationInputSchema),
});
export type ExplainRecommendationsInput = z.infer<typeof ExplainRecommendationsInputSchema>;

const SingleRecommendationOutputSchema = z.object({
  explanation: z.string().describe('A natural language explanation of why the vehicle was recommended.'),
  summary: z.string().describe('A concise, human-readable summary of the recommendation.'),
  points: z.array(z.string()).describe('2-3 short, compelling bullet points highlighting why this vehicle is a good match based on the provided scores.'),
});

const ExplainRecommendationsOutputSchema = z.object({
  results: z.array(SingleRecommendationOutputSchema).optional(),
});
export type ExplainRecommendationsOutput = z.infer<typeof ExplainRecommendationsOutputSchema>;

export async function explainRecommendations(input: ExplainRecommendationsInput): Promise<ExplainRecommendationsOutput> {
  return explainableRecommendationsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'explainableRecommendationsPrompt',
  input: {schema: ExplainRecommendationsInputSchema},
  output: {schema: z.object({ results: z.array(SingleRecommendationOutputSchema) }) },
  prompt: `You are an AI assistant that provides clear and concise explanations for vehicle recommendations.

  You will be given a list of vehicle recommendations. For each vehicle, generate a natural language explanation, a one-sentence summary, and 2-3 short, compelling bullet points based on the provided scores.

  The bullet points should be easy to scan.

  Your response must be a JSON object containing a 'results' key, which is an array of explanation objects. The order of the objects in the 'results' array must exactly match the order of the vehicles in the input 'recommendations' array.

  **Input Recommendations:**
  {{#each recommendations}}
  - **Vehicle:** {{this.vehicleName}}
    - Budget Match: {{this.budgetMatchPercentage}}%
    - Usage Match: {{this.usageMatchPercentage}}%
    - Fuel Compatibility: {{this.fuelCompatibilityScore}}
    - Maintenance Suitability: {{this.maintenanceSuitability}}
    - Overall Match Score: {{this.overallMatchScore}}
  {{/each}}


  **Example Output Format:**
  {
    "results": [
      {
        "explanation": "The {{vehicleName}} is an excellent choice as it aligns well with your budget and usage patterns. Its maintenance costs are suitable for your preference, contributing to a high overall match score.",
        "summary": "A great all-around match that fits your budget and lifestyle needs.",
        "points": [
          "Fits comfortably within your budget.",
          "Excellent for your primary driving usage.",
          "Maintenance costs are in line with your expectations."
        ]
      }
    ]
  }

  Generate the output for the provided data.
  `,
});

const explainableRecommendationsFlow = ai.defineFlow(
  {
    name: 'explainableRecommendationsFlow',
    inputSchema: ExplainRecommendationsInputSchema,
    outputSchema: ExplainRecommendationsOutputSchema,
  },
  async (input): Promise<ExplainRecommendationsOutput> => {
    // This function is designed to be ultra-resilient. It will never throw an error.
    // Instead, it catches all failures (API errors, timeouts, invalid responses)
    // and returns a valid, empty object. This prevents the Next.js development
    // server from showing a disruptive error overlay.
    const response = await prompt(input).catch(() => {
      // On any error from the prompt, return null to signal a failure.
      return null;
    });

    // If the call failed (response is null) or the output is not what we expect,
    // return a valid, empty result set.
    if (
      !response ||
      !response.output ||
      !response.output.results ||
      response.output.results.length !== input.recommendations.length
    ) {
      return { results: [] };
    }

    // If everything is successful, return the AI-generated results.
    return response.output;
  }
);
