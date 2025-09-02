import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { AlertTriangle } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="flex min-h-[calc(100vh-theme(spacing.14))] flex-col items-center justify-center text-center px-4">
      <AlertTriangle className="w-16 h-16 text-destructive mb-4" />
      <h1 className="text-4xl font-bold tracking-tight text-primary sm:text-6xl font-headline">
        404 - Not Found
      </h1>
      <p className="mt-4 text-lg text-muted-foreground">
        The link you are looking for might be expired, broken, or never existed.
      </p>
      <Button asChild className="mt-8">
        <Link href="/">Go back home</Link>
      </Button>
    </div>
  );
}
