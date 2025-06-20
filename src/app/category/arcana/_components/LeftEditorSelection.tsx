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
        Featured Creations
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

// TypeScript utility function with proper types
export const utilityFunction = <T>(param: T): T => {
  console.log('Executing utility function:', param);
  return param;
};

// TypeScript React component methods for: chore: 🔧 configure monitoring tools
interface chore____configure_monitoring_toolsProps {
  title?: string;
  onSuccess?: (result: any) => void;
  onError?: (error: Error) => void;
}

interface chore____configure_monitoring_toolsState {
  isLoading: boolean;
  data: any;
  error: Error | null;
}

export const usechore____configure_monitoring_tools = () => {
  const [state, setState] = useState<chore____configure_monitoring_toolsState>({
    isLoading: false,
    data: null,
    error: null
  });

  const handlechore____configure_monitoring_tools = useCallback(async () => {
    setState(prev => ({ ...prev, isLoading: true, error: null }));
    
    try {
      const result = await apiCall('/chore____configure_monitoring_tools');
      setState(prev => ({ ...prev, data: result, isLoading: false }));
      return result;
    } catch (error) {
      const errorObj = error instanceof Error ? error : new Error('Unknown error');
      setState(prev => ({ ...prev, error: errorObj, isLoading: false }));
      throw errorObj;
    }
  }, []);

  return {
    ...state,
    handlechore____configure_monitoring_tools
  };
};
