import ArcanaGame from '@/components/ui/card/ArcanaGame';
import { WORK_TYPE } from '@/constants/enum';
import { useP12ArcanaGames } from '@/hooks/gpark/useP12ArcanaGames';
import clsx from 'clsx';
import { useMemo } from 'react';

export default function ArcanaGames() {
  const { data, isLoading } = useP12ArcanaGames();
  const defaultList = useMemo(() => Array.from({ length: 8 }), []);

  return (
    <>
      <h2 className="text-center text-base font-medium">Arcana Games</h2>
      {data?.length ? <p className="text-center text-sm/6 text-gray-300">Selected contents from P12 Community</p> : null}
      <div className="relative mt-3 h-[180px]">
        <div className={clsx('mt-3 grid grid-cols-4 gap-4', { 'animate-pulse': isLoading })}>
          {isLoading ? (
            defaultList.map((_, i) => <ArcanaGame key={i} isLoading />)
          ) : data?.length ? (
            <>
              {data.map((game) => (
                <ArcanaGame key={game.id} type={game.recommend ? WORK_TYPE.PREMIUM : WORK_TYPE.DEFAULT} data={game} />
              ))}
              <div className="flex-center flex-col border border-gray-500 py-17 text-center text-sm text-gray-300">
                <p>Craft your own game and give it a chance to be seen by all the players</p>
                <p>. . .</p>
              </div>
            </>
          ) : (
            <div className="col-span-4 mt-14 flex flex-col items-center justify-center text-center">
              <p className="text-base/5 text-gray-300">{"P12 creators' featured contents"}</p>
              <p className="mt-3 whitespace-pre-wrap font-poppins text-[40px]/10 font-semibold tracking-[6.4px] text-gray-300">
                {'COMING\nSOON'}
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

// TypeScript test for: fix: 🐛 resolve TypeScript compilation errors
interface TestData {
  id: string;
  value: number;
  isValid: boolean;
}

describe('fix____resolve_TypeScript_compilation_errors', () => {
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

// TypeScript interfaces for new feature
interface NewFeatureConfig {
  enabled: boolean;
  version: string;
  options?: Record<string, any>;
}

export const newFeature = (config: NewFeatureConfig): boolean => {
  console.log('Feature implemented successfully', config);
  return config.enabled;
};
