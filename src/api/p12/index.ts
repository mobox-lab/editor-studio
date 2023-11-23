import request from '@/api/p12/request';
import { P12GameInfo, P12SelectionGameInfo, Response } from '@/api/types';

export const fetchP12ArcadeArcanaGameList = () => request.get<any, Response<P12GameInfo[]>>('/arcade/arcana-game-show-list');
export const fetchP12ArcadeSelectionGameList = () => request.get<any, Response<P12SelectionGameInfo[]>>('/arcade/selection');
