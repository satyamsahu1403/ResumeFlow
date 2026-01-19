'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { UploadCloud, FileText, LoaderCircle, CheckCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Job, Candidate } from '@/lib/types';
import { uploadAndScoreResume } from '@/app/actions';

interface DragAndDropUploadProps {
  job: Job;
  onUploadSuccess: (candidate: Candidate) => void;
}

export default function DragAndDropUpload({ job, onUploadSuccess }: DragAndDropUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState<'idle' | 'uploading' | 'success' | 'error'>('idle');
  const { toast } = useToast();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFile(e.target.files[0]);
    }
  };
  
  const handleFile = (droppedFile: File) => {
    if (droppedFile.type !== 'application/pdf') {
      toast({
        title: 'Invalid File Type',
        description: 'Please upload a PDF file.',
        variant: 'destructive',
      });
      return;
    }
    setFile(droppedFile);
    handleUpload(droppedFile);
  };
  
  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFile(e.dataTransfer.files[0]);
      e.dataTransfer.clearData();
    }
  };
  
  const handleUpload = async (fileToUpload: File) => {
    setStatus('uploading');
    
    const reader = new FileReader();
    reader.readAsDataURL(fileToUpload);
    reader.onload = async () => {
      const resumeDataUri = reader.result as string;
      try {
        const result = await uploadAndScoreResume({
          jobId: job.id,
          jobDescription: job.description,
          resumeDataUri,
          fileName: fileToUpload.name,
        });
        
        if (result.success && result.candidate) {
          setStatus('success');
          toast({
            title: 'Upload Successful',
            description: `${fileToUpload.name} has been uploaded and scored.`,
          });
          onUploadSuccess(result.candidate);
        } else {
          throw new Error('Resume scoring failed.');
        }
        
        setTimeout(() => {
          setFile(null);
          setStatus('idle');
        }, 2000);

      } catch (error) {
        setStatus('error');
        toast({
          title: 'Upload Failed',
          description: 'Something went wrong while scoring the resume.',
          variant: 'destructive',
        });
        setTimeout(() => setStatus('idle'), 2000);
      }
    };
    reader.onerror = () => {
        setStatus('error');
        toast({
          title: 'File Read Error',
          description: 'Could not read the selected file.',
          variant: 'destructive',
        });
    };
  };

  return (
    <div
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      className="relative"
    >
      <motion.div
        animate={{ scale: isDragging ? 1.05 : 1 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        className="w-full p-8 border-2 border-dashed rounded-lg text-center cursor-pointer transition-colors bg-card/50 backdrop-blur-sm"
      >
        <input
          type="file"
          id="file-upload"
          className="hidden"
          onChange={handleFileChange}
          accept="application/pdf"
        />
        <label htmlFor="file-upload" className="cursor-pointer">
          <UploadCloud className="mx-auto h-12 w-12 text-muted-foreground" />
          <p className="mt-4 text-lg font-semibold">
            Drag & Drop your resume here
          </p>
          <p className="text-sm text-muted-foreground">or click to browse (PDF only)</p>
        </label>
      </motion.div>
      {file && (
        <div className="mt-4 flex items-center gap-3 rounded-lg border p-3 bg-card/70">
          <FileText className="h-6 w-6 text-primary" />
          <p className="flex-1 truncate text-sm">{file.name}</p>
          {status === 'uploading' && <LoaderCircle className="h-5 w-5 animate-spin text-primary" />}
          {status === 'success' && <CheckCircle className="h-5 w-5 text-green-500" />}
        </div>
      )}
    </div>
  );
}
