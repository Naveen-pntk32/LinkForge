"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Logo } from './Logo';
import { Button } from '@/components/ui/button';
import { Link2, BarChart3, Menu, X } from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useState } from 'react';
import { cn } from '@/lib/utils';

const navLinks = [
  { href: '/', label: 'New Link', icon: Link2 },
  { href: '/stats', label: 'Statistics', icon: BarChart3 },
];

export function Header() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const NavLink = ({ href, label, icon: Icon }: typeof navLinks[0] & {onClick?: () => void}) => (
    <Link href={href} passHref>
      <Button
        variant={pathname === href ? 'secondary' : 'ghost'}
        className="justify-start w-full md:w-auto"
        onClick={() => setIsMobileMenuOpen(false)}
      >
        <Icon className="mr-2 h-4 w-4" />
        {label}
      </Button>
    </Link>
  );

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <Logo />
            <span className="font-bold hidden sm:inline-block font-headline">
              LinkForge
            </span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-2">
          {navLinks.map(link => <NavLink key={link.href} {...link} />)}
        </nav>

        <div className="flex flex-1 items-center justify-end md:hidden">
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Open Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <div className="p-4">
                 <div className="flex items-center justify-between mb-8">
                    <Link href="/" className="flex items-center space-x-2" onClick={() => setIsMobileMenuOpen(false)}>
                      <Logo />
                      <span className="font-bold font-headline">LinkForge</span>
                    </Link>
                  </div>
                <nav className="flex flex-col space-y-2">
                  {navLinks.map(link => <NavLink key={link.href} {...link} />)}
                </nav>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
