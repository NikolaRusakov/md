import facepaint from 'facepaint';

export const breakpoints = [576, 768, 1200];

export const mq = facepaint(breakpoints.map(bp => `@media (min-width: ${bp}px)`));

export const mediaQueries = {
  sm: '(min-width: 576px)',
  md: '(min-width: 768px)',
  lg: '(min-width: 1200px)',
  prefersReducedMotion: '(prefers-reduced-motion: reduce)',
};
