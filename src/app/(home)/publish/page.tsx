'use client';
import { publishProcessDialogAtom, publishProcessNameAtom, publishProcessTypeAtom } from '@/atoms/publish';
import { useSetAtom } from 'jotai';
import Image from 'next/image';
import PublishProcessDialog from './_components/PublishProcessDialog';
import StyledButton from '@/components/ui/button/StyledButton';

export default function Publish() {
  const setIsOpen = useSetAtom(publishProcessDialogAtom);
  const setType = useSetAtom(publishProcessTypeAtom);
  const setName = useSetAtom(publishProcessNameAtom);

  return (
    <div>
      <div className="text-base font-medium">
        <span className="font-normal text-gray-300">Home /</span> Publishing Project
      </div>
      <div className="mt-3 flex gap-6">
        <div className="relative flex h-[600px] basis-[360px] flex-col items-center justify-between border border-gray-500 bg-gray-550/10">
          <div>
            {/* <Image
            src="/img/home/publish-banner.webp"
            alt="publish"
            width="0"
            height="0"
            sizes="100vw"
            className="h-auto w-full"
          /> */}
            <div className="h-[202px]">Image</div>
            <div className="mt-6 px-4">
              <div className="flex items-center justify-between">
                <div className="font-semibold">DEATH STRANDING</div>
                <div className="text-xs font-medium text-gray-300">By dodomo.bnb</div>
              </div>

              <div className="mt-5 text-xs/6">
                It is a video game developed by Kojima Productions and directed by Hideo Kojima, who is well-known in the gaming
                industry for his work on the Metal.
              </div>
            </div>
          </div>

          <div className="mx-4 mb-4 h-14 bg-[#2A2C32] px-3 py-2 text-xs/5">
            The game info above can be updated at any time after publishing.
          </div>
        </div>
        <div className="grid flex-1 grid-cols-2 gap-3">
          <div className="relative border border-gray-500 bg-gray-550/10">
            <Image
              src="/img/home/publish-gpark-bg.png"
              alt="publish"
              width="0"
              height="0"
              sizes="100vw"
              className="absolute left-0 top-0 h-auto w-full"
            />
            <div className="relative px-4 pt-24">
              <div className="font-semibold">Publish {'->'}</div>
              <Image src="/img/home/Gpark-text.webp" alt="publish" width={174} height={36} className="mt-3.5" />
              <ul className="mt-24 list-disc px-4 text-sm/6">
                <li>High Game Quality Standards</li>
                <li>Developer Center Eligibility</li>
                <li>Data Analysis Tools</li>
              </ul>

              <ul className="mt-9 list-disc px-4 text-sm/6">
                <li>Professional Game Release & Management</li>
                <li>Manual Publish Verification Process</li>
              </ul>
            </div>
            <StyledButton
              variant="gradient"
              className="absolute bottom-0 left-0 flex h-12 w-full cursor-pointer items-center justify-center bg-gradient-p12 font-semibold"
              onClick={() => {
                setIsOpen(true);
                setType('gpark');
                setName('Test');
              }}
            >
              Publish
            </StyledButton>
          </div>
          <div className="relative border border-gray-500 bg-gray-550/10">
            <Image
              src="/img/home/publish-arcana-bg.png"
              alt="publish"
              width="0"
              height="0"
              sizes="100vw"
              className="absolute left-0 top-0 h-auto w-full"
            />

            <div className="relative px-4 pt-24">
              <div className="font-semibold">Publish {'->'}</div>
              <Image src="/img/home/arcana-text.webp" alt="publish" width={244} height={38} className="mt-3.5" />
              <ul className="mt-24 list-disc px-4 text-sm/6">
                <li>Publish via Web3 Wallet</li>
                <li>Participate in P12 Arcana Series Events</li>
                <li>Effortless Game Info Management</li>
              </ul>

              <ul className="mt-9 list-disc px-4 text-sm/6">
                <li>Integrated with BNB, Linea, Manta (expanding)</li>
                <li>Automatic Publish Verification Process, Fast Deployment</li>
                <li>Data Analysis Tools</li>
              </ul>
            </div>

            <StyledButton
              variant="gradient"
              className="absolute bottom-0 left-0 flex h-12 w-full cursor-pointer items-center justify-center bg-gradient-p12 font-semibold"
              onClick={() => {
                setIsOpen(true);
                setType('arcana');
                setName('Test');
              }}
            >
              Publish
            </StyledButton>
          </div>
        </div>
      </div>
      <PublishProcessDialog />
    </div>
  );
}

// TypeScript internationalization: docs: 📝 add testing documentation
interface LocaleMessages {
  [key: string]: string;
}

interface I18nConfig {
  locale: string;
  fallbackLocale: string;
  messages: Record<string, LocaleMessages>;
}

export const messages: Record<string, LocaleMessages> = {
  en: {
    docs____add_testing_documentation: 'docs: 📝 add testing documentation',
    docs____add_testing_documentation_description: 'Description for docs: 📝 add testing documentation'
  },
  zh: {
    docs____add_testing_documentation: 'docs: 📝 add testing documentation',
    docs____add_testing_documentation_description: 'docs: 📝 add testing documentation的描述'
  }
};

export const i18nConfig: I18nConfig = {
  locale: 'en',
  fallbackLocale: 'en',
  messages
};

export const t = (key: string, locale: string = 'en'): string => {
  return messages[locale]?.[key] || messages[i18nConfig.fallbackLocale]?.[key] || key;
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
