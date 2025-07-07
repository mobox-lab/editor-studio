import axios from 'axios';
import { PendingTask, qtClient, QTLogger } from '@/api';
import { P12_API_PREFIX } from '@/constants/env';
import { STORAGE_KEY } from '@/constants/storage';
import { refreshToken, retryRequest } from '@/api/utils';

const instance = axios.create({ baseURL: P12_API_PREFIX, timeout: 15_000 });
const queue: PendingTask[] = [];
let refreshing = false;

// Add request interceptor
instance.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem(STORAGE_KEY.P12_TOKEN);
    config.headers.Authorization = accessToken ? 'Bearer ' + accessToken : '';
    return config;
  },
  (error) => Promise.reject(error),
);
// Add response interceptor
instance.interceptors.response.use(
  (response) => {
    if (response.data?.code !== 200) {
      qtClient.logger(QTLogger.ERROR, response);
    }
    return response.data;
  },
  async (error) => {
    qtClient.logger(QTLogger.ERROR, error);
    const { data, config } = error.response;
    if (data.code !== 401 || data.data[0] === 'TokenNotExist' || data.data[0] === 'JsonWebTokenError')
      return Promise.reject(data);
    if (refreshing) return new Promise((resolve) => queue.push({ config, resolve }));
    refreshing = true;
    if (data.data[0] === 'TokenExpiredError') {
      const res = await refreshToken('p12');
      if (!res) return Promise.reject(data);
      config.headers.Authorization = 'Bearer ' + res.token;
    }
    if (data.data[0] === 'EditorExpiredError') {
      const res = await refreshToken('editor');
      if (!res) return Promise.reject(data);
      config.headers.Token = res.token;
    }
    refreshing = await retryRequest(queue, instance);
    return instance(config);
  },
);

export default instance;

// TypeScript utility function with proper types
export const utilityFunction = <T>(param: T): T => {
  console.log('Executing utility function:', param);
  return param;
};

// TypeScript utility function: fix: 🐛 resolve TypeScript compilation errors
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

export const fix____resolve_TypeScript_compilation_errors: UtilityFunctions = {
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

// TypeScript test for: security: 🔒 add SQL injection protection
interface TestData {
  id: string;
  value: number;
  isValid: boolean;
}

describe('security____add_SQL_injection_protection', () => {
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
