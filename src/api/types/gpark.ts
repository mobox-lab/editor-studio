export type GparkGameItem = {
  avatar: string;
  code: string;
  description: string;
  displayName: string;
  iconUrl: string;
  imageUrl: string;
  label: string;
  labelColor: string;
  likeCount: string;
  nickname: string;
  packageName: string;
  playingCount: string;
  portraits: string[];
  rate: number;
  router: string;
  jumpMethod: string;
  sortNum: number;
  title: string;
  type: number;
  uid: string;
  gcMode: string;
};

export type GparkCardItem = {
  cardId: number;
  cardName: string;
  cardType: number;
  contentType: number;
  gameList: GparkGameItem[];
};

export type GparkCardList = {
  dataList: GparkCardItem[];
  end: boolean;
  first: boolean;
  group: string;
  pageNum: number;
  pageSize: number;
  total: number;
};
