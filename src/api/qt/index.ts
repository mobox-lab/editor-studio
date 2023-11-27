import QTApiClient from '@/lib/web-bridge';
import { isClientSide } from '@/constants/env';

const qtApiClient = isClientSide ? new QTApiClient('webContext', 'requestFromClient', 'responseFromServer') : undefined;

qtApiClient?.addResponseListener();

function _addMsgListener(callback: (_: string) => void) {
  qtApiClient?.on('receiveMsgFromServer', callback);
}

function _removeMsgListener(callback: (_: string) => void) {
  qtApiClient?.off('receiveMsgFromServer', callback);
}

export const QTClient = {
  sendMsg: (msg: string) => qtApiClient?.send({ action: 'send-msg', data: msg }),
  sendSyncMsg: (msg: string) => qtApiClient?.send({ action: 'send-msg-sync', data: msg }),
  msgListener: { add: _addMsgListener, remove: _removeMsgListener },
};
