import request from '@/api/p12/request';
import {
  CheckNameParams,
  CheckNameResult,
  FetchP12GameListParams,
  P12ChainNamesResult,
  P12EventRound,
  P12GameInfo,
  P12ProfileParams,
  P12ProfileResult,
  P12SelectionGameInfo,
  Response,
} from '@/api/types';

export const fetchP12ArcadeArcanaGameList = () => request.get<any, Response<P12GameInfo[]>>('/arcade/arcana-game-show-list');
export const fetchP12GameList = ({ sortField, page = 1, size = 25 }: FetchP12GameListParams) =>
  request.get<any, Response<P12GameInfo[]>>('/arcana/game/list', { params: { sortField, page, size } });
export const fetchP12ArcadeSelectionGameList = () => request.get<any, Response<P12SelectionGameInfo[]>>('/arcade/selection');
export const fetchP12GameRecommendList = () => request.get<any, Response<P12GameInfo[]>>('/arcana/game/recommend');

export const fetchP12EventRound = () => request.get<any, Response<P12EventRound>>('/arcana/event-round/round');
export const fetchP12EventRoundList = ({
  page = 1,
  size = 25,
  eventId,
}: {
  page?: number;
  size?: number;
  eventId?: number | null;
}) => request.get<any, Response<P12GameInfo[]>>('/arcana/event-round/list', { params: { page, size, eventId } });

export const fetchP12ProfileData = () => request.get<any, Response<P12ProfileResult>>('/app/profile');
export const editProfileData = (data: P12ProfileParams) => request.post<any, Response<boolean>>('/app/profile', data);

export const updateP12ChainNames = () => request.post<any, Response<P12ChainNamesResult>>('/app/profile/chain-names');

export const checkNameAvailable = (data: CheckNameParams) =>
  request.post<any, Response<CheckNameResult>>('/app/profile/check/name', data);
