"use client";

import { useLinkStore } from '@/hooks/useLinkStore';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Copy, Check, Eye, ExternalLink, Calendar, AlertCircle } from 'lucide-react';
import { useState } from 'react';
import { format, formatDistanceToNow } from 'date-fns';
import { Skeleton } from '../ui/skeleton';

export function StatsTable() {
  const { links, isInitialized } = useLinkStore();
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  if (!isInitialized) {
    return (
        <div className="space-y-4">
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-12 w-full" />
        </div>
    );
  }

  if (links.length === 0) {
    return (
      <Card className="text-center py-16 animate-in fade-in-0 duration-500">
        <CardContent>
          <AlertCircle className="mx-auto h-12 w-12 text-muted-foreground" />
          <h3 className="mt-4 text-lg font-medium">No links yet</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            Create your first short link to see statistics here.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="shadow-lg animate-in fade-in-0 duration-500">
      <CardContent className="p-0">
        <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Short Link</TableHead>
              <TableHead className="hidden md:table-cell">Original URL</TableHead>
              <TableHead className="hidden sm:table-cell">Expires</TableHead>
              <TableHead>Clicks</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {links.map((link) => {
                const isExpired = link.expiresAt && new Date(link.expiresAt) < new Date();
                return (
              <TableRow key={link.id} className={isExpired ? "bg-muted/50" : ""}>
                <TableCell className="font-medium">
                  <div className="flex items-center space-x-2">
                    <a href={link.shortUrl} target="_blank" rel="noopener noreferrer" className="hover:underline text-primary truncate">{link.shortUrl.replace('https://', '').replace('http://', '')}</a>
                    <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => handleCopy(link.shortUrl, link.id)}>
                        {copiedId === link.id ? <Check className="h-4 w-4 text-green-500"/> : <Copy className="h-4 w-4"/>}
                    </Button>
                  </div>
                </TableCell>
                <TableCell className="hidden md:table-cell max-w-xs truncate">
                    <a href={link.originalUrl} title={link.originalUrl} target="_blank" rel="noopener noreferrer" className="hover:underline">
                        {link.originalUrl}
                    </a>
                </TableCell>
                <TableCell className="hidden sm:table-cell">
                  {link.expiresAt ? (
                    <Badge variant={isExpired ? "destructive" : "secondary"}>
                      <Calendar className="mr-1 h-3 w-3" />
                      {isExpired ? 'Expired' : `in ${formatDistanceToNow(new Date(link.expiresAt))}`}
                    </Badge>
                  ) : (
                    <Badge variant="outline">Never</Badge>
                  )}
                </TableCell>
                <TableCell>{link.clicks.length}</TableCell>
                <TableCell>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm" disabled={link.clicks.length === 0}>
                        <Eye className="mr-2 h-4 w-4" /> View
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-3xl">
                      <DialogHeader>
                        <DialogTitle>Click Analytics for /{link.id}</DialogTitle>
                      </DialogHeader>
                      <div className="max-h-[60vh] overflow-y-auto">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Timestamp</TableHead>
                                    <TableHead>Location</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {link.clicks.map((click) => (
                                    <TableRow key={click.timestamp}>
                                        <TableCell>{format(new Date(click.timestamp), "PPP p")}</TableCell>
                                        <TableCell>{click.geo.city}, {click.geo.country}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                      </div>
                    </DialogContent>
                  </Dialog>
                </TableCell>
              </TableRow>
            )})}
          </TableBody>
        </Table>
        </div>
      </CardContent>
    </Card>
  );
}
