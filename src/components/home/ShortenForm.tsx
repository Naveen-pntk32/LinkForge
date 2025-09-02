"use client";

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Copy, Check, Wand2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useLinkStore } from '@/hooks/useLinkStore';
import { useToast } from '@/hooks/use-toast';
import type { ShortLink } from '@/lib/types';
import { Label } from '../ui/label';

const formSchema = z.object({
  originalUrl: z.string().url({ message: 'Please enter a valid URL.' }),
  validityPeriod: z.coerce
    .number()
    .int()
    .positive({ message: 'Must be a positive number.' })
    .optional()
    .or(z.literal('')),
  customShortcode: z
    .string()
    .regex(/^[a-zA-Z0-9]*$/, {
      message: 'Shortcode can only contain letters and numbers.',
    })
    .optional(),
});

export function ShortenForm() {
  const [newLink, setNewLink] = useState<ShortLink | null>(null);
  const [isCopied, setIsCopied] = useState(false);
  const { addLink } = useLinkStore();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      originalUrl: '',
      validityPeriod: '',
      customShortcode: '',
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    const result = addLink(
      values.originalUrl,
      values.validityPeriod ? Number(values.validityPeriod) : undefined,
      values.customShortcode
    );

    if (result) {
      setNewLink(result);
      toast({
        title: 'Success!',
        description: 'Your short link has been created.',
      });
      form.reset();
    }
  }
  
  const handleCopy = () => {
    if (newLink?.shortUrl) {
      navigator.clipboard.writeText(newLink.shortUrl);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    }
  };

  return (
    <Card className="w-full text-left shadow-lg animate-in fade-in-0 duration-500">
      <CardHeader>
        <CardTitle className="font-headline flex items-center">
            <Wand2 className="mr-2 text-primary"/>
            Create a new short link
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="originalUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Long URL</FormLabel>
                  <FormControl>
                    <Input placeholder="https://example.com/very-long-url-to-shorten" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="validityPeriod"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Validity (days, optional)</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="e.g., 30" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="customShortcode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Custom Shortcode (optional)</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., my-link" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button type="submit" className="w-full md:w-auto bg-accent hover:bg-accent/90" size="lg" disabled={form.formState.isSubmitting}>
              Shorten URL
            </Button>
          </form>
        </Form>
        {newLink && (
          <div className="mt-8 p-4 border-dashed border-2 border-primary rounded-lg bg-secondary/50 animate-in fade-in-0 duration-500">
              <Label htmlFor="short-url">Your new link is ready!</Label>
            <div className="flex items-center space-x-2 mt-2">
              <Input id="short-url" readOnly value={newLink.shortUrl} className="bg-background" />
              <Button variant="outline" size="icon" onClick={handleCopy}>
                {isCopied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
                <span className="sr-only">Copy to clipboard</span>
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
