"use client";

import { useEffect, useState } from 'react';
import { useParams, notFound } from 'next/navigation';
import { useLinkStore } from '@/hooks/useLinkStore';
import { Loader2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function ShortcodeRedirectPage() {
  const { shortcode } = useParams<{ shortcode: string }>();
  const { getLink, logClick, isInitialized } = useLinkStore();
  const [status, setStatus] = useState<'loading' | 'redirecting' | 'error'>('loading');

  useEffect(() => {
    if (!isInitialized || !shortcode) {
      return;
    }

    const link = getLink(shortcode);

    if (link) {
      const isExpired = link.expiresAt && new Date(link.expiresAt) < new Date();
      if (isExpired) {
        setStatus('error');
        notFound();
      } else {
        setStatus('redirecting');
        logClick(shortcode);
        window.location.replace(link.originalUrl);
      }
    } else {
      setStatus('error');
      notFound();
    }
  }, [shortcode, getLink, logClick, isInitialized]);
  
  if (status === 'redirecting' || status === 'loading') {
    return (
        <div className="flex min-h-screen items-center justify-center bg-background p-4">
            <Card className="text-center shadow-lg">
                <CardHeader>
                    <CardTitle>Redirecting</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col items-center justify-center space-y-4">
                    <Loader2 className="h-12 w-12 animate-spin text-primary" />
                    <p className="text-muted-foreground">Please wait while we send you to your destination...</p>
                </CardContent>
            </Card>
        </div>
    );
  }

  return null;
}
