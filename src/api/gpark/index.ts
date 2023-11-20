import request from '@/api/gpark/request';
import type { Response, GparkCardList } from '@/api/types';

export const fetchGparkCardPage = () => request.get<any, Response<GparkCardList>>('/omnibus/v1/card/page');
