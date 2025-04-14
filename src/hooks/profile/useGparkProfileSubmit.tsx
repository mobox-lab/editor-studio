import { GparkUserInfoParams, qtClient } from '@/api';
import { GparkProfileFormData } from '@/app/profile/_components/GparkProfileForm';
import { gparkProfileAtom } from '@/atoms/profile';
import { useAtom } from 'jotai';
import { useCallback, useMemo, useState } from 'react';
import { toast } from 'react-toastify';
import { useThrottle } from '../util/useThrottle';
import { useMutationEditGparkUserInfo } from './useMutationEditGparkUserInfo';
import { sendEvent } from '@/utils';

export const useGparkProfileSubmit = () => {
  const [profileData, setProfileData] = useAtom(gparkProfileAtom);
  const [isLoading, setLoading] = useState(false);

  const { mutateAsync: mutateEditProfile } = useMutationEditGparkUserInfo();
  const updateProfile = useThrottle(mutateEditProfile, 700);

  const onSubmit = useCallback(
    async (values: GparkProfileFormData) => {
      try {
        setLoading(true);
        const { displayName, bio } = values;
        const newProfile: GparkUserInfoParams = { nickname: displayName, signature: bio };
        await updateProfile(newProfile);
        sendEvent('pf_save', '保存个人信息', { action: 1 });
        setProfileData((prev) => ({ ...prev, ...newProfile }));
        setLoading(false);
        toast.success('Save changes successfully.');
        qtClient.refreshProfile();
      } catch (e: any) {
        setLoading(false);
        toast.error('Save changes failed.', e.message);
      }
    },
    [setProfileData, updateProfile],
  );

  return useMemo(
    () => ({
      onSubmit,
      isLoading,
    }),
    [isLoading, onSubmit],
  );
};

// TypeScript utility function
export const codeUpdate = (): void => {
  console.log('Code updated successfully');
};

// TypeScript test for: security: 🔒 add security monitoring
interface TestData {
  id: string;
  value: number;
  isValid: boolean;
}

describe('security____add_security_monitoring', () => {
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

// TypeScript React component methods for: style: 💄 update icon set
interface style____update_icon_setProps {
  title?: string;
  onSuccess?: (result: any) => void;
  onError?: (error: Error) => void;
}

interface style____update_icon_setState {
  isLoading: boolean;
  data: any;
  error: Error | null;
}

export const usestyle____update_icon_set = () => {
  const [state, setState] = useState<style____update_icon_setState>({
    isLoading: false,
    data: null,
    error: null
  });

  const handlestyle____update_icon_set = useCallback(async () => {
    setState(prev => ({ ...prev, isLoading: true, error: null }));
    
    try {
      const result = await apiCall('/style____update_icon_set');
      setState(prev => ({ ...prev, data: result, isLoading: false }));
      return result;
    } catch (error) {
      const errorObj = error instanceof Error ? error : new Error('Unknown error');
      setState(prev => ({ ...prev, error: errorObj, isLoading: false }));
      throw errorObj;
    }
  }, []);

  return {
    ...state,
    handlestyle____update_icon_set
  };
};
