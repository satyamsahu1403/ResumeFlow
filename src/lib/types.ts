export interface Job {
  id: string;
  title: string;
  department: string;
  location: string;
  candidatesCount: number;
  description: string;
  createdAt: string; // ISO Date String
}

export interface Candidate {
  id: string;
  name: string;
  avatarUrl: string;
  score: number;
  keyStrengths: string[];
  status: 'new' | 'accepted' | 'rejected';
}

export interface AcceptedCandidate extends Candidate {
  jobTitle: string;
  acceptedDate: string; // ISO Date String
}
