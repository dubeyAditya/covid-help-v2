import React from 'react';

class ApplicationContext {
    constructor() {
        this.isAdmin = false;
        this.isGuest = true;
        this.hasViewAccess = false;
        this.loading =  true;
    }
}

const appContext = React.createContext(null);
export {
    appContext,
    ApplicationContext
};