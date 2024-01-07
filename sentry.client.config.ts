import * as Sentry from '@sentry/nextjs';

Sentry.init({
  dsn: 'https://5d01964bdf7cce3bed424629d55208e0@o1375249.ingest.sentry.io/4506528387563520',
  tracesSampleRate: 0.1,
  debug: false,
  replaysOnErrorSampleRate: 0.1,
  replaysSessionSampleRate: 0.1,
  integrations: [
    new Sentry.Replay({
      maskAllText: true,
      blockAllMedia: true,
    }),
  ],
});
