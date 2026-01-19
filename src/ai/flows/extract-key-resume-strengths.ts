'use server';
/**
 * @fileOverview Extracts key strengths from a resume using AI.
 *
 * - extractKeyResumeStrengths - A function that extracts key strengths from a resume.
 * - ExtractKeyResumeStrengthsInput - The input type for the extractKeyResumeStrengths function.
 * - ExtractKeyResumeStrengthsOutput - The return type for the extractKeyResumeStrengths function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ExtractKeyResumeStrengthsInputSchema = z.object({
  resumeText: z
    .string()
    .describe('The text content of the resume from which to extract key strengths.'),
  jobDescription: z
    .string()
    .describe('The job description to tailor the key strengths towards.'),
});
export type ExtractKeyResumeStrengthsInput = z.infer<
  typeof ExtractKeyResumeStrengthsInputSchema
>;

const ExtractKeyResumeStrengthsOutputSchema = z.object({
  keyStrengths: z
    .array(z.string())
    .describe('A list of key strengths extracted from the resume.'),
});
export type ExtractKeyResumeStrengthsOutput = z.infer<
  typeof ExtractKeyResumeStrengthsOutputSchema
>;

export async function extractKeyResumeStrengths(
  input: ExtractKeyResumeStrengthsInput
): Promise<ExtractKeyResumeStrengthsOutput> {
  return extractKeyResumeStrengthsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'extractKeyResumeStrengthsPrompt',
  input: {schema: ExtractKeyResumeStrengthsInputSchema},
  output: {schema: ExtractKeyResumeStrengthsOutputSchema},
  prompt: `You are an expert resume analyst. Your task is to extract the key strengths from a resume, tailored to a specific job description.

Resume Text:
{{{resumeText}}}

Job Description:
{{{jobDescription}}}

Based on the resume and job description, identify the 3-5 most relevant key strengths of the candidate.

Your output MUST be a valid JSON object that conforms to this JSON Schema:
{{zodToJson}}`,
});

const extractKeyResumeStrengthsFlow = ai.defineFlow(
  {
    name: 'extractKeyResumeStrengthsFlow',
    inputSchema: ExtractKeyResumeStrengthsInputSchema,
    outputSchema: ExtractKeyResumeStrengthsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
