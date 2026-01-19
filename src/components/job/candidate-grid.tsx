'use client';

import type { Candidate } from '@/lib/types';
import CandidateCard from './candidate-card';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AnimatePresence } from 'framer-motion';

interface CandidateGridProps {
  candidates: Candidate[];
  jobId: string;
  onCandidateRemove: (candidateId: string) => void;
}

export default function CandidateGrid({ candidates, jobId, onCandidateRemove }: CandidateGridProps) {

  return (
    <Card className="bg-card/30 backdrop-blur-sm h-full">
      <CardHeader>
        <CardTitle>Candidates ({candidates.length})</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {candidates.length > 0 ? (
          <div className="space-y-4">
            <AnimatePresence>
                {candidates.map((candidate, index) => (
                  <CandidateCard
                    key={candidate.id}
                    candidate={candidate}
                    index={index}
                    jobId={jobId}
                    onStatusUpdate={onCandidateRemove}
                  />
                ))}
            </AnimatePresence>
          </div>
        ) : (
          <div className="text-center py-12 text-muted-foreground">
            <p className="font-semibold">No candidates yet</p>
            <p className="text-sm mt-1">Upload resumes to start screening.</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
