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
import { AnimatePresence, motion } from 'framer-motion';
import { ReactNode, cloneElement, memo, useEffect, useState } from 'react';

type DialogProps = {
  className?: string;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  showCloseButton?: boolean;
  render: (props: { close: () => void }) => ReactNode;
  children?: JSX.Element;
  title?: string;
  isDismiss?: boolean;
  headerClass?: string;
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
}: React.PropsWithChildren<DialogProps>) {
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
        <AnimatePresence>
          {isOpen && (
            <FloatingOverlay lockScroll className="z-10 grid place-items-center bg-black/80">
              <FloatingFocusManager context={context}>
                <motion.div
                  className={clsxm('border border-gray-400 bg-gray-600', className)}
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.85 }}
                  transition={{ type: 'spring', damping: 20, stiffness: 300 }}
                  {...getFloatingProps({ ref: setFloating })}
                >
                  <div
                    className={clsxm(
                      'flex items-center justify-between bg-gray-750 px-2 py-2.5 text-sm font-semibold',
                      headerClass,
                    )}
                  >
                    <h1>{title}</h1>
                    {showCloseButton && <CloseSvg onClick={() => onChange(false)} />}
                  </div>
                  {render({
                    close: () => onChange(false),
                  })}
                </motion.div>
              </FloatingFocusManager>
            </FloatingOverlay>
          )}
        </AnimatePresence>
      </FloatingPortal>
    </>
  );
}

export default memo(Dialog);
