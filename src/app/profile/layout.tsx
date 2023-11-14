import { PropsWithChildren } from 'react';

export default function Layout({ children }: PropsWithChildren) {
  return <div className="flex items-start justify-center pt-10">{children}</div>;
}
