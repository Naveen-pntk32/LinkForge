import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, BarChart2, Link as LinkIcon, QrCode } from 'lucide-react';

export default function PlatformPage() {
  const features = [
    {
      icon: <LinkIcon className="h-8 w-8 text-primary" />,
      title: 'URL Shortening',
      description: 'Create short, memorable links from long URLs. Perfect for sharing on social media and other platforms.',
    },
    {
      icon: <BarChart2 className="h-8 w-8 text-primary" />,
      title: 'Advanced Analytics',
      description: 'Track every click and measure your campaign performance with detailed analytics and reporting.',
    },
    {
      icon: <QrCode className="h-8 w-8 text-primary" />,
      title: 'QR Codes',
      description: 'Generate and customize QR Codes to connect with your audience in the physical world.',
    },
    {
      icon: <CheckCircle className="h-8 w-8 text-primary" />,
      title: 'Branded Links',
      description: 'Increase brand recognition and trust with custom, branded links that feature your own domain name.',
    },
  ];

  return (
    <div className="container mx-auto max-w-6xl py-12 px-4">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl font-headline">
          The LinkForge Platform
        </h1>
        <p className="mt-6 text-lg text-muted-foreground sm:text-xl max-w-3xl mx-auto">
          Everything you need to build brand connections, manage links and QR Codes, and connect with audiences everywhere.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {features.map((feature) => (
          <Card key={feature.title} className="shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader className="flex flex-row items-center gap-4">
              {feature.icon}
              <CardTitle className="text-2xl">{feature.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{feature.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
