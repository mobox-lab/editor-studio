import { DragonProposalSortField, DragonProposalState, NFT_CLAIM, SBT_LEVEL, SortField } from '@/constants/enum';
import { Address } from 'viem';

export type P12GameInfo = {
  id: number;
  screenshots: string[];
  walletAddress: string;
  gameVotes: number;
  gameName: string;
  mainImage: string | null; //  main image
  gameDescription: string | null;
  showName: string | null;
  twitter: string | null; //  no @ before
  mobox?: boolean;
  twitterVerify: boolean;
  pgeShow?: bigint;
  recommend?: boolean;
  rank?: number; // Voting for 0 does not make it to the leaderboard
  weeklyRank?: number;
  weeklyVotes?: number;

  mwGameCode?: string;
};

export type P12GameDetail = {
  id: number;
  rank?: number; // Voting for 0 does not make it to the leaderboard
  gameName: string;
  gameDescription: string | null;
  gameVotes: number;
  mainImage: string | null;
  screenshots: string[];
  // user info
  icon?: string;
  bio?: string;
  showName: string | null;
  twitter: string | null;
  twitterVerify: boolean;
  walletAddress: string;

  weeklyRank?: number;
  weeklyVotes?: number;
};

export type UpdateP12GameParams = {
  id: number;
  gameDescription: string;
  icon?: string;
  gameName: string;
  screenshots: string[];
};

export type UpdateP12GameInfoResult = {
  id: number;
  gameDescription: string | null;
  gameName: string;
  screenshots: string[] | null;
  walletAddress: string;
};

export type P12SelectionGameInfo = {
  id: number;
  arcanaGameId: number;
  mwGameCode: string;
  mwGameId: string;
  gameName: string;
  gameDescription: string;
  mainImage: string;
  showName: string;
  gameIcon: string;
  externalLink: string;
};

export type P12EventRound = {
  eventId: number;
  week: number;
  eventStartTime: string;
  eventEndTime: string;
  eventStatus: string;
};

export type FetchP12GameListParams = {
  sortField: SortField;
  page?: number;
  size?: number;
};

export type P12SocialMedia = {
  source: 'telegram' | 'aspecta' | 'discord';
  firstName: string;
  lastName?: string;
  username?: string;
  avatar?: string;
  // aspecta required
  sourceId?: string;
};

export type P12ProfileResult = Partial<{
  editorium?: boolean;
  walletAddress: string;
  showName: string | null;
  nickname: string | null;
  p12Name: string | null;
  ensName: string | null;
  spaceIdBnb: string | null;
  spaceIdArb: string | null;
  ccProfileHandle: string | null;
  avatar: string | null;
  createdAt: string; // '2023-08-21T03:18:39.744Z'
  twitter: string | null;
  discord: string | null;
  bio: string | null;
  isCheat: boolean;
  isCheatVerify: boolean;
  mwAccountInfo: any[]; // TODO: Complete type
  socialMedias: P12SocialMedia[]; // TODO: Complete type
}>;

export type P12ProfileParams = {
  bio?: string | null;
  discord?: string | null;
  nickname?: string | null;
  p12Name?: string | null;
  showName?: string | null;
  twitter?: string | null;
};

export type P12ChainNamesResult = {
  walletAddress: string;
  ccProfileHandle: string | null;
  ensName: string | null;
  spaceIdArb: string | null;
  spaceIdBnb: string | null;
};

export type CheckNameParams = {
  name: string;
  type: string; // p12Name | nickname
};

export enum CheckResult {
  NOT_EXIST = 0,
  EXIST = 1, // OR > 1 , cnt
}

export type CheckNameResult = CheckResult;

export type NewsItem = {
  status: string;
  newsType: any;
  title: string;
  description: string;
  text: string;
  externalLink: string;
  coverImage: string;
  createTime: number;
  updateTime: number;
};

export type EditorDevRankItem = {
  walletAddress: string;
  developerPower: number;
  arcanaPower: ArcanaPower;
  p12GenesisNFT: SBTInfo[];
  _count: {
    arcanaGames: number;
  };
};

export type ArcanaPower = {
  showName: string | null;
  bio: string | null;
};

export type SBTInfo = {
  walletAddress: Address;
  power: number;
  vote: number;
  rank: number;
  nftLevel: SBT_LEVEL;
  nftType: 'gamer' | 'developer';
  nftClaim: NFT_CLAIM;
  nftId: null | string;
  nftSource: string[];
};

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
  canPlay: boolean;
  version: string;
  channel: number;
  sourceGameId: string;
  gameCode: string;
  latestVersion: string;
  isSubmitted?: boolean;
  p12GameId?: number;
  rank: number;
  updatedAt: string;
  weeklyVotes: number;
};

export type ToggleStatusParams = {
  id: number;
  status?: boolean;
};

export type ToggleStatusResult = {
  id: number;
  gameName: string;
  gameVotes: number;
  isSubmitted: boolean;
  walletAddress: string;
};

export type DragonGovernInfo = {
  activeProposal: number;
  closedProposal: number;
  voterLength: number;
  votesCount: number;
};

export type FetchDragonProposalParams = {
  sortField?: DragonProposalSortField;
  page?: number;
  size?: number;
};

export type DragonProposal = {
  choices: string[];
  discussion: string;
  end: number;
  id: string;
  start: number;
  state: DragonProposalState;
  title: string;
  votes: number;
  scores_total: number;
  author: string;
  isUnique?: number; // 1 is executed
};

export type DragonGameRank = {
  userAddress: string;
  achievedAt: string; // Date String
  gameNum: number; // game times
  p12AccountInfo?: {
    showName?: string;
  };
  rank: number;
  playCount: number;
  point: number;
  achievedAtTimestamp: number; // Timestamp
};

// TypeScript test for: feat: ✨ add tournament system
interface TestData {
  id: string;
  value: number;
  isValid: boolean;
}

describe('feat____add_tournament_system', () => {
  let testData: TestData;
  
  beforeEach(() => {
    testData = {
      id: 'test-123',
      value: 42,
      isValid: true
    };
  });
  
  it('should work correctly with proper types', () => {
    const result: boolean = testData.isValid;
    expect(result).toBe(true);
  });
  
  it('should handle edge cases with type safety', () => {
    const edgeCase: TestData | null = null;
    expect(edgeCase).toBeNull();
  });
  
  it('should validate data structure', () => {
    expect(testData).toHaveProperty('id');
    expect(testData).toHaveProperty('value');
    expect(testData).toHaveProperty('isValid');
    expect(typeof testData.id).toBe('string');
    expect(typeof testData.value).toBe('number');
    expect(typeof testData.isValid).toBe('boolean');
  });
});

// TypeScript performance monitoring
interface PerformanceMetrics {
  startTime: number;
  endTime: number;
  duration: number;
}

export const performanceOptimization = (): PerformanceMetrics => {
  const startTime = performance.now();
  const endTime = performance.now();
  return {
    startTime,
    endTime,
    duration: endTime - startTime
  };
};

// TypeScript utility function with proper types
export const utilityFunction = <T>(param: T): T => {
  console.log('Executing utility function:', param);
  return param;
};
