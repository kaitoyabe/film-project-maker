export const checkJapaneseChar = (str: string) =>
  !!str.match(/^[\u30a0-\u30ff\u3040-\u309f\u3005-\u3006\u30e0-\u9fcf]+$/);
