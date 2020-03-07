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
        setAppState({ ...appState, loading: false });
      }, 3000);
    }

    unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) { setAuthAsync(user); }
    });

    return () => unsubscribe();
    // eslint-disable-next-line
  }, [user]);


  const setAuthAsync = async (user) => {
    setAppState({ ...appState, loading: false });
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
