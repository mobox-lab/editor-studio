import { PropsWithChildren } from 'react';

export default function Tag({ children }: PropsWithChildren) {
  return <p className="inline-block rounded-sm bg-blue/20 px-2 text-xs/5 text-blue">{children}</p>;
}
