import React from "react";

const AuthContext = React.createContext({signOut:()=>{}, user: { displayName:'', email:'',uid: '', photoURL :''}});

export { AuthContext };
