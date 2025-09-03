import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Check } from 'lucide-react';

const tiers = [
  {
    name: 'Free',
    price: '$0',
    description: 'For individuals just getting started.',
    features: [
      '10 short links per month',
      'Basic analytics',
      'QR code generation',
      'Community support',
    ],
    cta: 'Sign up for free',
  },
  {
    name: 'Pro',
    price: '$29',
    description: 'For professionals with growing needs.',
    features: [
      '1,500 short links per month',
      'Advanced analytics',
      'Branded links',
      'Email support',
    ],
    cta: 'Get started',
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    description: 'For large teams with custom requirements.',
    features: [
      'Unlimited short links',
      'Dedicated account manager',
      'Custom integrations',
      '24/7 priority support',
    ],
    cta: 'Contact sales',
  },
];

export default function PricingPage() {
  return (
    <div className="container mx-auto max-w-6xl py-12 px-4">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl font-headline">
          Find the perfect plan for you
        </h1>
        <p className="mt-6 text-lg text-muted-foreground sm:text-xl max-w-3xl mx-auto">
          Start for free and scale up as you grow. No credit card required.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {tiers.map((tier) => (
          <Card key={tier.name} className="flex flex-col shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl">{tier.name}</CardTitle>
              <CardDescription>{tier.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex-1">
              <div className="mb-6">
                <span className="text-4xl font-bold">{tier.price}</span>
                {tier.name !== 'Enterprise' && <span className="text-muted-foreground">/month</span>}
              </div>
              <ul className="space-y-3">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-2" />
                    <span className="text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Button className="w-full">{tier.cta}</Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
