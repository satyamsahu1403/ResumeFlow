import { notFound } from 'next/navigation';
import { findJobById, findCandidatesByJobId } from '@/lib/mock-data';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import DragAndDropUpload from '@/components/job/drag-and-drop-upload';
import CandidateGrid from '@/components/job/candidate-grid';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

export default function JobDetailPage({ params }: { params: { id: string } }) {
  const job = findJobById(params.id);
  const candidates = findCandidatesByJobId(params.id);

  if (!job) {
    notFound();
  }

  return (
    <div className="space-y-8">
      <Link href="/" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Dashboard
      </Link>
      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-8">
            <Card className="bg-transparent border-0 shadow-none">
                <CardHeader className="p-0">
                    <CardTitle className="text-4xl font-extrabold tracking-tight">{job.title}</CardTitle>
                    <CardDescription className="text-lg pt-2">{job.department} &middot; {job.location}</CardDescription>
                </CardHeader>
                <CardContent className="p-0 mt-6">
                    <p className="text-muted-foreground">{job.description}</p>
                </CardContent>
            </Card>
            <DragAndDropUpload job={job} />
        </div>
        <div className="lg:col-span-1">
          <CandidateGrid initialCandidates={candidates} />
        </div>
      </div>
    </div>
  );
}
