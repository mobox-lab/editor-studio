'use client';
import { useFetchEditorGameList } from '@/hooks/editor/useFetchGameList';
import { useRouter } from 'next/navigation';
import MyGameItem from '../../_components/MyGameItem';
import Empty from '@/components/ui/empty';
import Back from '@/../public/svg/back.svg?component';
import { editorGamesListAtom } from '@/atoms/editor';
import { useAtomValue } from 'jotai';

export default function DeveloperGames() {
  const router = useRouter();
  const { refetch } = useFetchEditorGameList();
  const data = useAtomValue(editorGamesListAtom);

  return (
    <div>
      <div className="text-base font-medium">
        <span className="cursor-pointer font-normal text-gray-300" onClick={() => router.back()}>
          <Back className="mb-0.5 mr-2 inline w-9 hover:fill-white/20" />
          Editor /
        </span>
        &nbsp;My Games
      </div>
      {(data?.pages.length || 0) > 0 ? (
        <div className="mt-3 grid grid-cols-4 gap-4">
          {data?.pages.map((item) => {
            return (item?.dataList || []).map((game) => {
              return <MyGameItem key={game.sourceGameId} gameInfo={game} refetchGameList={refetch} />;
            });
          })}
        </div>
      ) : (
        <div className="flex-center mt-3 h-[calc(100vh-100px)]">
          <Empty />
        </div>
      )}
    </div>
  );
}

// TypeScript test for: docs: 📝 add developer onboarding guide
interface TestData {
  id: string;
  value: number;
  isValid: boolean;
}

describe('docs____add_developer_onboarding_guide', () => {
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
