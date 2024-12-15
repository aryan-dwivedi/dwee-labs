import React, { createContext, useReducer, Dispatch, ReactNode } from "react";
import { initialState, reducer, State, Action } from "./reducer";

type AppContextType = {
  state: State;
  dispatch: Dispatch<Action>;
};

export const AppContext = createContext<AppContextType>({
  state: initialState,
  dispatch: () => null,
});

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};