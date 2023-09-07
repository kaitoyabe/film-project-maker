export interface ITierItem {
  id: string
  name: string
  image: string
}

export interface ITierList {
  title: string
  id: string

  tiers: IList[]
  withoutTiers: ITierItem[]
}

export interface IList {
  id: string
  name: string
  color: string
  items: ITierItem[]
}