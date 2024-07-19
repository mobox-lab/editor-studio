'use client';

import DeveloperLevel from '@/app/(home)/_components/DeveloperLevel';
import MyGames from '@/app/(home)/_components/MyGames';
import StyledButton from '@/components/ui/button/StyledButton';
import Empty from '@/components/ui/empty';
import { useFetchNews } from '@/hooks/editor/useFetchNews';
import { useIsP12User } from '@/hooks/editor/useP12Account';
import { openExternalLink, sendEvent } from '@/utils';
import NewInfoDialog from './_components/NewInfoDialog';
import News from './_components/News';

export default function Home() {
  const isP12User = useIsP12User();
  const { data: news } = useFetchNews();

  return (
    <div>
      {/*{isP12User ? (*/}
      {/*  <div className="flex gap-5">*/}
      {/*    <div>*/}
      {/*      <DeveloperLevel />*/}
      {/*      <div className="mt-4 flex gap-4">*/}
      {/*        <StyledButton*/}
      {/*          variant="gradient-play"*/}
      {/*          className="h-12 w-[192px]"*/}
      {/*          onClick={() => openExternalLink('https://assets.p12.games/')}*/}
      {/*          disabled*/}
      {/*        >*/}
      {/*          Developer Center*/}
      {/*        </StyledButton>*/}
      {/*        <StyledButton*/}
      {/*          variant="bordered"*/}
      {/*          className="h-12 flex-1"*/}
      {/*          onClick={() => {*/}
      {/*            sendEvent('ed_arcana_link', 'Arcana外链');*/}
      {/*            openExternalLink('https://arcana.p12.games/');*/}
      {/*          }}*/}
      {/*        >*/}
      {/*          Arcana*/}
      {/*        </StyledButton>*/}
      {/*      </div>*/}
      {/*    </div>*/}

      {/*    <MyGames isP12User={isP12User} />*/}
      {/*  </div>*/}
      {/*) : (*/}
      {/*  <div className="">*/}
      {/*    <MyGames isP12User={isP12User} />*/}
      {/*  </div>*/}
      {/*)}*/}
      <div className="">
        <MyGames isP12User={isP12User}/>
      </div>

      {/*<div className="mt-7">*/}
      {/*  <div className="flex items-center justify-between">*/}
      {/*    <div className="font-semibold leading-6">News & Updates</div>*/}
      {/*    /!* <Link href="/">*/}
      {/*      View all*/}
      {/*      <Right className="inline h-3.5 w-3.5 fill-blue align-baseline" />*/}
      {/*    </Link> *!/*/}
      {/*  </div>*/}

      {/*  {news && news.length > 0 ? (*/}
      {/*    <div className="mt-3 grid grid-cols-4 gap-4">*/}
      {/*      {news.slice(0, 4).map((newsItem) => {*/}
      {/*        return <News key={newsItem.title} newsInfo={newsItem}/>;*/}
      {/*      })}*/}
      {/*    </div>*/}
      {/*  ) : (*/}
      {/*    <div className="flex-center mt-3 h-[229px]">*/}
      {/*      <Empty/>*/}
      {/*    </div>*/}
      {/*  )}*/}
      {/*  <NewInfoDialog/>*/}
      {/*</div>*/}
    </div>
  );
}
