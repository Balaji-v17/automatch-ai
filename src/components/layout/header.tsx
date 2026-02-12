'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu } from 'lucide-react';
import { Icons } from '@/components/icons';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { useState, useMemo } from 'react';
import { useCompare } from '@/context/compare-context';

export default function Header() {
  const pathname = usePathname();
  const [isMenuOpen, setMenuOpen] = useState(false);
  const { selectedIds } = useCompare();

  const navLinks = useMemo(
    () => [
      { href: '/#find', label: 'Find a Vehicle' },
      { href: '/vehicles', label: 'All Vehicles' },
      {
        href:
          selectedIds.length > 0
            ? `/compare?ids=${selectedIds.join(',')}`
            : '/compare',
        label: `Compare ${
          selectedIds.length > 0 ? `(${selectedIds.length})` : ''
        }`.trim(),
      },
      { href: '/trends', label: 'Trends' },
    ],
    [selectedIds]
  );

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <div className="mr-4 hidden md:flex">
          <Link href="/" className="flex items-center space-x-2">
            <Icons.logo className="h-6 w-6 text-primary" />
            <span className="font-bold">AutoMatch AI</span>
          </Link>
        </div>

        <div className="md:hidden">
          <Sheet open={isMenuOpen} onOpenChange={setMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px] sm:w-[400px]">
              <div className="flex flex-col gap-4 p-4">
                <Link
                  href="/"
                  className="mb-4 flex items-center space-x-2"
                  onClick={() => setMenuOpen(false)}
                >
                  <Icons.logo className="h-6 w-6 text-primary" />
                  <span className="font-bold">AutoMatch AI</span>
                </Link>
                <nav className="flex flex-col gap-4">
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setMenuOpen(false)}
                      className="text-lg transition-colors hover:text-primary"
                    >
                      {link.label}
                    </Link>
                  ))}
                </nav>
              </div>
            </SheetContent>
          </Sheet>
        </div>

        <div className="flex flex-1 items-center justify-center md:justify-start">
          <Link href="/" className="flex items-center space-x-2 md:hidden">
            <Icons.logo className="h-6 w-6 text-primary" />
            <span className="font-bold">AutoMatch AI</span>
          </Link>
          <nav className="hidden items-center space-x-6 text-sm font-medium md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'transition-colors hover:text-primary',
                  pathname === link.href ||
                    (link.href.startsWith('/compare') && pathname === '/compare')
                    ? 'text-primary'
                    : 'text-muted-foreground'
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
}
