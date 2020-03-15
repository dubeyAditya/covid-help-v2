import React, { useEffect, useState } from "react";
import "./App.scss";

import Loading from "./component/Loading";

import Login from "./component/Login";

import AppContainer from "./component/AppContainer"; // Root or Container Component

import withFirebaseAuth from "react-with-firebase-auth"; // authorization

import firebase from "./firebase";

import api from "./services";

import { AuthContext, appContext as AppContext } from "./context";

const auth = firebase.getAuth();


const App = ({ signInWithGoogle, signOut, user }) => {

  const [appState, setAppState] = useState({loading: true});

  const authContextValue = { signOut, user };


  useEffect(() => {
    let unsubscribe;
    if (!user) {
      setTimeout(() => {
        setAppState({ loading: false });
        unsubscribe = auth.onAuthStateChanged((user) => {
          if (user) { 
            setAuthAsync(user);
          }
        });
      }, 3000);
    }

    return () => unsubscribe();
    // eslint-disable-next-line
  }, []);


  const setAuthAsync = async (user) => {
    setAppState({ loading: true });
    const [ student ] = await api.find('users', 'uid','==', user.uid);
    const  isAdmin = student.role === 'admin'; 
    const hasViewAccess = isAdmin || student.enabled;
    console.log("User :",student)
    setAppState({ isAdmin, hasViewAccess, loading: false });
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
    return !user ? <Login signInWithGoogle={signInWithGoogle} /> : loadAppContent();
  };

  return (
    <div className="application-wrapper">
      {appState.loading ? <Loading></Loading> : authenticateUser()}
    </div>
  );
};

export default withFirebaseAuth(firebase)(App);
