'use client';

import type { Job } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Briefcase, MapPin, Users } from 'lucide-react';

interface JobCardProps {
  job: Job;
}

export default function JobCard({ job }: JobCardProps) {
  return (
    <div>
      <Card className="h-full bg-card hover:border-primary/80 transition-all duration-300 transform hover:-translate-y-1 group">
        <CardHeader>
          <CardTitle className="text-xl group-hover:text-primary transition-colors">{job.title}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm">
          <div className="flex items-center text-muted-foreground">
            <Briefcase className="mr-2 h-4 w-4" />
            <span>{job.department}</span>
          </div>
          <div className="flex items-center text-muted-foreground">
            <MapPin className="mr-2 h-4 w-4" />
            <span>{job.location}</span>
          </div>
          <div className="flex items-center text-primary font-semibold pt-2">
            <Users className="mr-2 h-4 w-4" />
            <span>{job.candidatesCount} Candidates</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
