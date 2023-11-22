import Right from '@/../public/svg/right.svg?component';
import ArcanaGame from '@/components/ui/card/ArcanaGame';
import { useP12ArcanaGames } from '@/hooks/arcade/useP12ArcanaGames';
import { useState } from 'react';
import { Swiper, SwiperClass, SwiperSlide } from 'swiper/react';
export default function ArcanaGames() {
  const [swiper, setSwiper] = useState<SwiperClass | null>(null);
  const { data, isLoading } = useP12ArcanaGames();

  return (
    <div className="absolute -inset-x-15">
      <div
        onClick={() => swiper?.slidePrev()}
        className="flex-center absolute -left-5 top-1/2 h-30 w-5 -translate-y-1/2 cursor-pointer border border-r-0 border-gray-400/50 bg-white/10 hover:bg-white/20"
      >
        <Right className="w-4.5 rotate-180 fill-white" />
      </div>
      {isLoading ? (
        <div>Loading...</div>
      ) : data?.length ? (
        <Swiper onSwiper={setSwiper} spaceBetween={24} draggable={true} initialSlide={0} slidesPerView={5}>
          {data.map((data, i) => (
            <SwiperSlide key={data?.id}>
              <ArcanaGame data={data} />
            </SwiperSlide>
          ))}
        </Swiper>
      ) : null}
      <div
        onClick={() => swiper?.slideNext()}
        className="flex-center absolute -right-5 top-1/2 h-30 w-5 -translate-y-1/2 cursor-pointer border border-l-0 border-gray-400/50 bg-white/10 hover:bg-white/20"
      >
        <Right className="w-4.5 fill-white" />
      </div>
    </div>
  );
}
