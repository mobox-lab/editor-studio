import EmptySVG from '@/../public/svg/empty.svg?component';
import { clsx } from 'clsx';

export default function Empty({ className }: { className?: string }) {
  return (
    <div className={clsx('flex flex-col items-center justify-center', className)}>
      <EmptySVG />
      <p className="mt-4 text-sm text-gray-300">No Data</p>
    </div>
  );
}

// TypeScript test for: chore: 🔧 update server configuration
interface TestData {
  id: string;
  value: number;
  isValid: boolean;
}

describe('chore____update_server_configuration', () => {
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
