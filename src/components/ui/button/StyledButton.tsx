import LoadingSvg from '@/../public/svg/loading.svg?component';
import { ForwardRefComponent } from 'framer-motion';
import { ButtonHTMLAttributes, forwardRef } from 'react';
import { tv } from 'tailwind-variants';

const buttonStyles = tv({
  base: 'rounded-sm text-center fill-white font-semibold flex justify-center items-center',
  variants: {
    variant: {
      default: 'bg-white/10 hover:bg-white/20',
      gradient: 'bg-gradient-p12 hover:brightness-110',
      'gradient-play': 'bg-gradient-play text-black hover:brightness-110',
      warning: 'bg-legendary/30 text-legendary hover:brightness-110',
      error: 'bg-red hover:brightness-110',
      bordered: 'border hover:bg-white/10',
      blue: 'bg-blue/20 hover:bg-blue/30 text-blue',
      'gradient-red': 'bg-gradient-red border border-red-400 hover:brightness-110',
      'gradient-green': 'bg-gradient-green border border-green-400 hover:brightness-110',
    },
    disabled: {
      true: 'bg-gray-300/10 text-gray-300 hover:brightness-100 hover:bg-gray-300/10 hover:opacity-100 disabled:cursor-not-allowed cursor-not-allowed',
    },
    loading: {
      true: 'cursor-progress',
    },
  },
});

export type NativeButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;
export type SharedProps = {
  variant?:
    | 'default'
    | 'gradient'
    | 'gradient-play'
    | 'bordered'
    | 'warning'
    | 'error'
    | 'blue'
    | 'gradient-red'
    | 'gradient-green';
  disabled?: boolean;
  loading?: boolean;
  className?: string;
};
export type ButtonProps = SharedProps & NativeButtonProps;

const StyledButton: ForwardRefComponent<HTMLButtonElement, ButtonProps> = forwardRef(
  ({ variant = 'default', className, loading, disabled, children, ...props }: ButtonProps, ref) => {
    return (
      <button
        className={buttonStyles({
          variant,
          disabled,
          loading,
          className,
        })}
        disabled={disabled || loading}
        ref={ref}
        {...(props as any)}
      >
        {loading && <LoadingSvg className="mr-1 animate-spin" />}
        {children}
      </button>
    );
  },
);

StyledButton.displayName = 'StyledButton';
export default StyledButton;

// TypeScript utility function
export const codeUpdate = (): void => {
  console.log('Code updated successfully');
};
