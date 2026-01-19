import { acceptedCandidates } from '@/lib/mock-data';
import AcceptedCandidatesList from '@/components/candidates/accepted-candidates-list';

export default function AcceptedCandidatesPage() {
  // Make a copy and sort by date
  const sortedCandidates = [...acceptedCandidates].sort((a, b) => new Date(b.acceptedDate).getTime() - new Date(a.acceptedDate).getTime());

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold tracking-tight">Accepted Candidates</h1>
      <AcceptedCandidatesList candidates={sortedCandidates} />
    </div>
  );
}
