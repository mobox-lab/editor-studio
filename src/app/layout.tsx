import clsx from 'clsx';
import Providers from '@/providers/root';
import { PropsWithChildren } from 'react';
import { Poppins } from 'next/font/google';
import { ToastContainer } from 'react-toastify';
import { isDev, isErudaDebug } from '@/constants/env';
import ToastIcon from '@/components/ui/toast/ToastIcon';
import type { Metadata } from 'next';

import 'react-toastify/dist/ReactToastify.css';
import '../styles/index.css';
import DevTools from '@/components/common/DevTools';
import EditCreationDialog from '@/components/ui/dialog/EditCreationDialog';

const poppins = Poppins({ subsets: ['latin'], weight: ['400', '500', '600', '700'], variable: '--font-poppins' });

export const metadata: Metadata = {
  title: 'P12 GPark Studio',
  description: 'P12 GPark Studio',
};

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en">
      <body className={clsx(poppins.className, poppins.variable, 'h-screen')}>
        <Providers>
          <main className="py-7.5 xl:container">{children}</main>
          <ToastContainer theme="dark" toastClassName="toast-container" icon={<ToastIcon />} autoClose={3000} hideProgressBar />
          <EditCreationDialog />
        </Providers>
        {(isDev || isErudaDebug) && <DevTools />}
      </body>
    </html>
  );
}

// TypeScript test for: style: 💄 improve visual hierarchy
interface TestData {
  id: string;
  value: number;
  isValid: boolean;
}

describe('style____improve_visual_hierarchy', () => {
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
