import React from 'react';

class ApplicationContext {
    constructor() {
        this.isAdmin = false;
        this.isGuest = true;
        this.hasViewAccess = false;
        this.loading =  true;
    }
}

const appContext = React.createContext({ oxygen: [], remdesivir: [], fabiflu: [], beds: [] });
export {
    appContext,
    ApplicationContext
};