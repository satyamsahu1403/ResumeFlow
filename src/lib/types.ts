export interface Job {
  id: string;
  title: string;
  department: string;
  location: string;
  candidatesCount: number;
  description: string;
}

export interface Candidate {
  id: string;
  name: string;
  avatarUrl: string;
  score: number;
  keyStrengths: string[];
  status: 'new' | 'accepted' | 'rejected';
}
