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

  const [loading, setLoading] = useState(true);

  const authContextValue = { signOut, user };

  const appContextValue = new ApplicationContext();

  appContextValue.setAdmin(true);
  appContextValue.setViewAcess(true);

  useEffect(() => {
    if (user) {
      setLoading(true);
      const unsubscribe = auth.onAuthStateChanged((user: any) => {
        api.get("admins").then((admins) => {
          setLoading(false)
          admins.forEach((admin: any) => {
            if (admin.uid === user.uid)
              console.log(admin);
            //  setAdmin(true);
              api.get("users").then((users) => {
              users.forEach((usr: any) => {
                if (user.uid === usr.uid && usr.enabled) {
                  // setViewAcess(true);
                  console.log(usr);
                }
              });
            });
          });
        });
        unsubscribe();
      });
    }
    else {
      setTimeout(() => setLoading(false), 1000);
    }
  }, [user]);


  const loadAppContent = () => {
    return (
      <AppContext.Provider value={appContextValue}>
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
      {loading ? <Loading /> : authenticateUser()}
    </div>
  );
};

export default withFirebaseAuth(firebaseAdapter)(App);
