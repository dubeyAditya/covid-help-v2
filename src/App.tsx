import React from "react";
import "./App.scss";

import { BrowserRouter as Router } from "react-router-dom";

import AppContainer from "./component/AppContainer"; // Root or Container Component

import withFirebaseAuth from "react-with-firebase-auth"; // authorization

import firebaseAdapter from "./firebase/FirebaseAuthAdapter";
import Icon from "antd/lib/icon";
import Card from "antd/lib/card";
import "./App.scss";

const App = ({ user, signOut, signInWithGoogle }: any) => {
  return (
    <Router>
      {!user ? (
        <div className="flex">
          <Card style={{ width: 300 }}>
            <div className="btn-google">
              <button onClick={signInWithGoogle}>
                {" "}
                <Icon type="google" />
              </button>
            </div>
          </Card>
        </div>
      ) : (
        <AppContainer />
      )}
    </Router>
  );
};

export default withFirebaseAuth(firebaseAdapter)(App);
