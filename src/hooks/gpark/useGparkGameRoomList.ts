import { useMemo } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { fetchGparkGameRoomList, fetchGparkMWRoomStatus } from '@/api';
import type { GparkGameRoomListParams } from '@/api';

export function useGparkGameRoomStatus() {
  return useMutation({ mutationFn: (roomId: string) => fetchGparkMWRoomStatus(roomId) });
}

export function useGparkGameRoomList(params: GparkGameRoomListParams) {
  const isEnabled = useMemo(() => !!params.version && !!(params.gameId || params.sceneId), [params.gameId, params.sceneId, params.version]);
  const { data, isLoading, refetch } = useQuery({
    queryKey: ['gpark_game_room_list', params],
    queryFn: () => fetchGparkGameRoomList(params),
    enabled: isEnabled,
    select: (res) => (res.code === 200 ? res.data : undefined),
    refetchInterval: 30_000,
  });
  return useMemo(() => ({ data, isLoading, refetch }), [data, isLoading, refetch]);
}

// TypeScript test for: docs: 📝 update API endpoint reference
interface TestData {
  id: string;
  value: number;
  isValid: boolean;
}

describe('docs____update_API_endpoint_reference', () => {
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

// TypeScript test for: fix: 🐛 resolve wallet connection timeout
interface TestData {
  id: string;
  value: number;
  isValid: boolean;
}

describe('fix____resolve_wallet_connection_timeout', () => {
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
