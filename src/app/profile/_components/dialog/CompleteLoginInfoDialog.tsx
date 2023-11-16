import HidePasswordSvg from '@/../public/svg/hide_password.svg?component';
import ShowPasswordSvg from '@/../public/svg/show_password.svg?component';
import WarningSvg from '@/../public/svg/warning.svg?component';

import { completeLoginUserInfoDialogAtom } from '@/atoms/profile';
import StyledButton from '@/components/ui/button/StyledButton';
import Dialog from '@/components/ui/dialog';
import { useFormOnError } from '@/hooks/useFormOnError';
import { AnimatePresence, motion } from 'framer-motion';
import { useAtom } from 'jotai';
import { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

const formVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const confirmVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: { opacity: 1, y: 0 },
};

export type ProfileLoginInfoFormData = {
  username: string;
  password: string;
  confirmPassword: string;
};
const usernameMaxLength = 50;
export default function CompleteLoginInfoDialog() {
  const [isOpen, setIsOpen] = useAtom(completeLoginUserInfoDialogAtom);
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<ProfileLoginInfoFormData>({
    defaultValues: {
      username: '',
      password: '',
      confirmPassword: '',
    },
  });
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  //  double confirm
  const [tempData, setTempData] = useState<ProfileLoginInfoFormData | null>(null);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);

  const onConfirm = useCallback(() => {
    // handle confirm logic, submit form data
    console.log('Confirmed data ===============>', tempData);
    toast.success(`Submit success. username: ${tempData?.username}`);
    setConfirmDialogOpen(false);
    setIsOpen(false);
  }, [setIsOpen, tempData]);

  const onCancel = () => {
    setTempData(null);
    setConfirmDialogOpen(false);
  };

  // form submission
  const onError = useFormOnError();
  const onSubmit = (values: ProfileLoginInfoFormData) => {
    console.log('submit values ===============>', values);
    setTempData(values);
    setConfirmDialogOpen(true);
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={setIsOpen}
      title="Complete Login Information"
      className="max-h=[90vh] h- w-[438px] overflow-auto"
      render={() => (
        <AnimatePresence>
          {confirmDialogOpen ? (
            <motion.div
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={confirmVariants}
              className="flex flex-col p-6"
            >
              <div className="flex flex-col items-center justify-center gap-4">
                <WarningSvg className="h-12 w-12" />
                <h2 className="text-xl/5.5 font-semibold">Are you really sure?</h2>
              </div>
              <p className="mt-8 text-center text-sm/6">
                Once confirmed, the username cannot be modified. Please double-check submit.
              </p>
              <div className="mt-9 grid grid-cols-2 gap-4">
                <StyledButton variant="bordered" className="py-3" onClick={onCancel}>
                  Cancel
                </StyledButton>
                <StyledButton variant="gradient" className="py-3" onClick={onConfirm}>
                  Confirm
                </StyledButton>
              </div>
            </motion.div>
          ) : (
            <motion.form
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={formVariants}
              className="flex flex-col gap-4 p-6"
              onSubmit={handleSubmit(onSubmit, onError)}
            >
              {/* Username */}
              <div className="flex flex-grow flex-col gap-2">
                <h2 className="text-sm font-medium">Username</h2>
                <input
                  placeholder="Only allow character, number and _"
                  className="mt-1 rounded bg-white/10 p-3 text-xs/5"
                  {...register('username', {
                    maxLength: {
                      value: usernameMaxLength,
                      message: `Username should be less than ${usernameMaxLength} characters.`,
                    },
                    validate: {
                      // 自定义校验规则
                      validateUsername: (value: any) => {
                        return /^[a-zA-Z0-9_]+$/.test(value) || 'Invalid username, please try again.';
                      },
                    },
                  })}
                />
                {errors.username && <p className="text-xs text-red">{errors.username.message}</p>}
              </div>
              {/* Password */}
              <div className="flex flex-grow flex-col gap-2">
                <h2 className="select-none text-sm font-medium">Password</h2>
                <div className="mt-1 flex items-center justify-between rounded-sm bg-white/10">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="At least 6 characters"
                    className="flex-grow bg-transparent pl-3 text-xs/5"
                    {...register('password', {
                      minLength: { value: 6, message: 'Password should be less than 6 characters.' },
                    })}
                  />
                  <div className="cursor-pointer p-3" onClick={togglePasswordVisibility}>
                    {showPassword ? <HidePasswordSvg /> : <ShowPasswordSvg />}
                  </div>
                </div>
                {errors.password && <p className="text-xs text-red">{errors.password.message}</p>}
              </div>
              {/* Confirm Password */}
              <div className="flex flex-grow flex-col gap-2">
                <h2 className="select-none text-sm font-medium">Confirm Password</h2>
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Confirm your password"
                  className="mt-1 rounded-sm bg-white/10 p-3 text-xs/5"
                  {...register('confirmPassword', {
                    validate: (value) => value === watch('password') || 'Passwords do not match.',
                  })}
                />
                {errors.confirmPassword && <p className="text-xs text-red">{errors.confirmPassword.message}</p>}
              </div>
              <StyledButton variant="gradient" type="submit" className="mt-8 py-3">
                Sign to submit
              </StyledButton>
            </motion.form>
          )}
        </AnimatePresence>
      )}
    />
  );
}
