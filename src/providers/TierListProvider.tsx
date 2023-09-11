import { createContext, PropsWithChildren, useMemo, useReducer } from "react";

import tierListReducer from "reducers/tierListReducer";
import { ITierList } from "types/TierItem";
import { TierListActions } from "types/TypesReducer";

interface ITierListContext {
  tierListData: ITierList;
  dispatch: React.Dispatch<TierListActions>;
}

const inititalState: ITierList = {
  title: "Best Films",
  id: "0",
  tiers: [
    {
      name: "S",
      id: "1",
      color: "#ff7f7f",
      items: [],
    },
    {
      name: "A",
      id: "2",
      color: "#ffbf7f",
      items: [],
    },
    {
      name: "B",
      id: "3",
      color: "#ffdf7f",
      items: [],
    },
    {
      name: "C",
      id: "4",
      color: "#ffff7f",
      items: [],
    },
    {
      name: "D",
      id: "5",
      color: "#bfff7f",
      items: [],
    },
  ],
  withoutTiers: [],
};

export const TierListContext = createContext({} as ITierListContext);

const TierListProvider = ({ children }: PropsWithChildren) => {
  const [tierListData, dispatch] = useReducer(tierListReducer, inititalState);

  const value = useMemo(
    () => ({
      tierListData,
      dispatch,
    }),
    [tierListData]
  );

  return (
    <TierListContext.Provider value={value}>
      {children}
    </TierListContext.Provider>
  );
};

export default TierListProvider;
