'use client';

import { useState, useEffect, useRef, useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { createJob } from '@/app/actions';
import { useToast } from '@/hooks/use-toast';

const initialState = {
  errors: {},
  success: false,
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending}>
      {pending ? 'Creating...' : 'Create Job'}
    </Button>
  );
}

export default function NewJobDialog({ children }: { children: React.ReactNode }) {
  const [state, formAction] = useActionState(createJob, initialState);
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.success) {
      toast({
        title: 'Job Created',
        description: 'The new job opening has been posted.',
      });
      setIsOpen(false);
      formRef.current?.reset();
    } else if (Object.keys(state.errors ?? {}).length > 0) {
      const errorMessages = Object.values(state.errors).flat().join(' ');
      toast({
        title: 'Error creating job',
        description: errorMessages || 'Please check the form for errors.',
        variant: 'destructive',
      });
    }
  }, [state, toast]);
  
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle>Create New Job Opening</DialogTitle>
          <DialogDescription>
            Fill in the details below to post a new job. Click create when you're done.
          </DialogDescription>
        </DialogHeader>
        <form ref={formRef} action={formAction}>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="title">Job Title</Label>
              <Input id="title" name="title" placeholder="e.g. Senior Frontend Engineer" />
              {state.errors?.title && <p className="text-xs text-destructive">{state.errors.title[0]}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="department">Department</Label>
              <Input id="department" name="department" placeholder="e.g. Engineering" />
              {state.errors?.department && <p className="text-xs text-destructive">{state.errors.department[0]}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input id="location" name="location" placeholder="e.g. Remote, US" />
              {state.errors?.location && <p className="text-xs text-destructive">{state.errors.location[0]}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea id="description" name="description" placeholder="Describe the role, responsibilities, and requirements." />
              {state.errors?.description && <p className="text-xs text-destructive">{state.errors.description[0]}</p>}
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
                <Button type="button" variant="outline">Cancel</Button>
            </DialogClose>
            <SubmitButton />
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
