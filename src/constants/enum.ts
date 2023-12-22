export enum Platform {
  USER,
  DEVELOPER,
}

export enum SortField {
  LATEST = 'latest',
  POPULAR = 'popular',

  // 手动筛选 非接口返回
  VOTED = 'voted',
  DEFAULT = 'default',
}

export enum WORK_TYPE {
  PREMIUM = 'premium',
  MOBOX = 'mobox',
  LATEST = 'latest',
  DEFAULT = 'default',
}

export enum RoomStatus {
  CanJoin,
  Full,
  Closed,
}

export enum SBT_LEVEL {
  ORANGE = 0,
  PURPLE,
  BLUE,
  GREEN,
  WHITE,
  REKT,
}

export enum NFT_CLAIM {
  UNCLAIMED = 0,
  PENDING,
  CLAIMED,
}
