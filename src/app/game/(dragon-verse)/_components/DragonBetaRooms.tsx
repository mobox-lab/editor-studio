import { useMemo, useState } from 'react';
import { Swiper, SwiperClass, SwiperSlide } from 'swiper/react';
import LeftSvg from '../../../../../public/svg/left.svg?component';
import { useGparkGameRoomList } from '@/hooks/gpark/useGparkGameRoomList';
import DragonRoomItem from '@/app/game/(dragon-verse)/_components/DragonRoomItem';

type DragonBetaRoomsProps = {
  version?: string;
  gameId?: string;
};

export default function DragonBetaRooms({ gameId, version }: DragonBetaRoomsProps) {
  const [swiper, setSwiper] = useState<SwiperClass | null>(null);
  const { data: rooms, refetch } = useGparkGameRoomList({ maxId: '0', pageSize: 20, sortType: 0, gameId, version });
  const roomList = useMemo(() => rooms?.dataList ?? [], [rooms?.dataList]);

  return (
    <div className="relative">
      {roomList.length ? (
        <>
          {roomList.length > 3 && (
            <div
              onClick={() => swiper?.slidePrev()}
              className="flex-center h-18.5 group absolute -left-3 top-1/2 w-3 -translate-y-1/2 cursor-pointer border border-r-0 border-gray-400/50 bg-white/10 hover:bg-white/15"
            >
              <LeftSvg className="fill-gray-400 group-hover:fill-white" />
            </div>
          )}
          <Swiper onSwiper={(swiper) => setSwiper(swiper)} className="relative" slidesPerView={3} spaceBetween={12}>
            {roomList.map((room) => (
              <SwiperSlide key={room.id}>
                <DragonRoomItem data={room} refetchRoomList={refetch} />
              </SwiperSlide>
            ))}
          </Swiper>
          {roomList.length > 3 && (
            <div
              onClick={() => swiper?.slideNext()}
              className="flex-center h-18.5 group absolute -right-3 top-1/2 w-3 -translate-y-1/2 cursor-pointer border border-l-0 border-gray-400/50 bg-white/10 hover:bg-white/15"
            >
              <LeftSvg className="rotate-180 fill-gray-400 group-hover:fill-white" />
            </div>
          )}
        </>
      ) : (
        <div className="flex-center w-full border border-gray-400 bg-gray-550/10 py-12 text-sm text-gray-300">NO ROOM</div>
      )}
    </div>
  );
}
