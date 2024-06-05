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
  offset: number;
  cover: string;
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

export type GparkCardScrollList = {
  dataList: GparkGameItem[];
  end: boolean;
  total: number;
};

export type GparkGameImage = {
  url: string;
  width: number;
  height: number;
};

export type GparkGameResource = {
  url: string;
  resourceType: number;
  size: number;
  fingerprint: string;
  packageName: string;
  upgradeStrategy: number;
  upgradeInstallType: number;
  editorVersion: string;
  editorVersionEncode: number;
};

export type GparkGameAuthor = {
  id: string;
  name: string;
  avatar: string;
  introduction: string;
};

export type GparkGameSNS = {
  playerCount: number;
  likeCount: number;
};

export type GparkGameDetail = {
  id: string;
  name: string;
  icon: string;
  description: string;
  type: number;
  images: GparkGameImage[];
  startupExtension: string;
  gameTags: number;
  resource: GparkGameResource;
  author: GparkGameAuthor;
  sns: GparkGameSNS;
  canPlay: number;
};

export type GparkGameRoomListParams = {
  gameId?: string;
  sceneId?: string;
  maxId: string;
  pageSize: number;
  sortType: number;
  version?: string;
};

export type GparkGameRoomMember = {
  avatar: string;
  gender: number;
  nickname: string;
  openId: number;
};

export type GparkGameRoomItem = {
  activeTime: number;
  createTime: number;
  dsId: string;
  gameId: string;
  id: number;
  limitNumber: number;
  mgsRoomId: string;
  number: number;
  podId: string;
  roomId: string;
  status: number;
  version: string;
  members: GparkGameRoomMember[];
};

export type GparkGameRoomList = {
  maxId: string;
  dataList: GparkGameRoomItem[];
};

export type GparkCardContentListParams = {
  cardId: number | string | null;
  offset: number | null;
  pageSize: number;
};

export type GparkCardContentList = {
  dataList: GparkGameItem[];
  end: boolean;
  total: number;
};

export type GparkGameMyselfItem = {
  appDownCount: number;
  briefIntro: string;
  circleId: string;
  deleteTime: number;
  duration: number;
  fileSize: number;
  gameId: string;
  iconUrl: string;
  lastPlayTime: number;
  likeCount: number;
  gameScore: number;
  name: string;
  packageName: string;
  imageUrl: string;
  resType: string;
  serverTime: number;
  cover: string;
};

export type GparkGameMyself = {
  dataList: GparkGameMyselfItem[];
  end: boolean;
  total: number;
  first: boolean;
  pageNum: number;
  pageSize: number;
};

export type GparkGameQueryItem = {
  id: number;
  code: string;
  icon: string;
  name: string;
  packageName: string;
  editorVersion: string;
  editorVersionEncode: number;
  status: number;
  cover: string;
  type: number;
  platform: number;
  slogan: string;
  author: GparkGameAuthor;
};

export type GparkGameQueryFuzzy = {
  count: number;
  records: [];
};

export type GparkUserInfo = {
  nickname?: string; //  
  portrait?: string; // 
  uid?: string; // 
  userNumber?: string; //  
  signature?: string; // 
};
export type GparkUserInfoParams = {
  nickname?: string; //  
  signature?: string; // 
};
export type GparkUserImage = {
  wholeBodyImage?: string;
};

export type GparkStartupExtension = {
  IsHorizontal: boolean;
  PathId: string;
  attribute: number;
  gameId: string;
  useAvatar: number;
  version: string;
};

export type GparkMWGameDetail = {
  canPlay: number;
  displayName: string;
  editorVersion: string;
  editorVersionEncode: number;
  expand: string;
  gameCode: string;
  gameTags: number[];
  gameType: number;
  packageName: string;
};

export type GparkTsGameConfig = {
  appKey: string;
  avatar: string;
  gamePackageName: string;
  gender: number;
  nickname: string;
  openCode: string;
  openCodeExpire: number;
  openId: string;
  uuid: string;
};
