import request from '@/api/p12/request';
import { Response } from '@/api/types';

export const fetchP12xxx = () => request.get<any, Response<any>>('/xxx');
