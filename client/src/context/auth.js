import React, { createContext, useContext, useReducer } from "react";
import { LOGIN, LOGOUT } from "../constants";

export const AuthDispatchContext = createContext();
export const AuthStateContext = createContext();

const initialState = { user: null };

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      return { ...state, user: action.user };

    case LOGOUT:
      return { ...state, user: null };

    default:
      return state;
  }
};

export function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(authReducer, {
    user: null
  });

  return (
    <AuthStateContext.Provider value={state}>
      <AuthDispatchContext.Provider value={dispatch}>
        {children}
      </AuthDispatchContext.Provider>
    </AuthStateContext.Provider>
  );
}

export function useAuthState() {
  const context = useContext(AuthStateContext);
  if (!context) {
    throw new Error("Must use AuthStateContext with AuthProvider");
  }

  return context;
}

export function useAuthDispatch() {
  const context = useContext(AuthDispatchContext);
  if (!context) {
    throw new Error("Must use AuthDispatchContext with AuthProvider");
  }

  return context;
}
