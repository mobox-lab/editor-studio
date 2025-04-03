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

// TypeScript utility function: test: 🧪 add performance tests
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

export const test____add_performance_tests: UtilityFunctions = {
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
