import { cn } from '@/lib/utils';

/** Clases de botón compartidas por componentes de servidor y de cliente. */
export type Variant = 'primary' | 'secondary' | 'whatsapp' | 'ghost';
export type Size = 'md' | 'lg';

const base =
  'inline-flex items-center justify-center gap-2 rounded-[4px] font-medium transition-colors duration-200 cursor-pointer select-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold touch-manipulation';

const variants: Record<Variant, string> = {
  primary: 'bg-gold text-ink hover:bg-gold-strong',
  secondary: 'border border-bone/25 text-bone hover:border-gold hover:text-gold',
  whatsapp: 'bg-whatsapp text-ink hover:brightness-110',
  ghost: 'text-bone underline-offset-4 hover:text-gold hover:underline',
};

const sizes: Record<Size, string> = {
  md: 'h-11 px-5 text-sm',
  lg: 'h-14 px-7 text-base',
};

export function buttonClasses(variant: Variant = 'primary', size: Size = 'md', className?: string) {
  return cn(base, variants[variant], variant !== 'ghost' && sizes[size], className);
}

