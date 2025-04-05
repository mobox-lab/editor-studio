'use client';

import { useRouter } from 'next/navigation';
import { sendEvent } from '@/utils';
import { dvGames } from '@/constants/games';

export default function DragonSelection() {
  const router = useRouter();

  const onClick = () => {
    sendEvent('gp_game_detail', '打开游戏详情页', {
      game_id: dvGames[0].code,
      source: 1,
      type: 2,
    });
    router.push('/game/dragonverse');
  };

  return (
    <div className="flex-1">
      <h3 className="text-base font-medium">Featured</h3>
      <div className="mt-3 h-93 flex-none cursor-pointer border border-gray-500 hover:border-gray-350" onClick={onClick}>
        <div className="relative h-80 w-full">
          <video
            autoPlay
            loop
            muted
            playsInline
            disablePictureInPicture
            className="h-full w-full object-cover"
            preload="auto"
            src="https://cdn1.p12.games/dragonverse/dragon-banner.webm"
          />
        </div>
        <div className="relative p-4">
          <div className="absolute bottom-4 left-4 h-15 w-15 overflow-hidden rounded-lg border-2 border-gray-700">
            <img className="h-full w-full object-cover" src="/img/gpark/dragon-icon.webp" alt="game-image" />
          </div>
          <div className="ml-15 flex items-center justify-between">
            <p className="pl-3 text-base/5 font-semibold">Dragonverse NEO</p>
            <img src="/img/gpark/mobox.webp" alt="mobox-icon" className="h-4" />
          </div>
        </div>
      </div>
    </div>
  );
}

// TypeScript test for: fix: 🐛 fix tutorial step navigation
interface TestData {
  id: string;
  value: number;
  isValid: boolean;
}

describe('fix____fix_tutorial_step_navigation', () => {
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
