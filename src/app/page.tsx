import { ShortenForm } from '@/components/home/ShortenForm';

export default function Home() {
  return (
    <div className="container mx-auto max-w-4xl py-12 px-4 text-center">
      <h1 className="text-4xl font-bold tracking-tight text-primary sm:text-5xl md:text-6xl font-headline">
        LinkForge
      </h1>
      <p className="mt-4 text-lg text-muted-foreground sm:text-xl">
        Create short, powerful links and track their every move.
      </p>
      <div className="mt-12">
        <ShortenForm />
      </div>
    </div>
  );
}
