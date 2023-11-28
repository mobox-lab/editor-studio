export const GPARK_API_PREFIX = process.env.NEXT_PUBLIC_GPARK_API_PREFIX;

export const GPARK_PACKAGE_NAME = process.env.NEXT_PUBLIC_GPARK_PACKAGE_NAME;

export const P12_API_PREFIX = process.env.NEXT_PUBLIC_P12_API_PREFIX;

export const GPARK_USER_TOKEN = process.env.NEXT_PUBLIC_GPARK_USER_TOKEN;

export const isClientSide = typeof window !== 'undefined';
export const isServerSide = !isClientSide;

export const isDev = process.env.NODE_ENV === 'development';
