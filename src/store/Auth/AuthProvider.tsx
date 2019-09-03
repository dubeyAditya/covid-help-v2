import React, { ReactNode } from "react";
import { Context, AuthProviderContext } from './AuthContext'

export interface AuthProviderProviderProps {
    children: ReactNode
}

export function AuthProviderProvider({ children }: AuthProviderProviderProps) {
    let user = ""

    const value: AuthProviderContext = {
        currentUser: user,
        setCurrentUser: (cuser: string) => {
            user = cuser;
        }
    }

    return <Context.Provider value={value}>{children}</Context.Provider>
}

