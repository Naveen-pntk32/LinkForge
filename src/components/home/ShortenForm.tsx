"use client";

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Copy, Check, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useLinkStore } from '@/hooks/useLinkStore';
import { useToast } from '@/hooks/use-toast';
import type { ShortLink } from '@/lib/types';
import { Label } from '../ui/label';

const formSchema = z.object({
  originalUrl: z.string().url({ message: 'Please enter a valid URL.' }),
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
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    const result = addLink(
      values.originalUrl
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
    <Card className="w-full text-left shadow-lg animate-in fade-in-0 duration-500 rounded-2xl">
      <CardHeader>
        <CardTitle className="text-xl font-semibold">
            Shorten a long link
        </CardTitle>
        <CardDescription>No credit card required.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
             <div className="space-y-2">
              <Label htmlFor='originalUrl' className="font-semibold">Paste your long link here</Label>
              <FormField
                control={form.control}
                name="originalUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input id="originalUrl" placeholder="https://example.com/my-long-url" {...field} className="bg-background h-12" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground" size="lg" disabled={form.formState.isSubmitting}>
              Get your link for free
              <ArrowRight className="ml-2 h-4 w-4"/>
            </Button>
          </form>
        </Form>
        {newLink && (
          <div className="mt-8 p-4 border-dashed border-2 rounded-lg bg-secondary/50 animate-in fade-in-0 duration-500">
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
