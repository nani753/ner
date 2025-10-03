"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Home, Newspaper, Calendar, BookOpen, Package } from "lucide-react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useTheme } from 'next-themes';
import { Sun, Moon, Menu } from 'lucide-react';
import { useSession, signOut } from 'next-auth/react';

export function MainNav() {
  const { theme, setTheme } = useTheme();
  const { data: session } = useSession();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <Link href="/" className="flex items-center space-x-2">
          <span className="font-bold">NerlumaHub</span>
        </Link>
        <nav className="ml-6 hidden gap-6 md:flex">
          {[
            { href: "/products", label: "Products", icon: Package, color: "text-emerald-500" },
            { href: "/news", label: "News", icon: Newspaper, color: "text-violet-500" },
            { href: "/events", label: "Events", icon: Calendar, color: "text-pink-700" },
            { href: "/blog", label: "Blog", icon: BookOpen, color: "text-orange-700" },
          ].map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className={cn(
                "flex items-center space-x-2 text-sm font-medium transition-all hover:text-primary",
                usePathname() === route.href
                  ? "text-black dark:text-white"
                  : "text-muted-foreground"
              )}
            >
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="relative"
              >
                {usePathname() === route.href && (
                  <motion.span
                    layoutId="bubble"
                    className="absolute -bottom-4 left-0 right-0 h-1 rounded-full bg-primary"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <route.icon className={cn("h-5 w-5", route.color)} />
              </motion.div>
              <span>{route.label}</span>
            </Link>
          ))}
        </nav>
        <div className="flex flex-1 items-center justify-end space-x-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                <span className="sr-only">Toggle theme</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setTheme('light')}>
                Light
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme('dark')}>
                Dark
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme('system')}>
                System
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          {session ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>
                  <Link href="/profile">Profile</Link>
                </DropdownMenuItem>
                {session.user.role === 'admin' && (
                  <DropdownMenuItem>
                    <Link href="/admin">Admin Dashboard</Link>
                  </DropdownMenuItem>
                )}
                <DropdownMenuItem onClick={() => signOut()}>
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button asChild variant="secondary">
              <Link href="/auth/signin">Sign In</Link>
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}