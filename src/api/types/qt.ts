export type TokenType = 'p12' | 'player' | 'editor';

export type ReceivedMessage<T> = {
  id: number;
  action: string;
  data: T;
};

export type EventTrackArgs<T> = {
  kind: string;
  kind_desc?: string;
  data?: T;
}
