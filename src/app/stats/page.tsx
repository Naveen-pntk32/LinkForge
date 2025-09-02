import { StatsTable } from '@/components/stats/StatsTable';

export default function StatsPage() {
  return (
    <div className="container mx-auto py-12 px-4">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight text-primary sm:text-5xl font-headline">
          Link Statistics
        </h1>
        <p className="mt-4 text-lg text-muted-foreground sm:text-xl">
          Track the performance of your shortened URLs.
        </p>
      </div>
      <StatsTable />
    </div>
  );
}
