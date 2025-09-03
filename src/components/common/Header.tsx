"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Logo } from './Logo';
import { Button } from '@/components/ui/button';
import { ChevronDown, Globe, Menu, X } from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useState } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const navLinks = [
    { href: '/platform', label: 'Platform' },
    { href: '/pricing', label: 'Pricing' },
    { href: '/resources', label: 'Resources' },
];

export function Header() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const NavLink = ({ href, label}: typeof navLinks[0] & {onClick?: () => void}) => (
    <Link href={href} passHref>
      <Button
        variant={'ghost'}
        className="justify-start w-full md:w-auto text-foreground/80 hover:text-foreground"
      >
        {label}
        {href.startsWith('#') && <ChevronDown className="ml-1 h-4 w-4" />}
      </Button>
    </Link>
  );

  return (
    <>
      <div className="bg-secondary text-secondary-foreground text-center p-2 text-sm font-semibold">
        NEW Get fresh insights into how marketers are using QR Codes in 2025 and beyond. <a href="#" className="underline">Read the report →</a>
      </div>
      <header className="sticky top-0 z-50 w-full border-b border-border/60 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center">
          <div className="mr-8 flex">
            <Link href="/" className="flex items-center space-x-2">
              <Logo />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navLinks.map(link => <NavLink key={link.label} {...link} />)}
          </nav>

          <div className="flex flex-1 items-center justify-end space-x-2">
             <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost">
                  <Globe className="h-4 w-4 mr-2" />
                  EN
                  <ChevronDown className="ml-1 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>English</DropdownMenuItem>
                <DropdownMenuItem>Español</DropdownMenuItem>
                <DropdownMenuItem>Français</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button variant="ghost">Log in</Button>
            <Button variant="outline" className="hidden sm:inline-flex">Get a Quote</Button>
            <Button className="hidden sm:inline-flex bg-primary hover:bg-primary/90">Sign up Free</Button>

            <div className="md:hidden">
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
                      </Link>
                    </div>
                  <nav className="flex flex-col space-y-2">
                    {navLinks.map(link => <NavLink key={link.label} {...link} />)}
                    <Button variant="ghost" className="w-full justify-start">Log in</Button>
                    <Button variant="outline" className="w-full justify-start">Get a Quote</Button>
                    <Button className="w-full justify-start">Sign up Free</Button>
                  </nav>
                </div>
              </SheetContent>
            </Sheet>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
