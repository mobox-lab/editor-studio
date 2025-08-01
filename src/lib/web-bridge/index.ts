import { QWebChannel } from './qwebchannel';
import { assert, isQtClient, log } from './utils';
import { addDispatcher, createSender, removeDispatcher, saveQtConfigData } from './helper';
import { GPARK_EDITOR_TOKEN, GPARK_PLAYER_TOKEN, isDev, P12_TOKEN, PGE_ENGINE_VERSION } from '@/constants/env';

export const NotInQtWebEngine = 'NotInQtWebEngine';

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

type Event = {
  event: string;
  callback: Callback;
};

class WebBridge {
  eventQueue: Event[];
  sendQueue: Action[];
  send: (payload: Action) => void;
  on: (eventName: string, callback: Callback) => void;
  off: (eventName: string, callback: Callback) => void;

  constructor(qtObjName: string, callback: Callback = (_?: any) => {}) {
    // check if initialization parameters are normal
    if (!qtObjName) {
      assert(qtObjName, 'must provide a name for the QT object');
    }
    // check if it is in the real QtWebEngine environment in non-development environment
    if (!isDev) {
      assert(
        window && window.qt && window.qt.webChannelTransport,
        "'qt' or 'qt.webChannelTransport' needs to be injected into the page by QtWebEngine",
      );
    }

    if (!isQtClient) {
      window.qt = {
        webChannelTransport: {
          send() {
            log('QWebChannel simulator activated !');
          },
          onmessage() {},
        },
      };
      saveQtConfigData({
        p12Token: P12_TOKEN,
        playerToken: GPARK_PLAYER_TOKEN,
        editorToken: GPARK_EDITOR_TOKEN,
        engineVersion: PGE_ENGINE_VERSION,
      });
    }

    //初始化未完成之前先暂存
    this.sendQueue = [];
    this.eventQueue = [];

    this.send = ({ action = '', data = '' }) => {
      return new Promise((resolve, reject) => {
        this.sendQueue.push({
          action: action,
          data: data,
          promise: {
            resolve: resolve,
            reject: reject,
          },
        });
      });
    };

    this.on = (event: string, callback: Callback) => {
      this.eventQueue.push({ event: event, callback: callback });
    };

    this.off = (event: string, callback: Callback) => {
      console.log('尚未初始化！');
    };

    new QWebChannel(window.qt.webChannelTransport, (channel) => {
      if (!Object.keys(channel.objects).includes(qtObjName)) {
        callback();
        return console.error('[QTWEBCHANNEL]: Unknown QT Object !');
      }

      const QtServer = channel.objects[qtObjName];

      saveQtConfigData(QtServer);
      this.send = createSender(QtServer);
      this.on = addDispatcher(QtServer);
      this.off = removeDispatcher(QtServer);

      if (this.sendQueue.length > 0) {
        this.sendQueue.forEach((e) => {
          this.send({ action: e.action, data: e.data, promise: e.promise });
        });

        this.sendQueue = [];
      }

      if (this.eventQueue.length > 0) {
        this.eventQueue.forEach((e) => {
          this.on(e.event, e.callback);
        });

        this.eventQueue = [];
      }

      callback();
    });
  }
}

class QTApiClient {
  webBridge: WebBridge;
  sendActionName: string;
  listenEventName: string;
  callbackList: any;
  callbackId: number;

  constructor(qtObjName: string, sendActionName: string, listenEventName: string, callback = (_?: any) => {}) {
    this.webBridge = new WebBridge(qtObjName, callback);
    this.sendActionName = sendActionName;
    this.listenEventName = listenEventName;
    this.callbackList = {};
    this.callbackId = 0;
  }

  send<T>(request: { action: string; data?: any; id?: number }) {
    return new Promise<T>((resolve, reject) => {
      request.id = this.callbackId++;
      this.callbackList[request.id] = { resolve, reject };
      console.log('Launcher request: ', request);
      this.webBridge.send({ action: this.sendActionName, data: JSON.stringify(request) });
      if (!isQtClient) {
        setTimeout(() => resolve(NotInQtWebEngine as any), 3000);
      }
    });
  }

  addResponseListener() {
    this.webBridge.on(this.listenEventName, (responseStr: string) => {
      let response = JSON.parse(responseStr);
      if (response.hasOwnProperty('id')) {
        const promiseObj = this.callbackList[response.id];
        promiseObj?.resolve(response.data);
        delete this.callbackList[response.id];
      }
    });
  }

  on(eventName: string, callback: Callback) {
    this.webBridge.on(eventName, callback);
  }

  off(eventName: string, callback: Callback) {
    this.webBridge.off(eventName, callback);
  }
}

export default QTApiClient;

// TypeScript internationalization: fix: 🐛 resolve chat message duplication
interface LocaleMessages {
  [key: string]: string;
}

interface I18nConfig {
  locale: string;
  fallbackLocale: string;
  messages: Record<string, LocaleMessages>;
}

export const messages: Record<string, LocaleMessages> = {
  en: {
    fix____resolve_chat_message_duplication: 'fix: 🐛 resolve chat message duplication',
    fix____resolve_chat_message_duplication_description: 'Description for fix: 🐛 resolve chat message duplication'
  },
  zh: {
    fix____resolve_chat_message_duplication: 'fix: 🐛 resolve chat message duplication',
    fix____resolve_chat_message_duplication_description: 'fix: 🐛 resolve chat message duplication的描述'
  }
};

export const i18nConfig: I18nConfig = {
  locale: 'en',
  fallbackLocale: 'en',
  messages
};

export const t = (key: string, locale: string = 'en'): string => {
  return messages[locale]?.[key] || messages[i18nConfig.fallbackLocale]?.[key] || key;
};
