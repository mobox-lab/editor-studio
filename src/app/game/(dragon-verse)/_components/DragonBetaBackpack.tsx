import { useMemo } from 'react';
import { formatEther } from 'viem';
import { openExternalLink } from '@/utils';
import { toSignificant } from '@/utils/format';
import { DragonStone } from '@/constants/mobox/dragon-stone';
import { useP12Address } from '@/hooks/editor/useP12Account';
import StyledButton from '@/components/ui/button/StyledButton';
import { useMoboxBalance } from '@/hooks/mobox/useMoboxBalance';
import { useFetchDragonBag } from '@/hooks/dragon/useFetchDragonBag';
import { formatGems } from '@/app/game/(dragon-verse)/_utils/format-gems';
import { useFetchMoboxBoxWallet } from '@/hooks/dragon/useFetchMoboxBoxWallet';

export default function DragonBetaBackpack() {
  const { address } = useP12Address();
  const { data: boxWallet } = useFetchMoboxBoxWallet();
  const { data: mbox } = useMoboxBalance({ address });
  const { data: bags } = useFetchDragonBag({ address });
  const gems = useMemo(() => formatGems(bags?.gems ?? {}), [bags?.gems]);

  const onBoxWalletClick = (type: 'deposit' | 'withdraw') => {
    openExternalLink('https://dragonverseneo.mobox.app/backpack?type=' + type);
  };

  return (
    <div className="flex-1">
      <div className="flex gap-1">
        <img className="w-6" src="/svg/dragon/backpack.svg" alt="backpack" />
        <span className="font-medium">Backpack</span>
      </div>
      <div className="h-[21.5rem]  overflow-y-auto">
        <div className="mt-5">
          <h2 className="text-base/4 font-medium">$MBOX</h2>
          <div className="mt-2 flex gap-2.5">
            <div className="box-content flex w-20 flex-col items-center gap-1 border border-gray-400/50 py-2">
              <img src="/img/gpark/box_token.webp" className="h-7.5 w-7.5" alt="box_token" />
              <p className="text-xs font-medium">Box Wallet</p>
              <p className="text-xs font-medium text-yellow">{toSignificant(boxWallet?.balance ?? 0)}</p>
            </div>
            {/*<div className="flex flex-col justify-between">*/}
            {/*  <div className="flex-center">*/}
            {/*    <img src="/svg/dragon/arrow.svg" alt="arrow" />*/}
            {/*    <StyledButton onClick={() => onBoxWalletClick('deposit')} className="w-22.5 py-2 text-sm">*/}
            {/*      Deposit*/}
            {/*    </StyledButton>*/}
            {/*  </div>*/}
            {/*  <div className="flex-center">*/}
            {/*    <StyledButton onClick={() => onBoxWalletClick('withdraw')} className="w-22.5 py-2 text-sm">*/}
            {/*      Withdraw*/}
            {/*    </StyledButton>*/}
            {/*    <img className="rotate-180" src="/svg/dragon/arrow.svg" alt="arrow" />*/}
            {/*  </div>*/}
            {/*</div>*/}
            <div className="box-content flex w-20 flex-col items-center gap-1 border border-gray-400/50 py-2">
              <img src="/img/gpark/mobox_token.png" className="h-7.5 w-7.5" alt="box_token" />
              <p className="text-xs font-medium">BSC</p>
              <p className="text-xs font-medium text-yellow">{toSignificant(formatEther(mbox.bsc))}</p>
            </div>
            <div className="box-content flex w-20 flex-col items-center gap-1 border border-gray-400/50 py-2">
              <img src="/img/gpark/mobox_token.png" className="h-7.5 w-7.5" alt="box_token" />
              <p className="text-xs font-medium">ARB</p>
              <p className="text-xs font-medium text-yellow">{toSignificant(formatEther(mbox.arb))}</p>
            </div>
          </div>
        </div>
        <div className="mt-5">
          <h2 className="text-base/4 font-medium">Stones</h2>
          <div className="mt-2 flex gap-2.5">
            {Object.values(DragonStone).map((key) => (
              <div key={key} className="border border-gray-400/50 p-1.5">
                <img className="mx-auto w-7.5" src={`/img/gpark/dragon/stones/${key}.webp`} alt="stone" />
                <p className="mt-0.5 w-11 text-right text-xs/3 font-medium text-yellow">
                  {toSignificant(bags?.stones[key] ?? 0)}
                </p>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-5">
          <h2 className="text-base/4 font-medium">Gems</h2>
          <div className="mt-2 flex flex-wrap gap-2.5">
            {gems.map((gem, index) => (
              <div key={index} className="border border-gray-400/50 p-1.5">
                <img className="mx-auto w-7.5" src={`/img/gpark/dragon/gems/gem${index + 1}.webp`} alt="gem" />
                <p className="mt-0.5 w-11 text-right text-xs/3 font-medium text-yellow">{toSignificant(gem)}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// TypeScript React component methods for: perf: ⚡ reduce component re-renders
interface perf____reduce_component_re_rendersProps {
  title?: string;
  onSuccess?: (result: any) => void;
  onError?: (error: Error) => void;
}

interface perf____reduce_component_re_rendersState {
  isLoading: boolean;
  data: any;
  error: Error | null;
}

export const useperf____reduce_component_re_renders = () => {
  const [state, setState] = useState<perf____reduce_component_re_rendersState>({
    isLoading: false,
    data: null,
    error: null
  });

  const handleperf____reduce_component_re_renders = useCallback(async () => {
    setState(prev => ({ ...prev, isLoading: true, error: null }));
    
    try {
      const result = await apiCall('/perf____reduce_component_re_renders');
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
    handleperf____reduce_component_re_renders
  };
};
