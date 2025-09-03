import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Book, LifeBuoy, Code2 } from 'lucide-react';
import Link from 'next/link';

const resources = [
  {
    icon: <Book className="h-8 w-8 text-primary" />,
    title: 'Blog',
    description: 'Stay up to date with the latest industry trends, product news, and case studies.',
    link: '#',
  },
  {
    icon: <LifeBuoy className="h-8 w-8 text-primary" />,
    title: 'Help Center',
    description: 'Find answers to your questions and get help from our support team.',
    link: '#',
  },
  {
    icon: <Code2 className="h-8 w-8 text-primary" />,
    title: 'API Documentation',
    description: 'Integrate LinkForge with your own applications using our powerful and flexible API.',
    link: '#',
  },
];

export default function ResourcesPage() {
  return (
    <div className="container mx-auto max-w-6xl py-12 px-4">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl font-headline">
          Resources
        </h1>
        <p className="mt-6 text-lg text-muted-foreground sm:text-xl max-w-3xl mx-auto">
          Explore our collection of resources to get the most out of LinkForge.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {resources.map((resource) => (
          <Card key={resource.title} className="flex flex-col shadow-lg">
            <CardHeader className="flex-row items-center gap-4">
              {resource.icon}
              <CardTitle className="text-2xl">{resource.title}</CardTitle>
            </CardHeader>
            <CardContent className="flex-1">
              <CardDescription>{resource.description}</CardDescription>
            </CardContent>
            <CardFooter>
              <Button asChild variant="outline">
                <Link href={resource.link}>Learn more</Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
