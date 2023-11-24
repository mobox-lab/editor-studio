import { SortField } from '@/constants/enum';

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
