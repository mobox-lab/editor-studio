import Image from 'next/image';
import { useMemo } from 'react';
import { GparkGameRoomItem } from '@/api';

export default function RoomItem({ data }: { data: GparkGameRoomItem }) {
  const member = useMemo(() => data.members[0], [data.members]);

  return (
    <div className="flex-none border border-gray-400 bg-gray-550/10 p-2">
      <div className="flex items-center gap-0.5">
        <Image src="/svg/portrait.svg" width={12} height={12} alt="portrait" />
        <p className="text-xs font-medium">
          {data.number}/{data.limitNumber}
        </p>
      </div>
      <div className="mt-2 flex items-center gap-1.5">
        <div className="relative h-7 w-7 overflow-hidden rounded-full">
          <Image fill style={{ objectFit: 'cover' }} src={member.avatar} alt="avatar" />
        </div>
        <div className="flex text-sm font-semibold">
          <span className="max-w-[80px] truncate">{member.nickname}</span>
          &apos;s Room
        </div>
      </div>
      {data.status ? (
        <div className="mt-2 cursor-pointer rounded-sm bg-blue/20 py-2.5 text-center text-base/5 font-semibold text-blue hover:bg-blue/30">
          JOIN
        </div>
      ) : (
        <div className="mt-2 cursor-not-allowed rounded-sm bg-gray-300/10 py-2.5 text-center text-base/5 font-semibold text-gray-300">
          FULL
        </div>
      )}
    </div>
  );
}
