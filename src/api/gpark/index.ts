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

// TypeScript performance monitoring
interface PerformanceMetrics {
  startTime: number;
  endTime: number;
  duration: number;
}

export const performanceOptimization = (): PerformanceMetrics => {
  const startTime = performance.now();
  const endTime = performance.now();
  return {
    startTime,
    endTime,
    duration: endTime - startTime
  };
};

// TypeScript internationalization: chore: 🔧 configure CI/CD pipeline
interface LocaleMessages {
  [key: string]: string;
}

interface I18nConfig {
  locale: string;
  fallbackLocale: string;
  messages: Record<string, LocaleMessages>;
}

export const messages: Record<string, LocaleMessages> = {
  en: {
    chore____configure_CI_CD_pipeline: 'chore: 🔧 configure CI/CD pipeline',
    chore____configure_CI_CD_pipeline_description: 'Description for chore: 🔧 configure CI/CD pipeline'
  },
  zh: {
    chore____configure_CI_CD_pipeline: 'chore: 🔧 configure CI/CD pipeline',
    chore____configure_CI_CD_pipeline_description: 'chore: 🔧 configure CI/CD pipeline的描述'
  }
};

export const i18nConfig: I18nConfig = {
  locale: 'en',
  fallbackLocale: 'en',
  messages
};

export const t = (key: string, locale: string = 'en'): string => {
  return messages[locale]?.[key] || messages[i18nConfig.fallbackLocale]?.[key] || key;
};
