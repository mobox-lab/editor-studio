import { STORAGE_KEY } from '@/constants/storage';
import { PublishedObject } from '@/lib/web-bridge/qwebchannel';

type Callback = (data?: any) => void;

type Action = {
  action: string;
  data: string;
  id?: number;
  promise?: {
    resolve: (payload?: any) => void;
    reject: (payload?: any) => void;
  };
};

export function createSender(QtServer: PublishedObject) {
  return ({ action, data, promise }: Action) => {
    return new Promise((resolve, reject) => {
      if (promise && promise.reject && promise.resolve) {
        resolve = promise.resolve;
        reject = promise.reject;
      }

      console.log('Action: ', { action, data, promise });
      if (!Object.keys(QtServer).includes(action)) {
        return reject(new Error('[SENDER]: Unknown action name !'));
      }
      if (typeof QtServer[action] !== 'function') {
        return reject(
          new Error(
            typeof QtServer[action].connect === 'function'
              ? `[SENDER]: ${action} is a Qt signal, not a method`
              : `[SENDER]: Missing function named ${action} in QObject !`,
          ),
        );
      }
      QtServer[action](data, resolve);
    });
  };
}

export function addDispatcher(QtServer: PublishedObject) {
  return (event: string, callback: Callback) => {
    if (!Object.keys(QtServer).includes(event)) {
      return new Error('[LISTENER]: Unknown event name!');
    }

    if (!Object.keys(QtServer[event]).includes('connect')) {
      return new Error(`[LISTENER]: ${event} is not a Qt signa!`);
    }

    if (typeof QtServer[event].connect !== 'function') {
      return new Error(`[LISTENER]: No Connect Function!`);
    }
    QtServer[event].connect(callback);
  };
}

export function removeDispatcher(QtServer: PublishedObject) {
  return (event: string, callback: Callback) => {
    if (!Object.keys(QtServer).includes(event)) {
      return new Error('[LISTENER]: Unknown event name!');
    }

    if (!Object.keys(QtServer[event]).includes('disconnect')) {
      return new Error(`[LISTENER]: ${event} is not a Qt signa!`);
    }

    if (typeof QtServer[event].disconnect !== 'function') {
      return new Error(`[LISTENER]: No Disconnect Function!`);
    }
    QtServer[event].disconnect(callback);
  };
}

export function saveQtConfigData(QtServer: PublishedObject) {
  const p12Token = QtServer.p12Token;
  const playerToken = QtServer.playerToken;
  const editorToken = QtServer.editorToken;
  const engineVersion = QtServer.engineVersion;
  localStorage.setItem(STORAGE_KEY.P12_TOKEN, p12Token);
  localStorage.setItem(STORAGE_KEY.PLAYER_TOKEN, playerToken);
  localStorage.setItem(STORAGE_KEY.EDITOR_TOKEN, editorToken);
  localStorage.setItem(STORAGE_KEY.QT_CONFIG, JSON.stringify({ engineVersion: engineVersion, pgeTag: p12Token ? 2 : 1 }));
}
