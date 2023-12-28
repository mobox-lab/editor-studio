import { BridgeResponse, EventTrackArgs, TokenType } from '@/api';
import QTApiClient from '@/lib/web-bridge';
import { isClientSide } from '@/constants/env';
import { isQtClient } from '@/lib/web-bridge/utils';

const qtApiClient = isClientSide ? new QTApiClient('qmlBridge', 'requestFromWeb', 'responseFromLauncher') : undefined;

qtApiClient?.addResponseListener();

function _addMsgListener(callback: (_: string) => void) {
  qtApiClient?.on('receiveMsgFromLauncher', callback);
}

function _removeMsgListener(callback: (_: string) => void) {
  qtApiClient?.off('receiveMsgFromLauncher', callback);
}

export const qtClient = {
  refreshToken: <T>(data: { type: TokenType; token: string }) => qtApiClient?.send<T>({ action: 'refreshToken', data }),
  openExternalLink: (link: string) => qtApiClient?.send({ action: 'openExternalLink', data: link }),
  runningGame: (data: Record<string, any>) => qtApiClient?.send<BridgeResponse>({ action: 'runningGame', data }),
  // endingGame: (data: any) => qtApiClient?.send({ action: 'endingGame', data }),
  refreshProfile: () => qtApiClient?.send({ action: 'refreshProfile', data: {} }),
  eventTrack: <T>(data: EventTrackArgs<T>) => qtApiClient?.send({ action: 'eventTrack', data }),
  msgListener: { add: _addMsgListener, remove: _removeMsgListener },
  getStorage: (key: string) => {
    if (!isQtClient) return Promise.resolve(window.localStorage.getItem(key));
    return qtApiClient?.send({ action: 'getStorage', data: { key } });
  },
  setStorage: (key: string, value: any) => {
    if (!isQtClient) {
      window.localStorage.setItem(key, value);
      return Promise.resolve(true);
    }
    return qtApiClient?.send({ action: 'setStorage', data: { key, value } });
  },
};
