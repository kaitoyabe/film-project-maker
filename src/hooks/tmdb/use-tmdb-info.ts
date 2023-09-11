import { useCallback } from "react";

import { TmdbInfo } from "types/tmdb";

export enum Language {
  JA = "ja-JP",
  EN = "en-US",
}

export type SearchParams = {
  title: string;
  lang: Language;
};

export const useTmdbInfo = () => {
  const getTmdbInfo = useCallback(async (tmdbID: string) => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_APP_BASE_URL ?? ""}/api/tmdb/${tmdbID}`
    );

    const data = (await response.json()) as TmdbInfo;

    return {
      tmdbInfo: data,
    };
  }, []);
  const searchTmdbInfo = useCallback(async (params: SearchParams) => {
    const query = new URLSearchParams(params);
    const response = await fetch(
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      `${process.env.NEXT_PUBLIC_APP_BASE_URL ?? ""}/api/tmdb/search?${query}`
    );

    const data = (await response.json()) as {
      results: TmdbInfo[];
    };

    return {
      tmdbInfos: data.results,
    };
  }, []);

  return {
    getTmdbInfo,
    searchTmdbInfo,
  };
};
