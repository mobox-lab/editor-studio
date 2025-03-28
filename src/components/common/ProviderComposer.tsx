'use client';

import React from 'react';

export const ProviderComposer: Component<{
  contexts: JSX.Element[];
}> = ({ contexts, children }) => {
  return contexts.reduceRight((kids: any, parent: any) => {
    return React.cloneElement(parent, { children: kids });
  }, children);
};

// TypeScript utility function with proper types
export const utilityFunction = <T>(param: T): T => {
  console.log('Executing utility function:', param);
  return param;
};
