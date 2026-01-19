'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
} from '@/components/ui/sidebar';
import AppLogo from '@/components/app-logo';
import {
  LayoutDashboard,
  Users,
  Briefcase,
  Settings,
  LogOut,
} from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';

const menuItems = [
  { href: '/', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/jobs', label: 'Job Openings', icon: Briefcase },
  { href: '/candidates', label: 'Candidates', icon: Users },
  { href: '/settings', label: 'Settings', icon: Settings },
];

export default function AppSidebar() {
  const pathname = usePathname();
  const { toast } = useToast();

  const handleLogout = () => {
    toast({
      title: 'Logged Out',
      description: 'You have been successfully logged out.',
    });
    // In a real app, you would call a sign-out function and redirect.
  };


  return (
    <Sidebar className="border-r border-border/20">
      <SidebarHeader>
        <AppLogo />
      </SidebarHeader>
      <SidebarContent className="p-4">
        <SidebarMenu>
          {menuItems.map((item) => (
            <SidebarMenuItem key={item.href}>
              <SidebarMenuButton
                asChild
                isActive={pathname === item.href}
                tooltip={item.label}
              >
                <Link href={item.href}>
                  <item.icon />
                  <span>{item.label}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <Separator className="my-2" />
      <SidebarFooter className="p-4">
        <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10">
                <AvatarImage src="https://picsum.photos/seed/user/100/100" alt="User" />
                <AvatarFallback>U</AvatarFallback>
            </Avatar>
            <div className="flex flex-col text-sm truncate">
                <span className="font-semibold">User</span>
                <span className="text-muted-foreground">user@example.com</span>
            </div>
            <LogOut onClick={handleLogout} className="ml-auto h-5 w-5 text-muted-foreground cursor-pointer hover:text-foreground" />
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
