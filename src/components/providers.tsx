'use client';

import { ThemeProvider } from 'next-themes';
import { SessionProvider } from 'next-auth/react';
import { useState, useEffect, type ReactNode } from 'react';

interface ProvidersProps {
  children: ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <SessionProvider>
      <ThemeProvider 
        attribute="class" 
        defaultTheme="system"
        enableSystem
      >
        {mounted ? children : null}
      </ThemeProvider>
    </SessionProvider>
  );
}