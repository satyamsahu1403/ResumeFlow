'use client';

import { useEffect, useState } from 'react';
import { useTheme } from '@/components/theme-provider';
import type { Theme } from '@/components/theme-provider';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useToast } from '@/hooks/use-toast';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { LogOut, Sun, Moon, Laptop } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

function SettingsSkeleton() {
  return (
    <div className="space-y-8">
      <Skeleton className="h-9 w-48 rounded-md" />
      <Card>
          <CardHeader>
              <Skeleton className="h-6 w-32 rounded-md" />
              <Skeleton className="h-4 w-64 mt-2 rounded-md" />
          </CardHeader>
          <CardContent>
              <div className="grid max-w-md grid-cols-3 gap-4 pt-2">
                  <Skeleton className="h-24 rounded-md" />
                  <Skeleton className="h-24 rounded-md" />
                  <Skeleton className="h-24 rounded-md" />
              </div>
          </CardContent>
      </Card>
      <Card>
          <CardHeader>
              <Skeleton className="h-6 w-24 rounded-md" />
              <Skeleton className="h-4 w-48 mt-2 rounded-md" />
          </CardHeader>
          <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                      <Skeleton className="h-16 w-16 rounded-full" />
                      <div>
                          <Skeleton className="h-6 w-20 rounded-md" />
                          <Skeleton className="h-4 w-40 mt-2 rounded-md" />
                      </div>
                  </div>
                  <Skeleton className="h-10 w-32 rounded-md" />
              </div>
              <Skeleton className="h-10 w-32 rounded-md" />
          </CardContent>
      </Card>
    </div>
  )
}

export default function SettingsPage() {
  const [mounted, setMounted] = useState(false);
  const { setTheme, theme } = useTheme();
  const { toast } = useToast();
  
  useEffect(() => {
    setMounted(true);
  }, []);

  const handleLogout = () => {
    toast({
      title: 'Logged Out',
      description: 'You have been successfully logged out.',
    });
  };

  if (!mounted) {
    return <SettingsSkeleton />;
  }

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
      
      <Card>
        <CardHeader>
          <CardTitle>Appearance</CardTitle>
          <CardDescription>
            Customize the look and feel of the app. Select a theme.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <RadioGroup
            value={theme}
            onValueChange={(value: string) => setTheme(value as Theme)}
            className="grid max-w-md grid-cols-3 gap-4 pt-2"
          >
            <div>
              <RadioGroupItem value="light" id="light" className="peer sr-only" />
              <Label
                htmlFor="light"
                className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer"
              >
                <Sun className="h-6 w-6 mb-2" />
                Light
              </Label>
            </div>
            <div>
              <RadioGroupItem value="dark" id="dark" className="peer sr-only" />
              <Label
                htmlFor="dark"
                className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer"
              >
                <Moon className="h-6 w-6 mb-2" />
                Dark
              </Label>
            </div>
            <div>
              <RadioGroupItem value="system" id="system" className="peer sr-only" />
              <Label
                htmlFor="system"
                className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer"
              >
                <Laptop className="h-6 w-6 mb-2" />
                System
              </Label>
            </div>
          </RadioGroup>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Account</CardTitle>
          <CardDescription>
            Manage your account settings.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Avatar className="h-16 w-16">
                        <AvatarImage src="https://picsum.photos/seed/user/100/100" alt="User" />
                        <AvatarFallback>U</AvatarFallback>
                    </Avatar>
                    <div>
                        <p className="font-semibold text-lg">User</p>
                        <p className="text-sm text-muted-foreground">user@example.com</p>
                    </div>
                </div>
                <Button variant="outline">Change Avatar</Button>
            </div>
             <Button variant="destructive" onClick={handleLogout} className="w-full md:w-auto">
                <LogOut className="mr-2 h-4 w-4" />
                Logout
            </Button>
        </CardContent>
      </Card>
    </div>
  );
}
