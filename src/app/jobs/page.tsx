import { jobs } from '@/lib/mock-data';
import JobsListView from '@/components/jobs/jobs-list-view';

export const dynamic = 'force-dynamic';

export default function JobOpeningsPage() {
  const sortedJobs = [...jobs].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  return <JobsListView jobs={sortedJobs} />;
}
