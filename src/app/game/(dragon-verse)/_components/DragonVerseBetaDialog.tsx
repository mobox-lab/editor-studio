import { useState } from 'react';
import { useAtom, useSetAtom } from 'jotai';
import Dialog from '@/components/ui/dialog';
import { useRouter } from 'next/navigation';
import StyledButton from '@/components/ui/button/StyledButton';
import { BetaType, dragonverseBetaDialogOpen, dragonverseBetaType } from '@/atoms/gpark/dragonverse';

export default function DragonVerseBetaDialog() {
  const router = useRouter();
  const [open, setOpen] = useAtom(dragonverseBetaDialogOpen);
  const setBetaType = useSetAtom(dragonverseBetaType);
  const [version, setVersion] = useState('');

  const onClick = (type: BetaType) => {
    setBetaType(type);
    setOpen(false);
    router.push(`/game/dragonverse-beta${version ? '?version=' + version : ''}`);
  };

  return (
    <Dialog
      title={<p className="px-4">Dragonverse Beta</p>}
      open={open}
      onOpenChange={setOpen}
      render={() => (
        <div className="p-5">
          <div>
            Version:&nbsp;
            <input type="text" className="border bg-transparent p-1" onChange={(event) => setVersion(event.target.value)} />
          </div>
          <div className="flex items-center justify-between gap-4">
            <StyledButton onClick={() => onClick('release')} className="mt-4 w-full py-2" variant="gradient">
              Go Release
            </StyledButton>
            <StyledButton onClick={() => onClick('beta')} className="mt-4 w-full py-2" variant="gradient">
              Go Beta
            </StyledButton>
          </div>
        </div>
      )}
    />
  );
}
