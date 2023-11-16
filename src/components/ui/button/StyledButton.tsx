import LoadingSvg from '@/../public/svg/loading.svg?component';
import { ForwardRefComponent, MotionProps, motion } from 'framer-motion';
import { ButtonHTMLAttributes, forwardRef, memo } from 'react';
import { tv } from 'tailwind-variants';

const buttonStyles = tv({
  base: 'rounded-sm p-3 text-center fill-white flex justify-center items-center',
  variants: {
    variant: {
      default: 'bg-white/10 hover:bg-white/20',
      gradient: 'bg-p12-gradient hover:brightness-110',
      error: 'bg-red hover:brightness-110',
      bordered: 'border hover:opacity-80',
    },
    disabled: {
      true: 'bg-white/10 hover:brightness-100 hover:bg-white/10 hover:opacity-100 disabled:cursor-not-allowed cursor-not-allowed',
    },
    loading: {
      true: 'cursor-progress',
    },
  },
});

export type NativeButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;
export type SharedProps = {
  variant?: 'default' | 'gradient' | 'error' | 'bordered';
  disabled?: boolean;
  loading?: boolean;
  className?: string;
};
export type ButtonProps = SharedProps & NativeButtonProps & MotionProps;

const StyledButton: ForwardRefComponent<HTMLButtonElement, ButtonProps> = memo(
  forwardRef(({ variant = 'default', className, loading, disabled, children, ...props }: ButtonProps, ref) => {
    return (
      <motion.button
        className={buttonStyles({
          variant,
          disabled: disabled || loading,
          loading,
          className,
        })}
        loading={loading}
        disabled={disabled}
        {...(props as any)}
      >
        {loading && <LoadingSvg className="mr-1 animate-spin" />}
        {children}
      </motion.button>
    );
  }),
);

export default StyledButton;
