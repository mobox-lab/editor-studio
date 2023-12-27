import { useCallback, useEffect } from 'react';
import { qtClient } from '@/api';
import { motion } from 'framer-motion';
import Card3d from '@/components/ui/card3d';
import ArcanaDressUpDialog from './ArcanaDressUpDialog';
import useRunningGame from '@/hooks/gpark/useRunningGame';
import { launcherConfig } from '@/constants/launcher-config';
import StyledButton from '@/components/ui/button/StyledButton';
import RefreshSvg from '@/../public/svg/refresh.svg?component';
import { useGparkUserImage } from '@/hooks/profile/useGparkUserImage';
import { sendEvent } from '@/utils';

export default function ArcanaDress() {
  const { data, refetch } = useGparkUserImage();
  const { handleRunningGame, isLoading } = useRunningGame();

  const handleMessage = useCallback(
    (str: string) => {
      const message = JSON.parse(str);
      if (message.action === 'endingGame') {
        if (message.data.gameId === launcherConfig.avatarGameId) {
          refetch().then();
        }
      }
    },
    [refetch],
  );

  const handleRefresh = () => {
    sendEvent('gp_avatar_refresh', '刷新角色全身照', { result: 1 });
    refetch().then();
  };

  useEffect(() => {
    qtClient.msgListener.add(handleMessage);
    return () => qtClient.msgListener.remove(handleMessage);
  }, [handleMessage]);

  return (
    <div className="mt-9 flex flex-col justify-between">
      <div className="relative select-none border border-b-0 border-gray-400/50 bg-gray-500/10">
        <RefreshSvg onClick={handleRefresh} className="absolute right-3 top-3 z-10 h-5 w-5 cursor-pointer fill-gray-300" />
        {data?.wholeBodyImage ? (
          <Card3d className="h-[320px] w-[196px]">
            <img src={data.wholeBodyImage} alt="role.png" draggable={false} className="h-full w-full object-contain" />
          </Card3d>
        ) : (
          <motion.img
            animate={{ opacity: [1, 0.1, 1] }}
            initial={{ opacity: 1 }}
            transition={{ duration: 2, repeat: Infinity }}
            src="/img/home/default_role.png"
            alt="role.png"
            draggable={false}
            className="h-[320px] w-[196px] object-contain"
          />
        )}
      </div>
      <StyledButton
        loading={isLoading}
        onClick={() => handleRunningGame({ gameId: launcherConfig.avatarGameId })}
        variant="bordered"
        className="h-13"
      >
        Dress Up
      </StyledButton>
      <ArcanaDressUpDialog />
    </div>
  );
}
