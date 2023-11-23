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
