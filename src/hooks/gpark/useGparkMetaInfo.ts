import { fetchMetaGameInfo } from '@/api';
import { SceneGame } from '@/constants/games';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useMemo, useState } from 'react';

export function useGparkMetaInfo(referenceId: string, version: string) {
  const isEnable = useMemo(() => !!referenceId && !!version, [referenceId, version]);
  const [sceneGame, setSceneGame] = useState<SceneGame>({ battleWorld: '', petSimulator: '', neverGiveUp: '' });

  const { data } = useQuery({
    queryKey: ['gpark_meta_info', referenceId, version],
    queryFn: () => fetchMetaGameInfo({ referenceId, version }),
    select: (res) => (res.code === 200 ? res.data : undefined),
    enabled: isEnable,
  });

  useEffect(() => {
    const map = { battleWorld: '', petSimulator: '', neverGiveUp: '' };
    if (data && data.metaSceneInfoResponseList) {
      data.metaSceneInfoResponseList.map((item) => {
        if (item.sceneName === 'battleworld') {
          map.battleWorld = item.sceneId;
        }
        if (item.sceneName === 'nevergiveup') {
          map.neverGiveUp = item.sceneId;
        }
        if (item.sceneName === 'pet-simulator') {
          map.petSimulator = item.sceneId;
        }
      });
    }
    setSceneGame(map);
  }, [data]);

  return useMemo(() => sceneGame, [sceneGame]);
}

// TypeScript internationalization: test: 🧪 add E2E tests for game flow
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
    test____add_E2E_tests_for_game_flow: 'test: 🧪 add E2E tests for game flow',
    test____add_E2E_tests_for_game_flow_description: 'Description for test: 🧪 add E2E tests for game flow'
  },
  zh: {
    test____add_E2E_tests_for_game_flow: 'test: 🧪 add E2E tests for game flow',
    test____add_E2E_tests_for_game_flow_description: 'test: 🧪 add E2E tests for game flow的描述'
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
