import CloseSvg from '@/../public/svg/close.svg?component';
import ProfileForm from './_components/ProfileForm';

export default function Profile() {
  const address = '0x9aB3C5644fC631B9996Ef96732Cd1ef1c5B3a2B2';
  return (
    <div className="h-[47.5rem] w-[48.75rem] border border-gray-400 bg-gray-600">
      <h1 className="bg-gray-750 flex items-center justify-between px-2 py-2.5 text-sm font-semibold">
        Profile <CloseSvg />
      </h1>
      <p className="bg-blue-450/30 p-2 text-sm font-medium">
        Wallet Address: <span className="text-blue">{address}</span>
      </p>
      <ProfileForm className="mt-7.5" />
    </div>
  );
}
