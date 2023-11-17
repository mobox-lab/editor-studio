import ErrorSvg from '@/../public/svg/error.svg?component';
import LoadingSvg from '@/../public/svg/loading.svg?component';
import SuccessSvg from '@/../public/svg/success.svg?component';
import WarningSvg from '@/../public/svg/warning.svg?component';

type ToastIconProps = {
  type?: 'success' | 'error' | 'loading' | 'warning' | string;
  theme?: string;
};

function ToastIcon({ type }: ToastIconProps) {
  if (type === 'success') {
    return (
      <div className="h-5 w-5">
        <SuccessSvg width={20} height={20} />
      </div>
    );
  }

  if (type === 'error') {
    return (
      <div className="h-5 w-5">
        <ErrorSvg width={20} height={20} />
      </div>
    );
  }

  if (type === 'warning') {
    // custom
    return (
      <div className="h-5 w-5">
        <WarningSvg width={20} height={20} />
      </div>
    );
  }

  if (type === 'loading') {
    // custom
    return (
      <div className="h-5 w-5 fill-white">
        <LoadingSvg className="animate-spin" />
      </div>
    );
  }
  return null;
}

export default ToastIcon;
