import { notFound } from 'next/navigation';
import { findJobById, findCandidatesByJobId } from '@/lib/mock-data';
import JobDetailsView from '@/components/job/job-details-view';

export default function JobDetailPage({ params }: { params: { id: string } }) {
  const job = findJobById(params.id);
  const initialCandidates = findCandidatesByJobId(params.id);

  if (!job) {
    notFound();
  }

  return <JobDetailsView job={job} initialCandidates={initialCandidates} />;
}
