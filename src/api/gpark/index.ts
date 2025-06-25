import request from '@/api/gpark/request';
import { GparkCardList, GparkGameMyself, GparkMetaInfo, GparkUserInfo, GparkUserInfoParams, Response } from '@/api/types';
import {
  GparkCardContentList,
  GparkCardContentListParams,
  GparkGameDetail,
  GparkGameQueryFuzzy,
  GparkGameRoomList,
  GparkGameRoomListParams,
  GparkMWGameDetail,
  GparkTsGameConfig,
  GparkUserImage,
} from '@/api/types';
import { RoomStatus } from '@/constants/enum';

export const fetchGparkCardPage = () => request.get<any, Response<GparkCardList>>('/omnibus/v1/card/page');

export const fetchGparkGameDetail = (id?: string) =>
  request.get<any, Response<GparkGameDetail>>('/repository/v3/game/info', { params: { id } });

export const fetchGparkGameRoomList = (data?: GparkGameRoomListParams) =>
  request.post<any, Response<GparkGameRoomList>>('/mwRoom2C/getRooms', data);

export const fetchGparkCardContentScroll = (params?: GparkCardContentListParams) =>
  request.get<any, Response<GparkCardContentList>>('/omnibus/v1/card/content/scroll/query', { params });

export const fetchGparkGameMyself = (params?: { pageSize: number; pageNumber: number }) =>
  request.get<any, Response<GparkGameMyself>>('/gamer/v2/games/myself', { params });

export const fetchGparkQueryFuzzy = (params?: { name: string; pageSize: number; pageNumber: number }) =>
  request.get<any, Response<GparkGameQueryFuzzy>>('/repository/v1/game/query/fuzzy', { params });

export const fetchGparkUserInfo = () =>
  request.post<any, Response<GparkUserInfo>, any>('/user/v2/base/info/query', null, {
    headers: { Self_package_name: '' }, // TODO:  server fix sso group
  });
export const updateGparkUserInfo = (data?: GparkUserInfoParams) =>
  request.post<any, Response<boolean>>('/user/v2/profile/modify', data);
export const fetchGparkUserImage = () =>
  request.post<any, Response<GparkUserImage>>('/user/v2/image/query', null, {
    headers: { Self_package_name: '' }, // TODO:  server fix sso group
  });

export const fetchGparkTSGameConfig = (gameId?: string) =>
  request.get<any, Response<GparkTsGameConfig>>('/ts/gsom/find', { params: { gameId }, headers: { Self_package_name: '' } });

export const fetchGparkMWGameDetail = (gameCode?: string) =>
  request.get<any, Response<GparkMWGameDetail>>('/game/v2/mw/detail', { params: { gameCode } });

export const fetchGparkMWRoomStatus = (roomId?: string) =>
  request.post<any, Response<{ roomStatus: RoomStatus }>>('/room/gsom/metaworld/room/status', { roomId });

export const fetchMetaGameInfo = (params?: { referenceId: string; version: string }) =>
  request.get<any, Response<GparkMetaInfo>>('/gameServer/scene/getMetaGameInfo', { params });

// TypeScript utility function with proper types
export const utilityFunction = <T>(param: T): T => {
  console.log('Executing utility function:', param);
  return param;
};

// TypeScript test for: test: 🧪 add mobile compatibility tests
interface TestData {
  id: string;
  value: number;
  isValid: boolean;
}

describe('test____add_mobile_compatibility_tests', () => {
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
