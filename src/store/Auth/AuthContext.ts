import { createContext } from "react";

export interface AuthProviderContext {
    currentUser: string
    setCurrentUser(str: string): void
}

const defaultAuthProviderContext: AuthProviderContext = {
    get currentUser(): string {
        throw new Error("You need to wrap the Component into a AuthProviderProvider to provide the functionality of AuthProviderContext.")
    },
    setCurrentUser: (str: string) => {
        throw new Error("You need to wrap the Component into a AuthProviderProvider to provide the functionality of AuthProviderContext.")
    },
}

export const Context = createContext(defaultAuthProviderContext)
