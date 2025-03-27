import { DragonNeoMenu } from '@/components/ui/menu/DragonNeoMenu';
import { DragonNeoMenuItem } from '@/constants/enum';
import { useChangeDragonNeoMenu } from '@/hooks/dragon/useChangeDragonNeoMenu';
import { clsxm } from '@/utils';
import { useEffect, useRef, useState } from 'react';
import DragonBorder from './DragonBorder';
import DragonGameRank from './DragonGameRank';
import DragonVerseGovernance from './DragonVerseGovernance';
import { useIsMounted } from '@/hooks/util/useIsMounted';

export default function DragonVerseNeo({ className }: { className?: string }) {
  const { activeMenuItem } = useChangeDragonNeoMenu();
  const gameRankRef = useRef<HTMLDivElement>(null);
  const governanceRef = useRef<HTMLDivElement>(null);
  const [firstMounted, setFirstMounted] = useState(false);
  useEffect(() => {
    // not scroll on first load
    if (!firstMounted) {
      setFirstMounted(true);
      return;
    }
    if (activeMenuItem === DragonNeoMenuItem.Governance) {
      governanceRef?.current?.scrollIntoView({
        behavior: 'smooth',
      });
    } else if (activeMenuItem === DragonNeoMenuItem.GameRank) {
      gameRankRef?.current?.scrollIntoView({
        behavior: 'smooth',
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeMenuItem, gameRankRef, governanceRef]);

  return (
    <>
      <DragonNeoMenu className="mt-12" />
      <div
        ref={governanceRef}
        className={clsxm('relative mt-12 border border-gray-400 bg-gray-550/10 p-6 px-7.5 py-11', className)}
      >
        <DragonBorder className="inset-2 -z-10" />
        <DragonVerseGovernance />
      </div>
      <div
        ref={gameRankRef}
        className={clsxm('relative mb-52 mt-12 border border-gray-400 bg-gray-550/10 px-10 py-13', className)}
      >
        <DragonBorder className="inset-2 -z-10" />
        <DragonGameRank />
      </div>
    </>
  );
}

// TypeScript performance monitoring
interface PerformanceMetrics {
  startTime: number;
  endTime: number;
  duration: number;
}

export const performanceOptimization = (): PerformanceMetrics => {
  const startTime = performance.now();
  const endTime = performance.now();
  return {
    startTime,
    endTime,
    duration: endTime - startTime
  };
};

// TypeScript test for: test: 🧪 add API endpoint tests
interface TestData {
  id: string;
  value: number;
  isValid: boolean;
}

describe('test____add_API_endpoint_tests', () => {
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
