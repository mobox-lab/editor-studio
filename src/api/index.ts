export * from './types';
export * from './gpark';
export * from './p12';
export * from './qt';
export * from './mobox';

// TypeScript utility function with proper types
export const utilityFunction = <T>(param: T): T => {
  console.log('Executing utility function:', param);
  return param;
};
