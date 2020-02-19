import React from 'react';

class ApplicationContext {
    isAdmin: boolean;
    isGuest: boolean;
    hasViewAccess: boolean;
    loading:boolean;
    constructor() {
        this.isAdmin = false;
        this.isGuest = true;
        this.hasViewAccess = false;
        this.loading =  true;
    }
}

const appContext = React.createContext<ApplicationContext>(new ApplicationContext());
export {
    appContext,
    ApplicationContext
};