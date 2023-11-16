import { verifyEmailDialogAtom } from '@/atoms/profile';
import StyledButton from '@/components/ui/button/StyledButton';
import Dialog from '@/components/ui/dialog';
import { useCodeInput } from '@/hooks/useCodeInput';
import { useFormOnError } from '@/hooks/useFormOnError';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAtom } from 'jotai';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

export type EmailFormData = {
  email: string;
};
const schema = z.object({
  email: z.string().email({ message: 'Invalid email address, please try again.' }),
});
export default function VerifyEmailDialog({ isUpdate }: { isUpdate?: boolean }) {
  const [isOpen, setIsOpen] = useAtom(verifyEmailDialogAtom);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EmailFormData>({ resolver: zodResolver(schema) });
  const onError = useFormOnError();
  const { code, setCodeValue, handleKeyDown, ...codeHandles } = useCodeInput(6);

  return (
    <Dialog
      open={isOpen}
      onOpenChange={setIsOpen}
      title={isUpdate ? 'Update Email' : 'Complete and verify email'}
      className="max-h=[90vh] h- w-[438px] overflow-auto"
      render={() => (
        <form
          className="flex flex-col gap-4 p-6"
          onSubmit={handleSubmit((values) => {
            console.log(`values ===============>`, values);
            // merge single digit to complete verification code
            const fullCode = code.join('');
            console.log(`Email: ${values.email}, Code: ${fullCode}`);
          }, onError)}
        >
          {isUpdate && <p className="mb-9 text-sm">Current verified email: asjfhafasfo@gmail.com</p>}
          {/* Email */}
          <div className="flex flex-grow flex-col gap-2">
            <h2 className="text-sm font-medium">Email</h2>
            <div className="relative z-0 mt-1 flex items-center justify-between gap-4 rounded-sm bg-white/10 px-3 text-xs/5">
              <input
                type="email"
                className="flex-grow bg-transparent py-2.5"
                placeholder="Enter your email."
                {...register('email')}
              />
              {/* TODO: 节流 & 验证码冷却时间 */}
              <span className="cursor-pointer font-semibold text-blue">Send Code</span>
            </div>
            {errors.email && <p className="text-xs text-red">{errors.email.message}</p>}
          </div>
          <div className="flex flex-grow flex-col gap-2">
            <h2 className="text-sm font-medium">Verify code</h2>
            <div className="mt-1 grid grid-cols-6 gap-3">
              {code.map((_, index) => (
                <input
                  key={index}
                  type="text"
                  className="h-[58px] rounded-sm bg-white/10 text-center text-2xl/6 font-semibold"
                  maxLength={1}
                  value={code[index]}
                  onChange={(e) => setCodeValue(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  {...codeHandles}
                />
              ))}
            </div>
          </div>
          <StyledButton variant="gradient" className="mt-8 py-3">
            Verify
          </StyledButton>
        </form>
      )}
    />
  );
}
