"use client";

import React, { createContext, Dispatch, useContext, useReducer } from "react";
import { Action, State } from "../_store/store.types";

interface StateProviderProps {
  children: React.ReactNode;
}

type StateContextType<S, A> = [S, Dispatch<A>];

export const StateContext = createContext<StateContextType<State, Action> | undefined>(undefined);

export const initialState: State = {
  favorites: [],
};

export const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case "ADD_FAVORITE":
      return {
        ...state,
        favorites: [...state.favorites, ...action.item],
      };

    case "REMOVE_FAVORITE":
      return {
        ...state,
        favorites: state.favorites.filter((f) => f._id !== action.item._id),
      };
    default:
      return state;
  }
};

export const StateProvider = ({ children }: StateProviderProps) => {
  const value = useReducer(reducer, initialState);

  return <StateContext.Provider value={value}>{children}</StateContext.Provider>;
};

export const useStateValue = () => {
  const context = useContext(StateContext);
  if (!context) throw new Error("useStateValue must be used inside StateProvider");
  return context;
};
