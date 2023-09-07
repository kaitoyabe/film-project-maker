import { createContext, PropsWithChildren, useMemo, useReducer } from "react";

import tierListMock from "reducers/mock/tierListMock";
import tierListReducer from "reducers/tierListReducer";
import { ITierList } from "types/TierItem";
import { TierListActions } from "types/TypesReducer";

interface ITierListContext {
  tierListData: ITierList;
  dispatch: React.Dispatch<TierListActions>;
}

const inititalState: ITierList = tierListMock;

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
