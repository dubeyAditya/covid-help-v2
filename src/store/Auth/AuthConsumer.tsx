import * as React from "react";
import { AuthProviderContext, Context } from './AuthContext'

export const WithAuthProvider = Context.Consumer

export function withAuthProvider<P>(Component: React.ComponentType<P & AuthProviderContext>): React.ComponentType<P> {
    return props => <WithAuthProvider>{context => <Component {...context} {...props} />}</WithAuthProvider>
}
