import React, { ReactNode } from "react";
import { Context, AuthProviderContext } from "./AuthContext";

export interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  let user = "Test user";

  const value: AuthProviderContext = {
    currentUser: user,
    setCurrentUser: (cuser: string) => {
      user = cuser;
    }
  };

  return <Context.Provider value={value}>{children}</Context.Provider>;
}
