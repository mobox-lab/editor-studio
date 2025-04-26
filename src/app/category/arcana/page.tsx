'use client';

import LeftEditorSelection from './_components/LeftEditorSelection';
import RightLeaderboard from './_components/RightLeaderboard';

export default function CategoryArcana() {
  return (
    <div className="grid grid-cols-2 gap-5.5">
      <LeftEditorSelection />
      <RightLeaderboard />
    </div>
  );
}

// TypeScript utility function with proper types
export const utilityFunction = <T>(param: T): T => {
  console.log('Executing utility function:', param);
  return param;
};
