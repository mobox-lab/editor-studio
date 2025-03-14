'use client';

import DefaultUserSvg from '@/../public/svg/default_user.svg?component';
import DiscordSvg from '@/../public/svg/discord.svg?component';
import TelegramSvg from '@/../public/svg/telegram.svg?component';
import TwitterSvg from '@/../public/svg/twitter.svg?component';
import {
  completeLoginUserInfoDialogAtom,
  forgetPasswordDialogAtom,
  gparkProfileAtom,
  p12ProfileAtom,
  verifyEmailDialogAtom,
} from '@/atoms/profile';
import StyledButton from '@/components/ui/button/StyledButton';
import RadioGroup from '@/components/ui/radio/RadioGroup';
import { useFetchP12Profile } from '@/hooks/profile/useFetchP12Profile';
import { useGparkUserInfo } from '@/hooks/profile/useGparkUserInfo';
import { useProfileRadioOptions } from '@/hooks/profile/useProfileRadioOptions';
import { useProfileSubmit } from '@/hooks/profile/useProfileSubmit';
import { useFormOnError } from '@/hooks/util/useFormOnError';
import { clsxm, sendEvent } from '@/utils';
import clsx from 'clsx';
import { useAtomValue, useSetAtom } from 'jotai';
import { useCallback, useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import CompleteLoginInfoDialog from './dialog/CompleteLoginInfoDialog';
import ForgetPasswordDialog from './dialog/ForgetPasswordDialog';
import VerifyEmailDialog from './dialog/VerifyEmailDialog';

const bioMaxLength = 250;
export type ProfileFormData = {
  bio: string;
  displayName: string;
  loginUsername?: string;
};
export default function ProfileForm({ className }: { className?: string }) {
  const profileData = {
    loginUsername: undefined,
    email: undefined,
  };
  const { isLoading: p12FetchLoading } = useFetchP12Profile();
  const p12Profile = useAtomValue(p12ProfileAtom);
  const { isLoading: gparkFetchLoading } = useGparkUserInfo();
  const gparkProfile = useAtomValue(gparkProfileAtom);
  const radioOptions = useProfileRadioOptions();
  const [selectedRadioKey, setSelectedRadioKey] = useState<string | undefined>(undefined);
  const {
    control,
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    watch,
    setError,
    clearErrors,
  } = useForm<ProfileFormData>();
  const { onSubmit, isLoading: submitLoading } = useProfileSubmit(selectedRadioKey);
  const onError = useFormOnError();
  const setCompleteInfoDialogOpen = useSetAtom(completeLoginUserInfoDialogAtom);
  const setVerifyEmailDialogOpen = useSetAtom(verifyEmailDialogAtom);
  const setForgetPasswordDialogOpen = useSetAtom(forgetPasswordDialogAtom);

  // reset default values
  useEffect(() => {
    if (!p12Profile) return;
    const { bio, showName, twitter, discord, walletAddress } = p12Profile ?? {};
    setValue('bio', bio ?? '');
    setValue('displayName', showName ?? walletAddress ?? '');
    // setValue('discordHandle', discord ?? '');
    // setValue('twitterHandle', twitter ?? '');
  }, [p12Profile, setValue]);

  // watch bio length
  const bio = watch('bio');
  const handleTextareaChange = useCallback(
    (e: any) => {
      const currentLength = e.target.value.length;

      if (currentLength > bioMaxLength) {
        setError('bio', {
          type: 'manual',
          message: `Bio should be less than ${bioMaxLength} characters`,
        });
      } else {
        clearErrors(['bio']); // specify fields to clear
        setValue('bio', e.target.value); // trigger re-render
      }
    },
    [clearErrors, setError, setValue],
  );
  return (
    <>
      <form className={clsxm('flex flex-col gap-7.5 px-6', className)} onSubmit={handleSubmit(onSubmit, onError)}>
        <div className="flex items-center gap-7.5">
          <div className={clsxm('group relative h-[136px] w-[136px] rounded-full', { 'animate-pulse': gparkFetchLoading })}>
            {gparkProfile?.portrait ? (
              <img draggable={false} className="h-full w-full rounded-full" src={gparkProfile.portrait} alt="" />
            ) : (
              <DefaultUserSvg className="h-full w-full" />
            )}
            {/* <AvatarHoverSvg className="invisible absolute inset-0 group-hover:visible" /> */}
          </div>
          {/* Username */}
          <div className="flex flex-grow flex-col gap-3">
            <h2 className="text-sm font-medium">Username</h2>
            <Controller
              control={control}
              name="displayName"
              rules={{ required: 'Display Name is required' }}
              render={({ field }) => (
                <RadioGroup
                  className="grid grid-cols-2 gap-x-4 gap-y-3"
                  options={radioOptions}
                  labelClass="min-w-[10.125rem] col-span-3 col-span-1 xs:min-w-0" // generate col-span-3 class
                  {...field}
                  onChange={(value, key) => {
                    setSelectedRadioKey(key);
                    // ensure original onChange is also called
                    field.onChange(value, key);
                  }}
                />
              )}
            />
          </div>
        </div>
        {/* Bio */}
        <div className="flex flex-grow flex-col gap-3">
          <h2 className="text-sm font-medium">Bio</h2>
          <textarea
            rows={3}
            className={clsx('w-full resize-none rounded bg-white/10 p-3 text-xs/5 placeholder:text-gray-300', {
              'animate-pulse placeholder:text-transparent': p12FetchLoading,
            })}
            onFocus={() => sendEvent('pf_edit_bio', '修改')}
            disabled={p12FetchLoading}
            placeholder="Please Enter"
            {...register('bio', {
              maxLength: { value: bioMaxLength, message: `Bio should be less than ${bioMaxLength} characters` },
            })}
            onChange={handleTextareaChange}
          />
          {errors.bio && (
            <p className="text-xs text-red">
              {errors.bio.message} {bio?.length}/{bioMaxLength}
            </p>
          )}
        </div>
        {/* Login & Email */}
        {/* <div className="grid grid-cols-2 gap-4">
           <div className="flex flex-grow flex-col gap-3">
            <h2 className="text-sm font-medium">Login Username</h2>
            {profileData?.loginUsername ? (
              <div className="relative z-0 flex justify-between gap-4 rounded-sm bg-white/10 px-3 py-2.5 text-xs/5">
                {profileData?.loginUsername}
                <span className="cursor-pointer font-semibold text-blue" onClick={() => setForgetPasswordDialogOpen(true)}>
                  Forget password?
                </span>
              </div>
            ) : (
              <StyledButton disabled type="button" className="gap-1.5 py-2.5" onClick={() => setCompleteInfoDialogOpen(true)}>
                <p className="text-sm/5 font-semibold">Complete Login Information</p>
              </StyledButton>
            )}
          </div>
           <div className="flex flex-grow flex-col gap-3">
            <h2 className="text-sm font-medium">Email</h2>
            {profileData.email ? (
              <div className="relative z-0 flex justify-between gap-4 rounded-sm bg-white/10 px-3 py-2.5 text-xs/5">
                {profileData.email}
                <span className="cursor-pointer font-semibold text-blue" onClick={() => setVerifyEmailDialogOpen(true)}>
                  Update email
                </span>
              </div>
            ) : (
              <StyledButton disabled type="button" className="gap-1.5 py-2.5" onClick={() => setVerifyEmailDialogOpen(true)}>
                <p className="text-sm/5 font-semibold">Complete and verify your email</p>
              </StyledButton>
            )}
          </div>
        </div> */}
        {/* Social Links */}
        {/* <div className="flex flex-grow flex-col gap-3">
          <h2 className="text-sm font-medium">Social Links</h2>
          <div className="grid grid-cols-3 items-start gap-3 fill-white text-xs/5">
            <StyledButton className="flex items-center gap-1 px-3 py-2.5" disabled>
              <TwitterSvg className="h-5 w-5 fill-gray-300" />
              <div className="flex flex-grow items-center gap-0.5">Link Twitter</div>
            </StyledButton>
            <StyledButton className="flex items-center justify-start gap-1 px-3 py-2.5" disabled>
              <TelegramSvg className="h-5 w-5 fill-gray-300" />
              Link Telegram
            </StyledButton>
            <StyledButton className="flex items-center justify-start gap-1 px-3 py-2.5" disabled>
              <DiscordSvg className="h-5 w-5 fill-gray-300" />
              Link Discord
            </StyledButton>
          </div>
        </div> */}
        <StyledButton variant="gradient" loading={submitLoading} className="w-[118px] self-end py-3">
          Submit
        </StyledButton>
      </form>
      <CompleteLoginInfoDialog />
      <ForgetPasswordDialog />
      <VerifyEmailDialog isUpdate={!!profileData?.email} />
    </>
  );
}

// TypeScript React component methods for: test: 🧪 add API endpoint tests
interface test____add_API_endpoint_testsProps {
  title?: string;
  onSuccess?: (result: any) => void;
  onError?: (error: Error) => void;
}

interface test____add_API_endpoint_testsState {
  isLoading: boolean;
  data: any;
  error: Error | null;
}

export const usetest____add_API_endpoint_tests = () => {
  const [state, setState] = useState<test____add_API_endpoint_testsState>({
    isLoading: false,
    data: null,
    error: null
  });

  const handletest____add_API_endpoint_tests = useCallback(async () => {
    setState(prev => ({ ...prev, isLoading: true, error: null }));
    
    try {
      const result = await apiCall('/test____add_API_endpoint_tests');
      setState(prev => ({ ...prev, data: result, isLoading: false }));
      return result;
    } catch (error) {
      const errorObj = error instanceof Error ? error : new Error('Unknown error');
      setState(prev => ({ ...prev, error: errorObj, isLoading: false }));
      throw errorObj;
    }
  }, []);

  return {
    ...state,
    handletest____add_API_endpoint_tests
  };
};
