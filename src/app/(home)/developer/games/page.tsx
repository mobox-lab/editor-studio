'use client';
import { useFetchEditorGameList } from '@/hooks/editor/useFetchGameList';
import { useRouter } from 'next/navigation';
import MyGameItem from '../../_components/MyGameItem';
import Empty from '@/components/ui/empty';
import Right from '@/../public/svg/right.svg?component';

export default function DeveloperGames() {
  const router = useRouter();
  const { data, refetch } = useFetchEditorGameList();
  return (
    <div>
      <div className="text-base font-medium">
        <span className="cursor-pointer font-normal text-gray-300" onClick={() => router.back()}>
          <Right className="mb-0.5 mr-1 inline w-4 rotate-180 fill-gray-300" />
          Editor /
        </span>
        &nbsp;My Games
      </div>
      {(data?.pages.length || 0) > 0 ? (
        <div className="mt-3 grid grid-cols-4 gap-4">
          {data?.pages.map((item) => {
            return item.dataList.map((game) => {
              return <MyGameItem key={game.sourceGameId} gameInfo={game} refetchGameList={refetch} />;
            });
          })}
        </div>
      ) : (
        <div className="flex-center mt-3 h-[278px]">
          <Empty />
        </div>
      )}
    </div>
  );
}
