import React, { useEffect, useState } from "react";
import "./App.scss";

import Loading from "./component/Loading";

import Login from "./component/Login";

import AppContainer from "./component/AppContainer"; // Root or Container Component

import withFirebaseAuth from "react-with-firebase-auth"; // authorization

import firebaseAdapter from "./firebase/FirebaseAuthAdapter";

import UserContext from "./store/userContext";

const App = ({ user, signOut, signInWithGoogle }: any) => {
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

 const logOut = () => (signOut());

  const getContent = () => {
    return (
      <UserContext.Provider value={user}>
        {" "}
        <AppContainer signOut={logOut}/>
      </UserContext.Provider>
    );
  };

  const authenticateUser = () => {
    return !user ? <Login signInWithGoogle={signInWithGoogle} /> : getContent();
  };

  return (
    <div className="application-wrapper">
      {loading ? <Loading /> : authenticateUser()}
    </div>
  );
};

export default withFirebaseAuth(firebaseAdapter)(App);
