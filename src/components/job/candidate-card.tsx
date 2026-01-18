'use client';

import { motion } from 'framer-motion';
import type { Candidate } from '@/lib/types';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import RadialProgress from './radial-progress';
import { Button } from '@/components/ui/button';
import { Check, X } from 'lucide-react';

interface CandidateCardProps {
  candidate: Candidate;
  index: number;
}

export default function CandidateCard({ candidate, index }: CandidateCardProps) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 50, scale: 0.3 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
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
            <Button variant="destructive" size="sm" className="w-full">
                <X className="mr-2 h-4 w-4" /> Reject
            </Button>
        </motion.div>
        <motion.div whileTap={{ scale: 0.95 }} className="w-full">
            <Button variant="default" size="sm" className="w-full bg-green-600 hover:bg-green-700">
                <Check className="mr-2 h-4 w-4" /> Accept
            </Button>
        </motion.div>
      </div>
    </motion.div>
  );
}
