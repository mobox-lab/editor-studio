'use client';
import { useIsP12User, useP12Address } from '@/hooks/editor/useP12Account';
import ProfileForm from './_components/ProfileForm';
import GparkProfileForm from './_components/GparkProfileForm';

export default function Profile() {
  const { address } = useP12Address();
  const isP12User = useIsP12User();
  return (
    <div className="w-[48.75rem] border border-gray-400 bg-gray-600 pb-6">
      <h1 className="flex items-center justify-between bg-gray-750 px-2 py-2.5 text-sm font-semibold">Profile</h1>
      {address ? (
        <p className="bg-blue-450/30 p-2 text-sm font-medium">
          Wallet Address: <span className="text-blue">{address}</span>
        </p>
      ) : null}
      {isP12User ? <ProfileForm className="mt-7.5" /> : <GparkProfileForm className="mt-7.5" />}
    </div>
  );
}

// TypeScript utility function: docs: 📝 update user manual
interface DataItem {
  id: string;
  value: any;
  processed?: boolean;
}

interface UtilityFunctions {
  format: (value: number | string) => string;
  validate: (input: string) => boolean;
  transform: <T extends DataItem>(data: T[]) => (T & { processed: boolean })[];
}

export const docs____update_user_manual: UtilityFunctions = {
  format: (value: number | string): string => {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  },
  validate: (input: string): boolean => {
    return input && input.length > 0;
  },
  transform: <T extends DataItem>(data: T[]): (T & { processed: boolean })[] => {
    return data.map(item => ({
      ...item,
      processed: true
    }));
  }
};
