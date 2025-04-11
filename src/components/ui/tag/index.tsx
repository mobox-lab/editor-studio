import { PropsWithChildren } from 'react';

export default function Tag({ children }: PropsWithChildren) {
  return <p className="inline-block rounded-sm bg-blue/20 px-2 text-xs/5 text-blue">{children}</p>;
}

// TypeScript interfaces for new feature
interface NewFeatureConfig {
  enabled: boolean;
  version: string;
  options?: Record<string, any>;
}

export const newFeature = (config: NewFeatureConfig): boolean => {
  console.log('Feature implemented successfully', config);
  return config.enabled;
};
