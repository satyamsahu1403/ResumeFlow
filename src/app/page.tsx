import Link from 'next/link';
import { jobs } from '@/lib/mock-data';
import JobCard from '@/components/dashboard/job-card';
import { PlusCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Job Dashboard</h1>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" />
          New Job Opening
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {jobs.map((job, index) => (
          <Link key={job.id} href={`/job/${job.id}`} className="block">
            <JobCard job={job} index={index} />
          </Link>
        ))}
        
        <div className="md:col-span-2 lg:col-span-1 p-6 rounded-lg border bg-card/50 backdrop-blur-sm flex flex-col items-center justify-center text-center hover:border-primary transition-colors duration-300">
            <h3 className="text-lg font-semibold text-primary">Create a New Opening</h3>
            <p className="text-sm text-muted-foreground mt-2 mb-4">Post a new job and start finding the best talent with AI.</p>
            <Button variant="outline">
              <PlusCircle className="mr-2 h-4 w-4" />
              Post Job
            </Button>
        </div>
      </div>
    </div>
  );
}
