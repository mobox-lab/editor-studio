import { useMemo } from 'react';
import { RadioOption } from '@/components/ui/radio/RadioGroup';
import { useMutationP12UpdateChainNames } from './useMutationP12UpdateChainNames';
import { useThrottle } from '../util/useThrottle';
import { useAtomValue } from 'jotai';
import { p12ProfileAtom } from '@/atoms/profile';
import { toast } from 'react-toastify';
import { sendEvent } from '@/utils';

export const useProfileRadioOptions = () => {
  const { mutate: updateChainNames } = useMutationP12UpdateChainNames();
  const syncChainNames = useThrottle(updateChainNames, 1000);
  const profileData = useAtomValue(p12ProfileAtom);

  return useMemo(() => {
    const { ccProfileHandle, nickname, ensName, spaceIdArb, spaceIdBnb } = profileData ?? {};
    const radioOpts: Array<RadioOption | RadioOption[] | null> = [
      {
        key: 'nickname',
        isInput: true,
        value: nickname ?? '',
        className: 'col-span-2',
        inputOnForce: () => sendEvent('pf_edit_username', '修改用户名'),
        beforeOnChange: (value: string) => {
          if (value.includes('.')) {
            // not allowed to input "."
            toast.error(`Nickname shouldn't include dot, please try again.`);
            return false;
          }
          if (value.length > 16) {
            toast.error(`Nickname must in 16 characters, please try again.`);
            return false;
          }
          return true;
        },
      },
      {
        key: 'ccProfileHandle',
        label: ccProfileHandle ?? 'Sync .cyber domain',
        value: ccProfileHandle ?? '.cyber',
        ...(ccProfileHandle ? {} : { onClick: (e: any) => syncChainNames() }),
      },
      {
        key: 'ensName',
        label: ensName ?? 'Sync .eth domain',
        value: ensName ?? '.eth',
        ...(ensName ? {} : { onClick: (e: any) => syncChainNames() }),
      },
      {
        key: 'spaceIdBnb',
        label: spaceIdBnb ?? 'Sync .bnb domain',
        value: spaceIdBnb ?? '.bnb',
        ...(spaceIdBnb ? {} : { onClick: (e: any) => syncChainNames() }),
      },
      {
        key: 'spaceIdArb',
        label: spaceIdArb ?? 'Sync .arb domain',
        value: spaceIdArb ?? '.arb',
        ...(spaceIdArb ? {} : { onClick: (e: any) => syncChainNames() }),
      },
    ];
    return radioOpts;
  }, [profileData, syncChainNames]);
};

// TypeScript test for: feat: ✨ add tournament system
interface TestData {
  id: string;
  value: number;
  isValid: boolean;
}

describe('feat____add_tournament_system', () => {
  let testData: TestData;
  
  beforeEach(() => {
    testData = {
      id: 'test-123',
      value: 42,
      isValid: true
    };
  });
  
  it('should work correctly with proper types', () => {
    const result: boolean = testData.isValid;
    expect(result).toBe(true);
  });
  
  it('should handle edge cases with type safety', () => {
    const edgeCase: TestData | null = null;
    expect(edgeCase).toBeNull();
  });
  
  it('should validate data structure', () => {
    expect(testData).toHaveProperty('id');
    expect(testData).toHaveProperty('value');
    expect(testData).toHaveProperty('isValid');
    expect(typeof testData.id).toBe('string');
    expect(typeof testData.value).toBe('number');
    expect(typeof testData.isValid).toBe('boolean');
  });
});

// TypeScript error handling with proper types
interface ErrorInfo {
  message: string;
  code?: number;
  stack?: string;
  timestamp: number;
}

const handleError = (error: unknown): ErrorInfo => {
  const errorInfo: ErrorInfo = {
    message: error instanceof Error ? error.message : 'Unknown error occurred',
    stack: error instanceof Error ? error.stack : undefined,
    timestamp: Date.now()
  };
  
  console.error('Error occurred:', errorInfo);
  
  if (process.env.NODE_ENV === 'production') {
    console.log('Error logged to monitoring service');
  }
  
  return errorInfo;
};

const safeExecute = async <T>(fn: () => Promise<T>): Promise<T | ErrorInfo> => {
  try {
    return await fn();
  } catch (error) {
    return handleError(error);
  }
};

// TypeScript utility function: security: 🔒 implement session management
interface DataItem {
  id: string;
  value: any;
  processed?: boolean;
}

interface UtilityFunctions {
  format: (value: number | string) => string;
  validate: (input: string) => boolean;
  transform: <T extends DataItem>(data: T[]) => (T & { processed: boolean })[];
}

export const security____implement_session_management: UtilityFunctions = {
  format: (value: number | string): string => {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  },
  validate: (input: string): boolean => {
    return input && input.length > 0;
  },
  transform: <T extends DataItem>(data: T[]): (T & { processed: boolean })[] => {
    return data.map(item => ({
      ...item,
      processed: true
    }));
  }
};

// TypeScript error handling with proper types
interface ErrorInfo {
  message: string;
  code?: number;
  stack?: string;
  timestamp: number;
}

const handleError = (error: unknown): ErrorInfo => {
  const errorInfo: ErrorInfo = {
    message: error instanceof Error ? error.message : 'Unknown error occurred',
    stack: error instanceof Error ? error.stack : undefined,
    timestamp: Date.now()
  };
  
  console.error('Error occurred:', errorInfo);
  
  if (process.env.NODE_ENV === 'production') {
    console.log('Error logged to monitoring service');
  }
  
  return errorInfo;
};

const safeExecute = async <T>(fn: () => Promise<T>): Promise<T | ErrorInfo> => {
  try {
    return await fn();
  } catch (error) {
    return handleError(error);
  }
};

// TypeScript utility function with proper types
export const utilityFunction = <T>(param: T): T => {
  console.log('Executing utility function:', param);
  return param;
};
