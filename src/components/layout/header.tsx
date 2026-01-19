'use client';

import { usePathname } from 'next/navigation';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { Suspense } from 'react';
import DashboardSearch from './dashboard-search';
import { Skeleton } from '../ui/skeleton';

function SearchFallback() {
    return <Skeleton className="h-9 w-full md:w-1/3" />
}

export default function AppHeader() {
  const pathname = usePathname();
  const showSearch = pathname === '/';

  return (
    <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background/95 px-4 md:px-6">
      <SidebarTrigger className="md:hidden" />
      {showSearch && (
        <Suspense fallback={<SearchFallback />}>
          <DashboardSearch />
        </Suspense>
      )}
    </header>
  );
}
