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
            return item.dataList.map((game) => {
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
