import HidePasswordSvg from '@/../public/svg/hide_password.svg?component';
import ShowPasswordSvg from '@/../public/svg/show_password.svg?component';
import { forgetPasswordDialogAtom } from '@/atoms/profile';
import StyledButton from '@/components/ui/button/StyledButton';
import Dialog from '@/components/ui/dialog';
import { useFormOnError } from '@/hooks/util/useFormOnError';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAtom } from 'jotai';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { z } from 'zod';

export type ForgetPasswordFormData = {
  username: string;
  password: string;
  confirmPassword: string;
};
const usernameMaxLength = 50;
const schema = z.object({
  username: z
    .string()
    .max(usernameMaxLength, { message: `Username should be less than ${usernameMaxLength} characters.` })
    .refine((value) => /^[a-zA-Z0-9_]+$/.test(value), {
      message: 'Invalid username, please use only letters, numbers, and underscores.',
    }),
  password: z.string().min(6, { message: 'Password should be at least 6 characters.' }),
  confirmPassword: z.string().min(6, { message: 'At least 6 characters.' }),
});
export default function ForgetPasswordDialog() {
  const [isOpen, setIsOpen] = useAtom(forgetPasswordDialogAtom);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgetPasswordFormData>({ resolver: zodResolver(schema) });
  const onError = useFormOnError();
  const onSubmit = (values: ForgetPasswordFormData) => {
    if (values.password !== values.confirmPassword) {
      toast.error('Passwords do not match.');
      return;
    }
    console.log('submit values ===============>', values);
  };

  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  return (
    <Dialog
      open={isOpen}
      onOpenChange={setIsOpen}
      title="Forget Password"
      className="max-h=[90vh] h- w-[438px] overflow-auto"
      render={() => (
        <form className="flex flex-col gap-4 p-6" onSubmit={handleSubmit(onSubmit, onError)}>
          <p className="mb-9 text-sm">Verify your identity and recover your password through signature.</p>

          {/* Username */}
          <div className="flex flex-grow flex-col gap-2">
            <h2 className="text-sm font-medium">Confirm your login username</h2>
            <input
              placeholder="Only allow character, number and _"
              className="mt-1 rounded bg-white/10 p-3 text-xs/5"
              {...register('username')}
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
                {...register('password')}
              />
              <div className="cursor-pointer p-3" onClick={togglePasswordVisibility}>
                {showPassword ? (
                  <HidePasswordSvg className="fill-gray-300 hover:fill-white" />
                ) : (
                  <ShowPasswordSvg className="fill-gray-300 hover:fill-white" />
                )}
              </div>
            </div>
            {errors.password && <p className="text-xs text-red">{errors.password.message}</p>}
          </div>
          {/* Confirm Password */}
          <div className="mt-5 flex flex-grow flex-col gap-2">
            <h2 className="select-none text-sm font-medium">Confirm Password</h2>
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Confirm your password"
              className="mt-1 rounded-sm bg-white/10 p-3 text-xs/5"
              {...register('confirmPassword')}
            />
            {errors.confirmPassword && <p className="text-xs text-red">{errors.confirmPassword.message}</p>}
          </div>
          <StyledButton variant="gradient" type="submit" className="mt-8 py-3">
            Sign to submit
          </StyledButton>
        </form>
      )}
    />
  );
}
