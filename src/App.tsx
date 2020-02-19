import React, { useEffect, useState } from "react";
import "./App.scss";

import Loading from "./component/Loading";

import Login from "./component/Login";

import AppContainer from "./component/AppContainer"; // Root or Container Component

import withFirebaseAuth from "react-with-firebase-auth"; // authorization

import firebaseAdapter from "./firebase/FirebaseAuthAdapter";

import api from "./services";

import { AuthContext, appContext as AppContext, ApplicationContext } from "./store";

 const auth = firebaseAdapter.getAuth();


const App = ({ signInWithGoogle, signOut, user }: any) => {

  const [appState, setAppState] = useState(new ApplicationContext());

  const authContextValue = { signOut, user };


  useEffect(() => {

    if(!user){
      setTimeout(() => {
        setAppState({ ...appState, loading:false });
      }, 3000);
    }
     
    const unsubscribe = auth.onAuthStateChanged( (user:any) => {
      if (user) {  setAuthAsync(user); }
    });

    return () => unsubscribe();
    // eslint-disable-next-line
  }, []);


  const setAuthAsync = async (user:any) => {
    setAppState({ ...appState, loading:true });
    const admins = await api.find("admins",'uid','==', user.uid);
    const users = await api.find("users",'uid', '==', user.uid);
    if(admins.size){
      setAppState({ isAdmin: true, hasViewAccess: true, isGuest: false, loading:false });
    }
    else if(users.size){
      users.forEach((doc: any) => {
        if (doc.data().enabled) 
          setAppState({ isAdmin: false, hasViewAccess: true, isGuest: false, loading:false });
        else {
          setAppState({ isAdmin: false, hasViewAccess: false, isGuest: false, loading:false });
        }  
      });
    }
    else setAppState({ ...appState,loading:false})
  }
  
  const loadAppContent = () => {
    return (
      <AppContext.Provider value={appState}>
        <AuthContext.Provider value={authContextValue}>
          <AppContainer />
        </AuthContext.Provider>
      </AppContext.Provider>
    );
  };

  const authenticateUser = () => {
    return  !user ? <Login signInWithGoogle={signInWithGoogle} /> : loadAppContent();
  };

  return (
    <div className="application-wrapper">
      {appState.loading ? <Loading></Loading> : authenticateUser()}
    </div>
  );
};

export default withFirebaseAuth(firebaseAdapter)(App);
