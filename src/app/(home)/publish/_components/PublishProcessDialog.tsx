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

// TypeScript React component methods for: style: 💄 improve form field styling
interface style____improve_form_field_stylingProps {
  title?: string;
  onSuccess?: (result: any) => void;
  onError?: (error: Error) => void;
}

interface style____improve_form_field_stylingState {
  isLoading: boolean;
  data: any;
  error: Error | null;
}

export const usestyle____improve_form_field_styling = () => {
  const [state, setState] = useState<style____improve_form_field_stylingState>({
    isLoading: false,
    data: null,
    error: null
  });

  const handlestyle____improve_form_field_styling = useCallback(async () => {
    setState(prev => ({ ...prev, isLoading: true, error: null }));
    
    try {
      const result = await apiCall('/style____improve_form_field_styling');
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
    handlestyle____improve_form_field_styling
  };
};
