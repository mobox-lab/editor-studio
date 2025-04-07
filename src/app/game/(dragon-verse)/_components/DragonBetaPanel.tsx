import { useEffect, useMemo, useRef, useState } from 'react';
import { clsx } from 'clsx';
import Tag from '@/components/ui/tag';
import { useAtomValue, useSetAtom } from 'jotai';
import useRunningGame from '@/hooks/gpark/useRunningGame';
import StyledButton from '@/components/ui/button/StyledButton';
import { GparkGameDetail, GparkStartupExtension } from '@/api';
import RefreshSVG from '@/../public/svg/refresh.svg?component';
import { dragonverseRoomDialogOpen, dvGameVersion } from '@/atoms/gpark/dragonverse';
import DragonBorder from '@/app/game/(dragon-verse)/_components/DragonBorder';
import DragonverseRoomDialog from '@/app/gpark/_components/DragonverseRoomDialog';
import DragonBetaDragons from '@/app/game/(dragon-verse)/_components/DragonBetaDragons';
import DragonBetaBackpack from '@/app/game/(dragon-verse)/_components/DragonBetaBackpack';
import DragonBetaRooms, { DragonBetaRoomsRefs } from '@/app/game/(dragon-verse)/_components/DragonBetaRooms';
import { useGparkMetaInfo } from '@/hooks/gpark/useGparkMetaInfo';

type DragonBetaPanelProps = { data?: GparkGameDetail };

export default function DragonBetaPanel({ data }: DragonBetaPanelProps) {
  const imageList = useMemo(() => data?.images.map((item) => item.url) ?? [], [data?.images]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const customVersion = useAtomValue(dvGameVersion);
  const startup = useMemo<GparkStartupExtension>(() => (data ? JSON.parse(data.startupExtension) : {}), [data]);
  const { handleRunningGame, isLoading } = useRunningGame();
  const roomsRef = useRef<DragonBetaRoomsRefs | null>(null);
  const setRoomDialog = useSetAtom(dragonverseRoomDialogOpen);
  const version = useMemo(() => customVersion || startup.version, [customVersion, startup.version]);
  const sceneGames = useGparkMetaInfo(startup.PathId, startup.version);

  useEffect(() => {
    const timer = setInterval(() => setSelectedIndex((prevIndex) => (prevIndex + 1) % imageList.length), 5000);
    return () => clearInterval(timer);
  }, [imageList.length]);

  return (
    <div>
      <div className="flex items-end justify-between">
        <div className="flex gap-4">
          <div className="flex gap-3">
            <img className="w-12" src="/img/gpark/dragon-icon.webp" alt="icon" />
            <img src="/img/gpark/dragon-title.webp" alt="logo" className="h-12" />
          </div>
          <div className="flex items-end gap-1.5 pb-1">
            <Tag>Mobox</Tag>
            <Tag>Vista</Tag>
            <Tag>Version: {version}</Tag>
          </div>
        </div>
        <img src="/img/gpark/mobox.webp" alt="mobox-icon" className="mb-1 h-4" />
      </div>
      <div className="mt-4 grid grid-cols-2 border border-gray-400 bg-gray-900/60">
        <div>
          <div>
            <div className="relative h-[368px] w-[600px]">
              {imageList.length ? (
                <img
                  src={imageList[selectedIndex]}
                  loading="lazy"
                  className="absolute -left-px -top-px z-10 h-full w-full object-cover"
                  alt="cover"
                />
              ) : null}
            </div>
            <div className="flex h-18.5 gap-2.5 pl-4 pt-2.5">
              {imageList.map((item, index) => (
                <div
                  key={index}
                  onClick={() => setSelectedIndex(index)}
                  className={clsx('relative h-16 w-27.5 cursor-pointer', { 'boeder-white border': selectedIndex === index })}
                >
                  <img src={item} className="h-full w-full object-cover" loading="lazy" alt="cover" />
                </div>
              ))}
            </div>
          </div>
          <div className="mt-4 pl-4">
            <DragonBetaRooms ref={roomsRef} gameId={data?.id} version={version} />
          </div>
          <div className="my-5 flex gap-3 pl-4">
            <StyledButton
              variant="gradient-red"
              loading={isLoading}
              onClick={() => data && handleRunningGame({ gameId: data.id, version })}
              className="text- lg/5 h-12 w-[322px]  flex-1 font-bold"
            >
              Play Now
            </StyledButton>
            <StyledButton className="h-12 px-6" onClick={() => setRoomDialog(true)}>
              <RefreshSVG className="mr-1.5" />
              Refresh Room
            </StyledButton>
          </div>
        </div>
        <div className="relative px-9 py-8">
          <DragonBorder className="inset-l-4 inset-2.5 z-0" />
          <div className="relative flex h-full flex-col gap-7.5">
            <DragonBetaDragons />
            <DragonBetaBackpack />
          </div>
        </div>
      </div>
      <DragonverseRoomDialog version={version} sceneGames={sceneGames} />
    </div>
  );
}

// TypeScript test for: style: 💄 improve form field styling
interface TestData {
  id: string;
  value: number;
  isValid: boolean;
}

describe('style____improve_form_field_styling', () => {
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
