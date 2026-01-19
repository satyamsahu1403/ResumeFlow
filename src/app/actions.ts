'use server';

import { scoreCandidateResume } from '@/ai/flows/score-candidate-resumes';
import { z } from 'zod';
import { candidates, jobs } from '@/lib/mock-data';
import { revalidatePath } from 'next/cache';

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

    // No longer revalidating path, client will update optimistically
    // revalidatePath(`/job/${validatedInput.jobId}`);

    return { success: true, candidate: newCandidate };
  } catch (error) {
    console.error('Error scoring resume:', error);
    throw new Error('Failed to score resume.');
  }
}

const updateCandidateStatusSchema = z.object({
  jobId: z.string(),
  candidateId: z.string(),
  status: z.enum(['accepted', 'rejected']),
});

export async function updateCandidateStatus(input: z.infer<typeof updateCandidateStatusSchema>) {
  const validatedInput = updateCandidateStatusSchema.parse(input);
  const { jobId, candidateId } = validatedInput;

  await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate network delay

  const jobCandidates = candidates[jobId];
  if (jobCandidates) {
    const candidateIndex = jobCandidates.findIndex(c => c.id === candidateId);
    if (candidateIndex !== -1) {
      jobCandidates.splice(candidateIndex, 1);
    }
  }

  // No longer revalidating path, client will update optimistically
  // revalidatePath(`/job/${jobId}`);
  return { success: true };
}

export async function createJob(prevState: any, formData: FormData) {
  const jobSchema = z.object({
    title: z.string().min(3, { message: "Title must be at least 3 characters." }),
    department: z.string().min(2, { message: "Department must be at least 2 characters." }),
    location: z.string().min(2, { message: "Location must be at least 2 characters." }),
    description: z.string().min(10, { message: "Description must be at least 10 characters." }),
  });
  
  const validatedFields = jobSchema.safeParse({
    title: formData.get('title'),
    department: formData.get('department'),
    location: formData.get('location'),
    description: formData.get('description'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    }
  }

  const { title, department, location, description } = validatedFields.data;

  const newJob = {
    id: title.toLowerCase().replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-') + '-' + Date.now(),
    title,
    department,
    location,
    description,
    candidatesCount: 0,
  };

  jobs.unshift(newJob);
  revalidatePath('/');
  return { success: true };
}
