import QWebChannel from './qwebchannel';
import { isDev } from '@/constants/env';
import { assert, isQtClient, log } from './utils';
import { addDispatcher, createSender, removeDispatcher } from './helper';

type Callback = (data?: any) => void;

type Action = {
  action: string;
  data: string;
  id?: number;
  promise?: any;
};

class WebBridge {
  eventQueue: any[];
  sendQueue: any[];
  send: any;
  on: any;
  off: any;

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

    // 开发环境中，若不在QtWebEngine中则进行模拟
    if (isDev && !isQtClient) {
      window.qt = {
        webChannelTransport: {
          send() {
            log('QWebChannel simulator activated !');
          },
          onmessage() {},
        },
      };
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
      this.eventQueue.push({
        event: event,
        callback: callback,
      });
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
    this.webBridge = new WebBridge(qtObjName, (callback = (_) => {}));
    this.sendActionName = sendActionName;
    this.listenEventName = listenEventName;
    this.callbackList = {};
    this.callbackId = 0;
  }

  send(request: Action) {
    return new Promise((resolve, reject) => {
      request.id = this.callbackId++;
      this.callbackList[request.id] = {
        resolve,
        reject,
      };

      this.webBridge.send({
        action: this.sendActionName,
        data: JSON.stringify(request),
      });
    });
  }

  addResponseListener() {
    this.webBridge.on(this.listenEventName, (responseStr: string) => {
      console.log(responseStr);
      let response = JSON.parse(responseStr);
      if (response.hasOwnProperty('id')) {
        const promiseObj = this.callbackList[response.id];
        promiseObj.resolve(response.data);
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
