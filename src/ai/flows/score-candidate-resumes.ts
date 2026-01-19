'use server';

/**
 * @fileOverview This file defines a Genkit flow for scoring candidate resumes based on a job description.
 *
 * It includes:
 * - scoreCandidateResume -  A function that takes a job description and a resume (as a data URI), extracts the resume text, scores the resume against the job description, and returns the score (0-100) and key strengths.
 * - ScoreCandidateResumeInput - The input type for the scoreCandidateResume function.
 * - ScoreCandidateResumeOutput - The return type for the scoreCandidateResume function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ScoreCandidateResumeInputSchema = z.object({
  jobDescription: z.string().describe('The job description to match the resume against.'),
  resumeDataUri: z
    .string()
    .describe(
      'The resume as a data URI that must include a MIME type and use Base64 encoding. Expected format: \'data:<mimetype>;base64,<encoded_data>\'.' // Corrected the example format
    ),
});
export type ScoreCandidateResumeInput = z.infer<typeof ScoreCandidateResumeInputSchema>;

const ScoreCandidateResumeOutputSchema = z.object({
  score: z.number().describe('The score (0-100) of the resume against the job description.'),
  keyStrengths: z.array(z.string()).describe('Key strengths of the candidate based on the resume.'),
});
export type ScoreCandidateResumeOutput = z.infer<typeof ScoreCandidateResumeOutputSchema>;

export async function scoreCandidateResume(
  input: ScoreCandidateResumeInput
): Promise<ScoreCandidateResumeOutput> {
  return scoreCandidateResumeFlow(input);
}

const scoreCandidateResumePrompt = ai.definePrompt({
  name: 'scoreCandidateResumePrompt',
  input: {schema: ScoreCandidateResumeInputSchema},
  output: {schema: ScoreCandidateResumeOutputSchema},
  prompt: `You are an AI resume screener. Given a job description and a resume, you will score the resume based on how well it matches the job description (0-100). You will also extract key strengths from the resume.

Job Description: {{{jobDescription}}}

Resume: {{media url=resumeDataUri}}

Please provide the output in JSON format. The JSON object should conform to the following Zod schema:
{{ zodToJson }}
`,
});

const scoreCandidateResumeFlow = ai.defineFlow(
  {
    name: 'scoreCandidateResumeFlow',
    inputSchema: ScoreCandidateResumeInputSchema,
    outputSchema: ScoreCandidateResumeOutputSchema,
  },
  async input => {
    const {output} = await scoreCandidateResumePrompt(input);
    return output!;
  }
);
