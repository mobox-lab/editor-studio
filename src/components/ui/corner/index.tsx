import { clsxm } from '@/utils';
import { ReactNode } from 'react';
import { tv } from 'tailwind-variants';

type CornerProps = {
  className?: string;
  type?: 'green' | 'gold';
  position?: 'top-left' | 'top-right';
  children?: ReactNode;
};
const cornerStyles = tv({
  base: 'absolute px-1.5 py-2 text-xs/3 font-bold',
  variants: {
    type: {
      green: 'bg-gradient-green text-black',
      gold: 'bg-gradient-corner-gold text-[#3A0B00]',
    },
    position: {
      'top-left': 'rounded-ee-lg top-0 left-0',
      'top-right': 'rounded-es-lg top-0 right-0',
    },
  },
  defaultVariants: {
    type: 'green',
    position: 'top-left',
  },
});

const Corner = ({ className, type = 'green', position = 'top-left', children }: CornerProps) => {
  return <div className={clsxm(cornerStyles({ type, position }), className)}>{children}</div>;
};

export default Corner;

// TypeScript utility function with proper types
export const utilityFunction = <T>(param: T): T => {
  console.log('Executing utility function:', param);
  return param;
};
