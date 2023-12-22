export type GameListBodyType = {
  pageSize: number;
  offset: number;
};

export type GameListType = {
  totalCount: number;
  dataList: DataListType[];
};

export type DataListType = {
  cover: string;
  icon: string;
  name: string;
  state: number;
  version: string;
  channel: number;
  sourceGameId: string;
  gameCode: string;
  latestVersion: string;
};
