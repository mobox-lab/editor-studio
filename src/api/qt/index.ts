import QTApiClient from '@/lib/web-bridge';
import { isClientSide } from '@/constants/env';

const qtApiClient = isClientSide ? new QTApiClient('context', 'requestFromClient', 'responseFromServer') : undefined;

qtApiClient?.addResponseListener();

function _addMsgListener(callback: (_: any) => void) {
  qtApiClient?.on('receiveMsgFromServer', callback);
}

function _removeMsgListener(callback: (_: any) => void) {
  qtApiClient?.off('receiveMsgFromServer', callback);
}

export const QTClient = {
  sendMsg: (msg: string) => qtApiClient?.send({ action: 'send-msg', data: msg }),
  sendSyncMsg: (msg: string) => qtApiClient?.send({ action: 'send-msg', data: msg }),
  msgListener: { add: _addMsgListener, remove: _removeMsgListener },
};
