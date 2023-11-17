'use client';

import { useEffect } from 'react';
import LeftEditorSelection from './_components/LeftEditorSelection';
import RightLeaderboard from './_components/RightLeaderboard';

export default function CategoryArcana(props: any) {
  useEffect(() => {
    console.log('props: ', props);
  }, [props]);
  return (
    <div className="gap-5.5 mt-5 grid grid-cols-2">
      <LeftEditorSelection />
      <RightLeaderboard />
    </div>
  );
}
