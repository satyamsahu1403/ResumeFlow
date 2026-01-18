'use client';

import { useState } from 'react';
import type { Candidate } from '@/lib/types';
import CandidateCard from './candidate-card';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AnimatePresence } from 'framer-motion';

interface CandidateGridProps {
  initialCandidates: Candidate[];
}

export default function CandidateGrid({ initialCandidates }: CandidateGridProps) {
  const [candidates, setCandidates] = useState<Candidate[]>(initialCandidates);
  
  // In a real app, this would be updated via websockets or by re-fetching.
  // For now, it's just showing the initial data.

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
                  <CandidateCard key={candidate.id} candidate={candidate} index={index} />
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
