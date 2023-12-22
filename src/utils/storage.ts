import { STORAGE_KEY } from '@/constants/storage';

type QtConfig = {
  engineVersion: string;
  pgeTag: number;
};

export function getQtStorageConfig() {
  const str = window.localStorage.getItem(STORAGE_KEY.QT_CONFIG);
  const data: QtConfig = JSON.parse(str ?? '{}');
  return data;
}
