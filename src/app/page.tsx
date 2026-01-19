import Link from 'next/link';
import { jobs as allJobs } from '@/lib/mock-data';
import JobCard from '@/components/dashboard/job-card';
import { PlusCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import NewJobDialog from '@/components/dashboard/new-job-dialog';

export default function DashboardPage({ searchParams }: { searchParams?: { q?: string } }) {
  const searchTerm = searchParams?.q?.toLowerCase() || '';
  const jobs = allJobs.filter(job => 
    job.title.toLowerCase().includes(searchTerm) ||
    job.department.toLowerCase().includes(searchTerm) ||
    job.location.toLowerCase().includes(searchTerm)
  );

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Job Dashboard</h1>
        <NewJobDialog>
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            New Job Opening
          </Button>
        </NewJobDialog>
      </div>
      
      {jobs.length === 0 && searchTerm && (
        <div className="text-center py-12 text-muted-foreground col-span-full">
          <h2 className="text-xl font-semibold">No jobs found for "{searchTerm}"</h2>
          <p className="text-sm mt-1">Try searching for something else.</p>
        </div>
      )}

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {jobs.map((job, index) => (
          <Link key={job.id} href={`/job/${job.id}`} className="block">
            <JobCard job={job} index={index} />
          </Link>
        ))}
        
        <div className="md:col-span-2 lg:col-span-1 p-6 rounded-lg border bg-card flex flex-col items-center justify-center text-center hover:border-primary transition-colors duration-300">
            <h3 className="text-lg font-semibold text-primary">Create a New Opening</h3>
            <p className="text-sm text-muted-foreground mt-2 mb-4">Post a new job and start finding the best talent with AI.</p>
            <NewJobDialog>
              <Button variant="outline">
                <PlusCircle className="mr-2 h-4 w-4" />
                Post Job
              </Button>
            </NewJobDialog>
        </div>
      </div>
    </div>
  );
}
