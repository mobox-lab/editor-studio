'use client';

import ErrorSvg from '@/../public/svg/error.svg?component';
import LoadingSvg from '@/../public/svg/loading.svg?component';
import SuccessSvg from '@/../public/svg/success.svg?component';
import WarningSvg from '@/../public/svg/warning.svg?component';
import { clsxm } from '@/utils';

type ToastIconProps = {
  type?: 'success' | 'error' | 'loading' | 'warning' | string;
  className?: string;
  theme?: string;
};

function ToastIcon({ type, className }: ToastIconProps) {
  if (type === 'success') {
    return (
      <div className={clsxm('m-auto h-5 w-5', className)}>
        <SuccessSvg className="h-full w-full" />
      </div>
    );
  }

  if (type === 'error') {
    return (
      <div className={clsxm('m-auto h-5 w-5', className)}>
        <ErrorSvg className="h-full w-full" />
      </div>
    );
  }

  if (type === 'warning') {
    return (
      <div className={clsxm('m-auto h-5 w-5', className)}>
        <WarningSvg className="h-full w-full" />
      </div>
    );
  }

  if (type === 'loading') {
    // custom
    return (
      <div className={clsxm('m-auto h-5 w-5 fill-white', className)}>
        <LoadingSvg className="animate-spin" />
      </div>
    );
  }
  return null;
}

export default ToastIcon;
