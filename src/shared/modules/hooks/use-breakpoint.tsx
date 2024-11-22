'use client';

import { useEffect, useState } from 'react';

export type Breakpoint =
  | 'small-phone'
  | 'phone'
  | 'small-tablet'
  | 'tablet'
  | 'desktop';

const BREAKPOINT_VALUES: Record<Breakpoint, number> = {
  'small-phone': 480,
  phone: 640,
  'small-tablet': 768,
  tablet: 1024,
  desktop: 1280,
};

export function useBreakpoint(breakpoint: Breakpoint = 'phone') {
  const [matches, setMatches] = useState<boolean>(false);

  useEffect(() => {
    const width = BREAKPOINT_VALUES[breakpoint]; // Obtém o valor do breakpoint
    const mediaQuery = window.matchMedia(`(max-width: ${width}px)`);

    const updateMatch = () => setMatches(mediaQuery.matches);

    mediaQuery.addEventListener('change', updateMatch);
    updateMatch();

    return () => mediaQuery.removeEventListener('change', updateMatch);
  }, [breakpoint]);

  return matches;
}
