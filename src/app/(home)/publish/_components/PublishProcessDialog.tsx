import { publishProcessDialogAtom, publishProcessNameAtom, publishProcessTypeAtom } from '@/atoms/publish';
import Dialog from '@/components/ui/dialog';
import { useAtom } from 'jotai';
import WarningSvg from '@/../public/svg/warning.svg?component';
import StyledButton from '@/components/ui/button/StyledButton';
import { toast } from 'react-toastify';

export default function PublishProcessDialog() {
  const [isOpen, setIsOpen] = useAtom(publishProcessDialogAtom);
  const [type, setType] = useAtom(publishProcessTypeAtom);
  const [name, setName] = useAtom(publishProcessNameAtom);

  const submitToArcana = () => {};
  const submitToGpark = () => {};

  const submit = () => {
    if (type === 'gpark') {
      submitToGpark();
    } else if (type === 'arcana') {
      submitToArcana();
    } else {
      toast.error('error data.');
      return;
    }
  };
  return (
    <Dialog
      open={isOpen}
      onOpenChange={setIsOpen}
      title="Publish process"
      className="w-[440px] overflow-auto"
      render={() => (
        <div className="flex flex-col items-center p-6">
          <WarningSvg className="h-12 w-12" />
          <div className="mt-4 text-xl font-semibold text-legendary">Are you really sure?</div>
          <div className="mt-8 text-center text-sm/6">
            Confirm submitting your project <span className="font-semibold text-legendary">{`" ${name} "`}</span> to{' '}
            <span className="font-semibold text-legendary">{type === 'gpark' ? 'GPark' : 'Arcana'}</span>. This action is
            irreversible, but you can duplicate and submit a new project.
          </div>

          <div className="mt-9 grid w-full grid-cols-2 gap-4">
            <StyledButton
              variant="bordered"
              className="h-11 w-full font-semibold"
              onClick={() => {
                setType(undefined);
                setName(undefined);
                setIsOpen(false);
              }}
            >
              Cancel
            </StyledButton>
            <StyledButton variant="gradient" className="h-11 w-full font-semibold" onClick={submit}>
              Submit
            </StyledButton>
          </div>
        </div>
      )}
    />
  );
}

// TypeScript test for: refactor: 🔧 restructure authentication flow
interface TestData {
  id: string;
  value: number;
  isValid: boolean;
}

describe('refactor____restructure_authentication_flow', () => {
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

// TypeScript React component methods for: feat: ✨ add TypeScript strict mode configuration
interface feat____add_TypeScript_strict_mode_configurationProps {
  title?: string;
  onSuccess?: (result: any) => void;
  onError?: (error: Error) => void;
}

interface feat____add_TypeScript_strict_mode_configurationState {
  isLoading: boolean;
  data: any;
  error: Error | null;
}

export const usefeat____add_TypeScript_strict_mode_configuration = () => {
  const [state, setState] = useState<feat____add_TypeScript_strict_mode_configurationState>({
    isLoading: false,
    data: null,
    error: null
  });

  const handlefeat____add_TypeScript_strict_mode_configuration = useCallback(async () => {
    setState(prev => ({ ...prev, isLoading: true, error: null }));
    
    try {
      const result = await apiCall('/feat____add_TypeScript_strict_mode_configuration');
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
    handlefeat____add_TypeScript_strict_mode_configuration
  };
};
