import request from '@/api/gpark/request';
import type { GparkCardScrollList, GparkGameDetail } from '@/api/types';
import type { Response, GparkCardList, GparkGameMyself } from '@/api/types';
import {
  GparkCardContentList,
  GparkCardContentListParams,
  GparkGameQueryFuzzy,
  GparkGameRoomList,
  GparkGameRoomListParams,
} from '@/api/types';

export const fetchGparkCardPage = () => request.get<any, Response<GparkCardList>>('/omnibus/v1/card/page');
export const fetchGparkCardScrollQuery = () =>
  request.get<any, Response<GparkCardScrollList>>('/omnibus/v1/card/content/scroll/query');

export const fetchGparkGameDetail = (id?: string) =>
  request.get<any, Response<GparkGameDetail>>('/repository/v3/game/info', { params: { id } });

export const fetchGparkGameRoomList = (data?: GparkGameRoomListParams) =>
  request.post<any, Response<GparkGameRoomList>>('/room/gsom/metaworld/room/list', data);

export const fetchGparkCardContentScroll = (params?: GparkCardContentListParams) =>
  request.get<any, Response<GparkCardContentList>>('/omnibus/v1/card/content/scroll/query', { params });

export const fetchGparkGameMyself = (params?: { pageSize: number; pageNumber: number }) =>
  request.get<any, Response<GparkGameMyself>>('/gamer/v2/games/myself', { params });

export const fetchGparkQueryFuzzy = (params?: { name: string; pageSize: number; pageNumber: number }) =>
  request.get<any, Response<GparkGameQueryFuzzy>>('/repository/v1/game/query/fuzzy', { params });
