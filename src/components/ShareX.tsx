import { FC, memo, useEffect } from "react";

const ShareX: FC = () => {
  useEffect(() => {
    // scriptを読み込み
    const script = document.createElement("script");
    script.src = "https://platform.twitter.com/widgets.js";
    document.body.appendChild(script);

    // アンマウント時に一応scriptタグを消しておく
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <a
      href="https://twitter.com/share?ref_src=twsrc%5Etfw"
      className="twitter-share-button"
      data-size="large"
      data-text="フィルームで映画評価プロジェクトを作成しよう！"
      data-url="https://filloom.com"
      data-hashtags="映画好き"
      data-lang="ja"
      data-show-count="false"
    >
      Tweet
    </a>
  );
};

export default memo(ShareX);
