import React from 'react';

class ApplicationContext {
    isAdmin: boolean;
    isGuest: boolean;
    hasViewAccess: boolean;

    constructor() {
        this.isAdmin = false;
        this.isGuest = true;
        this.hasViewAccess = false;
    }

    setAdmin(value: boolean) {
        this.isAdmin = value;
    }

    setGuest(value: boolean) {
        this.isGuest = value;
    }

    setViewAcess(value: boolean) {
        this.hasViewAccess = value;
    }

}

const appContext = React.createContext<ApplicationContext>(new ApplicationContext());
export {
    appContext,
    ApplicationContext
};