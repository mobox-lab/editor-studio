type Callback = (data?: any) => void;

type Action = {
  action: string;
  data: string;
  promise?: any;
};

export function createSender(QtServer: any) {
  return ({ action = '', data = '', promise = null }: Action) => {
    return new Promise((resolve, reject) => {
      if (promise && promise.reject && promise.resolve) {
        resolve = promise.resolve;
        reject = promise.reject;
      }

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

export function addDispatcher(QtServer: any) {
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

export function removeDispatcher(QtServer: any) {
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
