'use client';

import Refresh from '@/../public/svg/refresh.svg?component';
import StyledButton from '@/components/ui/button/StyledButton';
import ArcanaGame from '@/components/ui/card/ArcanaGame';

export default function LeftEditorSelection() {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between gap-3">
        Editor&apos;s Selection
        <StyledButton className="h-10 w-10">
          <Refresh />
        </StyledButton>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <ArcanaGame />
        <ArcanaGame />
        <ArcanaGame />
        <ArcanaGame />
        <ArcanaGame />
      </div>
    </div>
  );
}
