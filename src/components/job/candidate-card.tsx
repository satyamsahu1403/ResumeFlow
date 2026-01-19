'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import type { Candidate } from '@/lib/types';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import RadialProgress from './radial-progress';
import { Button } from '@/components/ui/button';
import { Check, X, LoaderCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { updateCandidateStatus } from '@/app/actions';

interface CandidateCardProps {
  candidate: Candidate;
  index: number;
  jobId: string;
  onStatusUpdate: (candidateId: string) => void;
}

export default function CandidateCard({ candidate, index, jobId, onStatusUpdate }: CandidateCardProps) {
  const [isUpdating, setIsUpdating] = useState<'accept' | 'reject' | false>(false);
  const { toast } = useToast();

  const handleStatusUpdate = async (status: 'accepted' | 'rejected') => {
    setIsUpdating(status);
    try {
      const result = await updateCandidateStatus({
        jobId,
        candidateId: candidate.id,
        status,
      });

      if (result.success) {
        toast({
          title: `Candidate ${status}`,
          description: `${candidate.name} has been moved to the ${status} pile.`,
        });
        onStatusUpdate(candidate.id);
      } else {
        throw new Error('Update failed');
      }
    } catch (error) {
      toast({
        title: 'Update Failed',
        description: 'Something went wrong while updating the candidate status.',
        variant: 'destructive',
      });
      setIsUpdating(false); // Re-enable buttons on failure
    }
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 50, scale: 0.3 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -20, scale: 0.9, transition: { duration: 0.3 } }}
      transition={{ type: 'spring', stiffness: 300, damping: 30, delay: index * 0.1 }}
      className="rounded-lg border bg-card/50 backdrop-blur-md p-4 space-y-4"
    >
      <div className="flex items-center gap-4">
        <Avatar className="h-12 w-12">
          <AvatarImage src={candidate.avatarUrl} alt={candidate.name} data-ai-hint="person portrait" />
          <AvatarFallback>{candidate.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <h3 className="font-semibold text-lg">{candidate.name}</h3>
        </div>
        <RadialProgress score={candidate.score} />
      </div>

      <div>
        <h4 className="text-sm font-medium mb-2 text-muted-foreground">Key Strengths</h4>
        <div className="flex flex-wrap gap-2">
          {candidate.keyStrengths.map((strength) => (
            <Badge key={strength} variant="secondary" className="bg-primary/10 text-primary border-primary/20">
              {strength}
            </Badge>
          ))}
        </div>
      </div>
      
      <div className="flex gap-2 pt-2">
        <motion.div whileTap={{ scale: 0.95 }} className="w-full">
            <Button variant="destructive" size="sm" className="w-full" onClick={() => handleStatusUpdate('rejected')} disabled={!!isUpdating}>
              {isUpdating === 'reject' ? <LoaderCircle className="animate-spin" /> : <X />}
              {isUpdating === 'reject' ? 'Rejecting...' : 'Reject'}
            </Button>
        </motion.div>
        <motion.div whileTap={{ scale: 0.95 }} className="w-full">
            <Button variant="default" size="sm" className="w-full bg-green-600 hover:bg-green-700" onClick={() => handleStatusUpdate('accepted')} disabled={!!isUpdating}>
              {isUpdating === 'accept' ? <LoaderCircle className="animate-spin" /> : <Check />}
              {isUpdating === 'accept' ? 'Accepting...' : 'Accept'}
            </Button>
        </motion.div>
      </div>
    </motion.div>
  );
}
