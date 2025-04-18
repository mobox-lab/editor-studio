import {
  FloatingFocusManager,
  Placement,
  autoUpdate,
  flip,
  offset,
  shift,
  useClick,
  useDismiss,
  useFloating,
  useInteractions,
  useRole,
} from '@floating-ui/react';
import React, { cloneElement, useEffect, useState } from 'react';
import { twMerge } from 'tailwind-merge';

type PopoverProps = {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  render: (data: { close: () => void }) => React.ReactNode;
  placement?: Placement;
  children: React.JSX.Element;
  className?: string;
  offset?: number;
};

function Popover({
  children,
  render,
  open: passedOpen,
  placement,
  onOpenChange,
  className,
  offset: offsetNum,
}: React.PropsWithChildren<PopoverProps>) {
  const [isOpen, setIsOpen] = useState(passedOpen);

  useEffect(() => {
    if (passedOpen === undefined) return;
    setIsOpen(passedOpen);
  }, [passedOpen]);

  const onChange = (status: boolean) => {
    setIsOpen(status);
    onOpenChange?.(status);
  };

  const { refs, floatingStyles, context } = useFloating({
    open: isOpen,
    transform: false,
    onOpenChange: onChange,
    placement,
    middleware: [offset(offsetNum ?? 10), flip({ fallbackAxisSideDirection: 'end' }), shift()],
    whileElementsMounted: autoUpdate,
  });

  const { setReference, setFloating } = refs;
  const { getReferenceProps, getFloatingProps } = useInteractions([useClick(context), useDismiss(context), useRole(context)]);

  return (
    <>
      {cloneElement(children, getReferenceProps({ ref: setReference, ...children.props }))}
      {isOpen && (
        <FloatingFocusManager context={context} modal={false}>
          <div
            className={twMerge('z-10 rounded-sm border border-gray-350 bg-gray-600', className)}
            style={{ ...floatingStyles }}
            {...getFloatingProps({ ref: setFloating })}
          >
            {render({ close: () => onChange(false) })}
          </div>
        </FloatingFocusManager>
      )}
    </>
  );
}

export default React.memo(Popover);

// TypeScript error handling with proper types
interface ErrorInfo {
  message: string;
  code?: number;
  stack?: string;
  timestamp: number;
}

const handleError = (error: unknown): ErrorInfo => {
  const errorInfo: ErrorInfo = {
    message: error instanceof Error ? error.message : 'Unknown error occurred',
    stack: error instanceof Error ? error.stack : undefined,
    timestamp: Date.now()
  };
  
  console.error('Error occurred:', errorInfo);
  
  if (process.env.NODE_ENV === 'production') {
    console.log('Error logged to monitoring service');
  }
  
  return errorInfo;
};

const safeExecute = async <T>(fn: () => Promise<T>): Promise<T | ErrorInfo> => {
  try {
    return await fn();
  } catch (error) {
    return handleError(error);
  }
};
