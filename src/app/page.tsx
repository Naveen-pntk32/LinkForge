import { ShortenForm } from '@/components/home/ShortenForm';
import { QrCode, Link as LinkIcon } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"


export default function Home() {
  return (
    <div className="container mx-auto max-w-4xl py-12 px-4 text-center">
      <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl font-headline">
        Build stronger digital connections
      </h1>
      <p className="mt-6 text-lg text-muted-foreground sm:text-xl max-w-3xl mx-auto">
        Use our URL shortener, QR Codes, and landing pages to engage your audience and connect them to the right information. Build, edit, and track everything inside the LinkForge Connections Platform.
      </p>
      
      <Tabs defaultValue="short-link" className="w-full max-w-md mx-auto mt-12">
        <TabsList className="grid w-full grid-cols-2 bg-secondary">
          <TabsTrigger value="short-link"><LinkIcon className="mr-2"/>Short link</TabsTrigger>
          <TabsTrigger value="qr-code"><QrCode className="mr-2"/>QR Code</TabsTrigger>
        </TabsList>
        <TabsContent value="short-link">
          <ShortenForm />
        </TabsContent>
        <TabsContent value="qr-code">
          <div className="text-center text-muted-foreground p-8 border-dashed border-2 rounded-lg mt-4">
            QR Code functionality coming soon!
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
