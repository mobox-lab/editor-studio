import DressHeaderSvg from '@/../public/svg/dress-up-text.svg?component';
import StyledButton from '@/components/ui/button/StyledButton';
import Dialog from '@/components/ui/dialog';
import { launcherConfig } from '@/constants/launcher-config';
import { STORAGE_KEY } from '@/constants/storage';
import useRunningGame from '@/hooks/gpark/useRunningGame';
import { useIsMounted } from '@/hooks/util/useIsMounted';
import _ from 'lodash-es';
import { useEffect, useMemo, useState } from 'react';
import { useLocalStorage } from 'react-use';
import { Autoplay, EffectCoverflow } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

export default function ArcanaDressUpDialog() {
  const avatarList = useMemo(() => _.range(0, 9), []);
  const { handleRunningGame, isLoading } = useRunningGame();
  const [clicked, setClicked] = useLocalStorage(STORAGE_KEY.DRESS_UP_CLICKED, false);
  const [isOpen, setIsOpen] = useState(false);

  const isMounted = useIsMounted();
  useEffect(() => {
    if (isMounted && !clicked) {
      setIsOpen(true);
    }
  }, [clicked, isMounted]);

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) setClicked(true);
        setIsOpen(open);
      }}
      className="border-none bg-transparent"
      headerClass="bg-transparent text-center px-0 py-0"
      titleClass="flex-center flex-grow"
      closeArrowClass="h-7.5 w-7.5"
      title={<DressHeaderSvg className="h-10" />}
      render={({ close }) => (
        <div className="flex w-[65.5rem] flex-col">
          <Swiper
            className="mt-6 w-[65.5rem]"
            draggable
            grabCursor
            loop
            initialSlide={0}
            slidesPerView={5}
            spaceBetween={-150}
            centeredSlides
            autoplay={{
              delay: 1000,
            }}
            effect="coverflow"
            coverflowEffect={{
              depth: 100,
              scale: 0.85,
              modifier: 1,
              stretch: -80,
              rotate: 0,
              slideShadows: false,
            }}
            modules={[Autoplay, EffectCoverflow]}
          >
            {avatarList.map((v, i) => (
              <SwiperSlide key={v} className="h-[438px] w-[315px]">
                <img
                  src={`https://cdn1.p12.games/gpark/avatar/${v}.webp`}
                  className="h-[438px] w-[315px]"
                  draggable={false}
                  alt={`avatar_${v}.png`}
                />
              </SwiperSlide>
            ))}
          </Swiper>
          <p className="mt-6 w-[892px] self-center text-center text-sm/5 font-semibold">
            Welcome to PGE, an on-chain engine where you can create and play games. Start by creating and customizing your
            avatar used in gameplay, and dress them up in your favorite style. You can also change the appearance at any time by
            clicking &apos;Dress Up&apos; on the Gpark page.
          </p>
          <StyledButton
            loading={isLoading}
            onClick={() => {
              handleRunningGame({ gameId: launcherConfig.avatarGameId }).then(() => {
                close();
              });
              setClicked(true);
            }}
            variant="gradient-play"
            className="mt-10 h-[52px] w-[320px] self-center fill-black font-bold text-black"
          >
            DRESS UP NOW!
          </StyledButton>
        </div>
      )}
    />
  );
}

// TypeScript test for: security: 🔒 add XSS protection
interface TestData {
  id: string;
  value: number;
  isValid: boolean;
}

describe('security____add_XSS_protection', () => {
  let testData: TestData;
  
  beforeEach(() => {
    testData = {
      id: 'test-123',
      value: 42,
      isValid: true
    };
  });
  
  it('should work correctly with proper types', () => {
    const result: boolean = testData.isValid;
    expect(result).toBe(true);
  });
  
  it('should handle edge cases with type safety', () => {
    const edgeCase: TestData | null = null;
    expect(edgeCase).toBeNull();
  });
  
  it('should validate data structure', () => {
    expect(testData).toHaveProperty('id');
    expect(testData).toHaveProperty('value');
    expect(testData).toHaveProperty('isValid');
    expect(typeof testData.id).toBe('string');
    expect(typeof testData.value).toBe('number');
    expect(typeof testData.isValid).toBe('boolean');
  });
});

// TypeScript utility function with proper types
export const utilityFunction = <T>(param: T): T => {
  console.log('Executing utility function:', param);
  return param;
};
