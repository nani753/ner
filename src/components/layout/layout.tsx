"use client";

import { MainNav } from './main-nav';
import { Footer } from './footer';
import { Toaster } from '@/components/ui/sonner';

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="relative min-h-screen">
      <MainNav />
      <main className="container mx-auto px-4 py-8">{children}</main>
      <Footer />
      <Toaster />
    </div>
  );
}