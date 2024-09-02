import request from '@/api/p12/request';
import {
  CheckNameParams,
  CheckNameResult,
  DragonGameRank,
  DragonGovernInfo,
  DragonProposal,
  EditorDevRankItem,
  FetchDragonProposalParams,
  FetchP12GameListParams,
  GameListBodyType,
  GameListType,
  NewsItem,
  P12ChainNamesResult,
  P12EventRound,
  P12GameDetail,
  P12GameInfo,
  P12ProfileParams,
  P12ProfileResult,
  P12SelectionGameInfo,
  PublishGame,
  Response,
  SBTInfo,
  ToggleStatusParams,
  ToggleStatusResult,
  UpdateP12GameInfoResult,
  UpdateP12GameParams,
} from '@/api/types';
import { DragonProposalSortField } from '@/constants/enum';
import { MODRAGON_API_PREFIX } from '@/constants/env';
import { Address } from 'viem';

export const fetchP12GparkArcanaGameList = () => request.get<any, Response<P12GameInfo[]>>('/pge/arcana-game-show-list');
export const fetchP12GameList = ({ sortField, page = 1, size = 25 }: FetchP12GameListParams) =>
  request.get<any, Response<P12GameInfo[]>>('/arcana/game/list', { params: { sortField, page, size } });
export const fetchP12GparkSelectionGameList = () => request.get<any, Response<P12SelectionGameInfo[]>>('/pge/selection');
export const fetchP12GameRecommendList = () => request.get<any, Response<P12GameInfo[]>>('/arcana/game/recommend');

export const fetchP12GameDetail = (id: number) => request.get<any, Response<P12GameDetail>>('/arcana/game/' + id);
export const updateP12GameInfo = ({ id, ...data }: UpdateP12GameParams) =>
  request.post<any, Response<UpdateP12GameInfoResult>>('/arcana/game/' + id, data);

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

export const uploadP12Image = (file: any) => {
  const formData = new FormData();
  formData.append('file', file);
  return request.post<any, Response<string>>('/app/upload/image', formData);
};

export const fetchP12SBT = (nftType: 'gamer' | 'developer') =>
  request.get<any, Response<SBTInfo>>('/pge/power-sbt', { params: { nftType } });

export const fetchP12News = () => request.get<any, Response<NewsItem[]>>('/pge/editor-news');

export const fetchP12DevRank = () => request.get<any, Response<EditorDevRankItem[]>>('/pge/dev-power-rank');

export const fetchEditorGameList = (data: GameListBodyType, token?: string | null) =>
  request.post<any, Response<GameListType>>('/pge/my-games', data, {
    headers: { Token: token },
  });

export const toggleGameStatus = ({ id, ...data }: ToggleStatusParams) =>
  request.post<any, Response<ToggleStatusResult>>('/arcana/game/status/' + id, data);

export const fetchIsPublication = (address?: Address) =>
  request.get<any, Response<boolean>>('/arcana/power-vote/publication?address=' + address);

export const fetchDragonGovernInfo = (address?: Address) =>
  request.get<any, Response<DragonGovernInfo>>('/modragonGovern/basicInfo', {
    baseURL: MODRAGON_API_PREFIX,
  });
export const fetchDragonProposals = ({
  sortField = DragonProposalSortField.ALL,
  page = 1,
  size = 16,
}: FetchDragonProposalParams) =>
  request.get<any, Response<DragonProposal[]>>('/modragonGovern/proposals', {
    baseURL: MODRAGON_API_PREFIX,
    params: { sortField, first: size, skip: size * (page - 1) },
  });

export const fetchNumberOfDragonProposals = (address?: Address) =>
  request.get<any, Response<number>>('/modragonGovern/numberOfProposals', {
    baseURL: MODRAGON_API_PREFIX,
    params: { userAddress: address },
  });

export const fetchDragonGameRank = ({ page = 1, size = 25 }: FetchDragonProposalParams) =>
  request.get<any, Response<DragonGameRank[]>>('/modragon/mo-rank/list', {
    baseURL: MODRAGON_API_PREFIX,
    params: { page, size },
  });

export const fetchDvBetaWhiteList = () => request.get<any, Response<string[]>>('/pge/dragon-verse/beta-white-list');

export const fetchPublishGame = (data: PublishGame) => request.post('/arcana/game/push/game', data);

