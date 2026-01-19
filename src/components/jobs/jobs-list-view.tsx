'use client';

import { useState, useMemo } from 'react';
import type { Job } from '@/lib/types';
import JobCard from '@/components/dashboard/job-card';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { CalendarIcon, Search } from 'lucide-react';
import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import Link from 'next/link';

export default function JobsListView({ jobs }: { jobs: Job[] }) {
  const [techFilter, setTechFilter] = useState('');
  const [dateFilter, setDateFilter] = useState<Date | undefined>();

  const filteredJobs = useMemo(() => {
    let filtered = jobs;

    if (techFilter) {
      filtered = filtered.filter(job => 
        job.description.toLowerCase().includes(techFilter.toLowerCase()) ||
        job.title.toLowerCase().includes(techFilter.toLowerCase())
      );
    }

    if (dateFilter) {
      // Set time to 00:00:00 to include jobs from the selected day
      const startOfDay = new Date(dateFilter);
      startOfDay.setHours(0, 0, 0, 0);
      filtered = filtered.filter(job => new Date(job.createdAt) >= startOfDay);
    }

    return filtered;
  }, [jobs, techFilter, dateFilter]);

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Job Openings</h1>
      </div>
      <div className="flex flex-col md:flex-row gap-4 items-center">
        <div className="relative w-full md:w-auto md:min-w-[300px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Filter by title or tech..."
              value={techFilter}
              onChange={e => setTechFilter(e.target.value)}
              className="pl-9"
            />
        </div>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              className={cn(
                "w-full md:w-[280px] justify-start text-left font-normal",
                !dateFilter && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {dateFilter ? `Posted after ${format(dateFilter, "PPP")}` : <span>Filter by date...</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={dateFilter}
              onSelect={setDateFilter}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </div>

      {filteredJobs.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredJobs.map((job) => (
                <Link key={job.id} href={`/job/${job.id}`} className="block">
                    <JobCard job={job} />
                </Link>
            ))}
        </div>
      ) : (
        <div className="text-center py-12 text-muted-foreground col-span-full border rounded-lg bg-card/30">
            <h2 className="text-xl font-semibold">No jobs found</h2>
            <p className="text-sm mt-1">Try adjusting your filters.</p>
        </div>
      )}
    </div>
  );
}
