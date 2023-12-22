import clsx from 'clsx';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { MouseEventHandler, ReactNode, useCallback, useRef, useState } from 'react';
import { twMerge } from 'tailwind-merge';

export type Card3dProps = {
  children: ReactNode;
  showMask?: boolean;
  className?: string;
  maskClass?: string;
};
const Card3d = ({ children, showMask, className, maskClass }: Card3dProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const maskRef = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const scaleValue = useMotionValue(1);
  const rotateX = useTransform(y, [-100, 100], [-15, 15]);
  const rotateY = useTransform(x, [-100, 100], [80, -80]);

  const rotateXSpring = useSpring(rotateX, { stiffness: 100, damping: 10 });
  const rotateYSpring = useSpring(rotateY, { stiffness: 100, damping: 10 });

  const reset = useCallback(() => {
    x.set(0);
    y.set(0);
    if (maskRef.current) maskRef.current.style.backgroundPosition = '50% 50%';
  }, [x, y]);

  const onMouseEnter = useCallback(() => {
    setEnabled(true);
  }, []);
  const onMouseLeave = useCallback(() => {
    setEnabled(false);
    reset();
  }, [reset]);

  const getTouchPosition = (e: TouchEvent) => {
    if (cardRef.current) {
      const rect = cardRef.current.getBoundingClientRect();
      const touchX = e.touches[0].clientX - rect.left - rect.width / 2;
      const touchY = e.touches[0].clientY - rect.top - rect.height / 2;
      return { touchX, touchY };
    }
    return { touchX: 0, touchY: 0 };
  };

  const onTouchMove = useCallback(
    (e: any) => {
      if (enabled) {
        const { touchX, touchY } = getTouchPosition(e);
        const blingPosX = 50 + (touchX / cardRef.current!.offsetWidth) * 50;
        const blingPosY = 50 + (touchY / cardRef.current!.offsetHeight) * 50;
        x.set(touchX);
        y.set(touchY);
        if (maskRef.current) {
          maskRef.current.style.backgroundPosition = `${blingPosX}% ${blingPosY}%`;
        }
      }
    },
    [enabled, x, y],
  );

  const onTouchStart = useCallback(() => {
    setEnabled(true);
  }, []);

  const onTouchEnd = useCallback(() => {
    setEnabled(false);
    reset();
  }, [reset]);

  const rotateToMouse: MouseEventHandler<HTMLDivElement> = useCallback(
    (e) => {
      if (cardRef.current && enabled) {
        const rect = cardRef.current.getBoundingClientRect();
        const centerX = e.clientX - rect.left - rect.width / 2;
        const centerY = e.clientY - rect.top - rect.height / 2;
        const blingPosX = 50 + (centerX / rect.width) * 50;
        const blingPosY = 50 + (centerY / rect.height) * 50;

        // 限制旋转角度，避免过度旋转
        const limitedCenterX = Math.min(Math.max(centerX, -50), 50);
        const limitedCenterY = Math.min(Math.max(centerY, -50), 50);

        x.set(limitedCenterX);
        y.set(limitedCenterY);
        if (maskRef.current) {
          maskRef.current.style.backgroundPosition = `${blingPosX}% ${blingPosY}%`;
        }
      }
    },
    [enabled, x, y],
  );
  return (
    <motion.div
      ref={cardRef}
      style={{
        rotateX: rotateXSpring,
        rotateY: rotateYSpring,
        rotateZ: 0,
        transformPerspective: 1000,
      }}
      className={twMerge('relative w-fit transition duration-75', clsx(className))}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onMouseMove={rotateToMouse}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      {children}
      {showMask && <div className={twMerge('bling-mask', clsx(maskClass))} ref={maskRef} />}
    </motion.div>
  );
};

export default Card3d;
