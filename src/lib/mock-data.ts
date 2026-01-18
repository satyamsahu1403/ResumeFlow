import type { Job, Candidate } from './types';

export const jobs: Job[] = [
  {
    id: 'sr-frontend-engineer',
    title: 'Senior Frontend Engineer',
    department: 'Engineering',
    location: 'Remote, US',
    candidatesCount: 5,
    description:
      'We are looking for an experienced Senior Frontend Engineer to join our team. You will be responsible for building and maintaining our user-facing applications, working with modern technologies like React, Next.js, and TypeScript. A strong eye for design and user experience is crucial.',
  },
  {
    id: 'product-designer',
    title: 'Product Designer',
    department: 'Design',
    location: 'New York, NY',
    candidatesCount: 3,
    description:
      'Join our design team to create intuitive and beautiful user experiences. You will be involved in the entire product development process, from brainstorming to final design hand-off. Proficiency in Figma and a strong portfolio are required.',
  },
  {
    id: 'ai-ml-engineer',
    title: 'AI/ML Engineer',
    department: 'Engineering',
    location: 'San Francisco, CA',
    candidatesCount: 8,
    description:
      'We are seeking an AI/ML Engineer to develop and implement machine learning models. You will work on our core AI features, including resume parsing and scoring. Experience with Python, TensorFlow/PyTorch, and NLP is highly desirable.',
  },
];

export const candidates: Record<string, Candidate[]> = {
  'sr-frontend-engineer': [
    {
      id: 'candidate-1',
      name: 'Alice Johnson',
      avatarUrl: 'https://picsum.photos/seed/avatar1/100/100',
      score: 92,
      keyStrengths: ['Next.js Expert', 'State Management', 'UI/UX Sensitivity'],
      status: 'new',
    },
    {
      id: 'candidate-2',
      name: 'Bob Williams',
      avatarUrl: 'https://picsum.photos/seed/avatar2/100/100',
      score: 85,
      keyStrengths: ['React Ecosystem', 'Performance Optimization', 'Team Leadership'],
      status: 'new',
    },
    {
      id: 'candidate-3',
      name: 'Charlie Brown',
      avatarUrl: 'https://picsum.photos/seed/avatar3/100/100',
      score: 78,
      keyStrengths: ['TypeScript', 'API Integration', 'Agile Methodologies'],
      status: 'new',
    },
  ],
  'product-designer': [
    {
      id: 'candidate-4',
      name: 'Diana Prince',
      avatarUrl: 'https://picsum.photos/seed/avatar4/100/100',
      score: 95,
      keyStrengths: ['User-Centered Design', 'Prototyping', 'Design Systems'],
      status: 'new',
    },
  ],
  'ai-ml-engineer': [],
};

export const findJobById = (id: string): Job | undefined => {
  return jobs.find((job) => job.id === id);
};

export const findCandidatesByJobId = (jobId: string): Candidate[] => {
  return candidates[jobId] || [];
};
