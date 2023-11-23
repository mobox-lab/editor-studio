import Refresh from '@/../public/svg/refresh.svg?component';
import { P12GameInfo } from '@/api';
import { categoryPremiumListAtom } from '@/atoms/category/arcana';
import StyledButton from '@/components/ui/button/StyledButton';
import ArcanaGame from '@/components/ui/card/ArcanaGame';
import { WORK_TYPE } from '@/constants/enum';
import { useFetchP12RecommendList } from '@/hooks/category/useFetchP12RecommendList';
import { useAtomValue } from 'jotai';
import _ from 'lodash-es';
import { useEffect, useMemo, useState } from 'react';

export default function LeftEditorSelection() {
  const { isLoading } = useFetchP12RecommendList();
  const premiumData = useAtomValue(categoryPremiumListAtom);
  const [premiumItems, setPremiumItems] = useState<P12GameInfo[]>([]);
  const defaultList = useMemo(() => Array.from({ length: 8 }), []);

  useEffect(() => {
    setPremiumItems(_.shuffle(premiumData));
  }, [premiumData]);

  return (
    <div className="flex flex-col gap-3">
      <div className="sticky top-0 z-10 flex items-center justify-between gap-3 bg-gray-800">
        Editor&apos;s Selection
        <StyledButton
          className="h-10 w-10"
          onClick={() => {
            setPremiumItems(_.shuffle(premiumData));
          }}
        >
          <Refresh />
        </StyledButton>
      </div>
      <div className="grid grid-cols-2 gap-4">
        {isLoading
          ? defaultList.map((item, i) => <ArcanaGame key={i} isLoading />)
          : premiumItems?.length
            ? premiumItems.map((item) => <ArcanaGame type={WORK_TYPE.PREMIUM} key={item.id} data={item} />)
            : null}
      </div>
    </div>
  );
}
