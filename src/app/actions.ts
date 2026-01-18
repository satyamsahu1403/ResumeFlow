'use server';

import { scoreCandidateResume } from '@/ai/flows/score-candidate-resumes';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import { candidates } from './lib/mock-data';

const uploadSchema = z.object({
  jobId: z.string(),
  jobDescription: z.string(),
  resumeDataUri: z.string().url(),
  fileName: z.string(),
});

export async function uploadAndScoreResume(input: z.infer<typeof uploadSchema>) {
  const validatedInput = uploadSchema.parse(input);

  try {
    const result = await scoreCandidateResume({
      jobDescription: validatedInput.jobDescription,
      resumeDataUri: validatedInput.resumeDataUri,
    });
    
    // In a real application, you would save this to a database (e.g., Firestore).
    // Here we are adding to our in-memory mock data.
    const newCandidate = {
      id: `candidate-${Date.now()}`,
      name: validatedInput.fileName.replace('.pdf', ''),
      avatarUrl: `https://picsum.photos/seed/${Date.now()}/100/100`,
      score: result.score,
      keyStrengths: result.keyStrengths,
      status: 'new' as const,
    };

    if (!candidates[validatedInput.jobId]) {
      candidates[validatedInput.jobId] = [];
    }
    candidates[validatedInput.jobId].unshift(newCandidate);

    revalidatePath(`/job/${validatedInput.jobId}`);

    return { success: true, candidate: newCandidate };
  } catch (error) {
    console.error('Error scoring resume:', error);
    throw new Error('Failed to score resume.');
  }
}
