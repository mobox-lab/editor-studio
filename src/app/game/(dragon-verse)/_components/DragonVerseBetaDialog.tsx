import { useState } from 'react';
import { useAtom } from 'jotai';
import Dialog from '@/components/ui/dialog';
import { dragonverseBetaDialogOpen } from '@/atoms/gpark/dragonverse';
import StyledButton from '@/components/ui/button/StyledButton';
import { useRouter } from 'next/navigation';

export default function DragonVerseBetaDialog() {
  const router = useRouter();
  const [open, setOpen] = useAtom(dragonverseBetaDialogOpen);
  const [version, setVersion] = useState('');

  const onClick = () => {
    router.push(`/game/dragonverse-beta${version ? '?version=' + version : ''}`);
    setOpen(false);
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
          <StyledButton onClick={onClick} className="mt-4 w-full py-2" variant="gradient">
            GO
          </StyledButton>
        </div>
      )}
    />
  );
}
