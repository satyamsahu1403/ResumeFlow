import type { AcceptedCandidate } from '@/lib/types';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Briefcase } from 'lucide-react';
import { format } from 'date-fns';
import Link from 'next/link';

export default function AcceptedCandidatesList({ candidates }: { candidates: AcceptedCandidate[] }) {
  if (candidates.length === 0) {
    return (
      <div className="text-center py-12 text-muted-foreground bg-card/30 rounded-lg border">
        <h2 className="text-xl font-semibold">No accepted candidates yet</h2>
        <p className="text-sm mt-1">Candidates you accept will appear here.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {candidates.map(candidate => (
        <Card key={candidate.id} className="bg-card/50 backdrop-blur-sm hover:border-primary/80 transition-all duration-300 transform hover:-translate-y-1 group">
          <CardContent className="p-4 flex items-center gap-4">
            <Avatar className="h-12 w-12">
              <AvatarImage src={candidate.avatarUrl} alt={candidate.name} data-ai-hint="person portrait" />
              <AvatarFallback>{candidate.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h3 className="font-semibold text-lg">{candidate.name}</h3>
              <Link href={`/job/${candidate.id.split('-')[0]}`} className="text-sm text-muted-foreground flex items-center gap-2 hover:text-primary transition-colors">
                <Briefcase className="h-4 w-4" /> 
                <span>Accepted for {candidate.jobTitle}</span>
              </Link>
            </div>
            <div className="text-right text-sm text-muted-foreground">
                <p>Accepted on</p>
                <p className="font-medium text-foreground">{format(new Date(candidate.acceptedDate), 'PPP')}</p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
