export type LabelType = {
  [key: string]: {
    label: string;
    title?: string;
    color?: string;
    icon?: string;
  };
};

export type FilmOptionType = {
  inputValue?: string;
  value?: number | string;
  label: string;
};

export type SelectItemType = {
  value: number;
  label: string;
  type?: number;
};

// 通信エラー時のメッセージ対応
export type ErrorResponse = {
  message?: string;
  response: {
    status: number;
    data: { status: number; message: string };
  };
};
