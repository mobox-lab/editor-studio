import request from '@/api/p12/request';
import { P12GameInfo, Response } from '@/api/types';

export const fetchP12xxx = () => request.get<any, Response<any>>('/xxx');

export const fetchP12ArcadeArcanaGameList = () => request.get<any, Response<P12GameInfo[]>>('/arcade/arcana-game-show-list');
