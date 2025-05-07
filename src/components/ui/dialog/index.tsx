import CloseSvg from '@/../public/svg/close.svg?component';
import { clsxm } from '@/utils';
import {
  FloatingFocusManager,
  FloatingOverlay,
  FloatingPortal,
  useClick,
  useDismiss,
  useFloating,
  useInteractions,
  useRole,
} from '@floating-ui/react';
import { ReactNode, cloneElement, memo, useEffect, useState } from 'react';

type DialogProps = {
  className?: string;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  showCloseButton?: boolean;
  render: (props: { close: () => void }) => ReactNode;
  children?: JSX.Element;
  title?: string | JSX.Element;
  isDismiss?: boolean;
  headerClass?: string;
  titleClass?: string;
  closeArrowClass?: string;
};

function Dialog({
  className,
  render,
  open: passedOpen = false,
  children,
  title,
  showCloseButton = true,
  onOpenChange,
  isDismiss = false,
  headerClass,
  titleClass,
  closeArrowClass,
}: DialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const onChange = (status: boolean) => {
    setIsOpen(status);
    onOpenChange?.(status);
  };

  const { refs, context } = useFloating({ open: isOpen, onOpenChange: onChange });
  const { setReference, setFloating } = refs;
  const dismiss = useDismiss(context, { enabled: isDismiss, outsidePressEvent: 'mousedown' });

  const { getReferenceProps, getFloatingProps } = useInteractions([useClick(context), useRole(context), dismiss]);

  useEffect(() => {
    if (passedOpen === undefined) return;
    setIsOpen(passedOpen);
  }, [passedOpen]);

  return (
    <>
      {children && cloneElement(children, getReferenceProps({ ref: setReference, ...children.props }))}
      <FloatingPortal>
        {isOpen && (
          <FloatingOverlay lockScroll className="z-10 grid place-items-center bg-black/80">
            <FloatingFocusManager context={context}>
              <div
                className={clsxm('border border-gray-400 bg-gray-600', className)}
                {...getFloatingProps({ ref: setFloating })}
              >
                <div
                  className={clsxm(
                    'flex items-center justify-between bg-gray-750 px-2 py-2.5 text-sm font-semibold',
                    headerClass,
                  )}
                >
                  <h1 className={titleClass}>{title}</h1>
                  {showCloseButton && (
                    <CloseSvg
                      onClick={() => onChange(false)}
                      className={clsxm('h-3 w-3 cursor-pointer stroke-white/50', closeArrowClass)}
                    />
                  )}
                </div>
                {render({
                  close: () => onChange(false),
                })}
              </div>
            </FloatingFocusManager>
          </FloatingOverlay>
        )}
      </FloatingPortal>
    </>
  );
}

export default memo(Dialog);

// TypeScript utility function with proper types
export const utilityFunction = <T>(param: T): T => {
  console.log('Executing utility function:', param);
  return param;
};
