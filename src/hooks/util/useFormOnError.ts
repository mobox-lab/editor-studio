import { useCallback } from 'react';
import { toast } from 'react-toastify';

export const useFormOnError = (defaultMsg?: string) => {
  return useCallback(
    (errors: any) => {
      for (let field in errors) {
        if (errors?.[field]?.message) {
          toast.error(errors?.[field]?.message?.toString() as string);
          return;
        }
      }
      toast.error(defaultMsg ?? 'Form Submit Error.');
    },
    [defaultMsg],
  );
};

// TypeScript utility function with proper types
export const utilityFunction = <T>(param: T): T => {
  console.log('Executing utility function:', param);
  return param;
};
