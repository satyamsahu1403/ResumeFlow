import type { Metadata } from 'next';
import './globals.css';
import { Inter } from 'next/font/google';
import { cn } from '@/lib/utils';
import { Toaster } from '@/components/ui/toaster';
import { SidebarProvider } from '@/components/ui/sidebar';
import AppSidebar from '@/components/layout/sidebar';
import AppHeader from '@/components/layout/header';
import { ThemeProvider } from '@/components/theme-provider';
import { Suspense } from 'react';
import { Skeleton } from '@/components/ui/skeleton';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata: Metadata = {
  title: 'ResumeFlow AI',
  description: 'An AI-powered resume shortlisting application.',
};

function AppHeaderFallback() {
  return <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background/80 backdrop-blur-sm px-4 md:px-6" />;
}

function AppSidebarFallback() {
  return (
    <div className="hidden md:flex flex-col w-[16rem] border-r border-border/20 p-4">
      <Skeleton className="h-8 w-32 mb-8" />
      <div className="space-y-2 flex-1">
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
      </div>
      <Skeleton className="h-px w-full my-2" />
      <Skeleton className="h-10 w-full" />
    </div>
  );
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn('font-sans antialiased', inter.variable)}>
        <ThemeProvider>
          <SidebarProvider>
            <div className="flex min-h-screen w-full">
              <Suspense fallback={<AppSidebarFallback />}>
                <AppSidebar />
              </Suspense>
              <div className="flex flex-col w-full">
                <Suspense fallback={<AppHeaderFallback />}>
                  <AppHeader />
                </Suspense>
                <main className="flex-1 overflow-y-auto p-4 md:p-8 pt-6">
                  {children}
                </main>
              </div>
            </div>
          </SidebarProvider>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
