export interface IPieItem {
  ["name"]: string;
  ["value"]: number;
}

export interface IPieChart {
  title: string;
  id: string;
  poster_path: string;
}

export type PieChartFormType = {
  pieItems: IPieItem[];
};
