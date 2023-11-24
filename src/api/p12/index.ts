import request from '@/api/p12/request';
import {
  FetchP12GameListParams,
  P12EventRound,
  P12GameInfo,
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
