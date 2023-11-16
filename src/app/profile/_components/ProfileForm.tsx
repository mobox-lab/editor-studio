'use client';

import DefaultUserSvg from '@/../public/svg/default_user.svg?component';
import TwitterSvg from '@/../public/svg/twitter.svg?component';
import TelegramSvg from '@/../public/svg/telegram.svg?component';
import DiscordSvg from '@/../public/svg/discord.svg?component';
import RadioGroup from '@/components/ui/radio/RadioGroup';
import { useProfileRadioOptions, useProfileSubmit } from '@/hooks/profile';
import { useFormOnError } from '@/hooks/useFormOnError';
import { clsxm } from '@/utils';
import { useCallback, useMemo, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import StyledButton from '@/components/ui/button/StyledButton';

export type ProfileFormData = {
  bio: string;
  displayName: string;
  twitterHandle?: string;
  discordHandle?: string;
};
export default function ProfileForm({ className }: { className?: string }) {
  const profileData = {
    address: '0x9aB3C5644fC631B9996Ef96732Cd1ef1c5B3a2B2',
    bio: 'Let go! Vote for your favorite works. Get a daily bonus reward for each vote.',
    twitter: 'cosine_x',
    loginUsername: 'cosine',
    email: 'xdodovo@email.com',
  };
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
  } = useForm<ProfileFormData>({
    defaultValues: {
      bio: profileData?.bio ?? '',
      displayName: profileData?.address ?? '',
      twitterHandle: '',
      discordHandle: '',
    },
  });
  const { onSubmit } = useProfileSubmit(selectedRadioKey);
  const onError = useFormOnError();

  // watch bio length
  const bio = watch('bio');
  const handleTextareaChange = useCallback(
    (e: any) => {
      const currentLength = e.target.value.length;

      if (currentLength > 250) {
        setError('bio', {
          type: 'manual',
          message: 'Bio should be less than 250 characters',
        });
      } else {
        clearErrors(['bio']); // specify fields to clear
        setValue('bio', e.target.value); // trigger re-render
      }
    },
    [clearErrors, setError, setValue],
  );
  return (
    <form className={clsxm('flex flex-col gap-7.5 px-6', className)} onSubmit={handleSubmit(onSubmit, onError)}>
      <div className="flex items-center gap-7.5">
        <div className="h-[136px] w-[136px] rounded-full bg-gray-500">
          <DefaultUserSvg className="h-full w-full" />
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
          className="w-full resize-none rounded bg-white/10 p-3 text-xs/5"
          {...register('bio', { maxLength: { value: 250, message: 'Bio should be less than 250 characters' } })}
          onChange={handleTextareaChange}
        />
        {errors.bio && (
          <p className="text-xs text-red">
            {errors.bio.message} {bio?.length}/250
          </p>
        )}
      </div>
      {/* Login & Email */}
      <div className="grid grid-cols-2 gap-4">
        {/* Login Username */}
        <div className="flex flex-grow flex-col gap-3">
          <h2 className="text-sm font-medium">Login Username</h2>
          <div className="relative z-0 flex justify-between gap-4 rounded-sm bg-white/10 px-3 py-2.5 text-xs/5">
            {profileData?.loginUsername}
            <span className="font-semibold text-blue">Forget password?</span>
          </div>
        </div>
        {/* Email */}
        <div className="flex flex-grow flex-col gap-3">
          <h2 className="text-sm font-medium">Email</h2>
          <div className="relative z-0 flex justify-between gap-4 rounded-sm bg-white/10 px-3 py-2.5 text-xs/5">
            {profileData?.email}
            <span className="font-semibold text-blue">Update email</span>
          </div>
        </div>
      </div>
      {/* Social Links */}
      <div className="flex flex-grow flex-col gap-3">
        <h2 className="text-sm font-medium">Social Links</h2>
        <div className="grid grid-cols-3 items-start gap-3 fill-white text-xs/5">
          <div className="flex flex-col gap-2">
            <div className="flex flex-wrap items-center gap-1 rounded-sm bg-white/10 px-3 py-2.5">
              <TwitterSvg className="h-5 w-5" />
              <div
                className="flex flex-grow cursor-pointer items-center gap-0.5"
                onClick={() => {
                  // setTwitterBindOpen(true);
                }}
              >
                {profileData?.twitter ? `@${profileData?.twitter}` : 'Connect twitter'}
              </div>
            </div>
            {errors?.twitterHandle ? (
              <p className="w-full flex-grow text-xs text-red">{errors?.twitterHandle.message}</p>
            ) : null}
          </div>
          <div
            className="flex cursor-pointer items-center gap-1 rounded-sm bg-white/10 px-3 py-2.5"
            onClick={() => {
              // setTelegramAuthOpen(true);
            }}
          >
            <TelegramSvg className="h-5 w-5" />
            Connect telegram
          </div>
          <div className="flex flex-col gap-2">
            <div
              className="flex cursor-pointer items-center gap-1 rounded-sm bg-white/10 px-3 py-2.5"
              onClick={() => {
                // setDiscordBindOpen(true);
                // if (discordData) {
                //   return;
                // }
                // openLink(DiscordBindLink);
              }}
            >
              <DiscordSvg className="h-5 w-5" />
              Connect discord
            </div>
            {errors?.discordHandle ? (
              <p className="w-full flex-grow text-xs text-red">{errors?.discordHandle.message}</p>
            ) : null}
          </div>
        </div>
      </div>
      <StyledButton variant="gradient" className="w-[118px] self-end">
        Submit
      </StyledButton>
    </form>
  );
}
