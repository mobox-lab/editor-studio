export const GPARK_API_PREFIX = process.env.NEXT_PUBLIC_GPARK_API_PREFIX;

export const GPARK_PACKAGE_NAME = process.env.NEXT_PUBLIC_GPARK_PACKAGE_NAME;
export const PGE_ENGINE_VERSION = process.env.NEXT_PUBLIC_PGE_ENGINE_VERSION;

export const P12_API_PREFIX = process.env.NEXT_PUBLIC_P12_API_PREFIX;

export const EDITOR_API_PREFIX = process.env.NEXT_PUBLIC_EDITOR_API_PREFIX;

// dev test token
export const GPARK_PLAYER_TOKEN = process.env.NEXT_PUBLIC_GPARK_PLAYER_TOKEN;
export const GPARK_EDITOR_TOKEN = process.env.NEXT_PUBLIC_GPARK_EDITOR_TOKEN;
export const P12_TOKEN = process.env.NEXT_PUBLIC_P12_TOKEN;

export const isClientSide = typeof window !== 'undefined';
export const isServerSide = !isClientSide;

export const isDev = process.env.NODE_ENV === 'development';

export const isErudaDebug = process.env.NEXT_PUBLIC_ERUDA_DEBUG === 'eruda';

export const LAUNCHER_ENV = process.env.NEXT_PUBLIC_LAUNCHER_ENV;
