import React from "react";
import "./App.scss";

import Loading from "./component/Loading";

import AppContainer from "./component/AppContainer"; // Root or Container Component

import withFirebaseAuth from "react-with-firebase-auth"; // authorization

import firebase from "./firebase";

import { AuthContext, appContext as AppContext } from "./context";



class App extends React.Component {


  constructor() {
    super();
    this.state = {
      oxygen: [],
      remdesivir: [],
      fabiflu: [],
      beds: [],
      plasma: [],
      others:[],
      links:[],
      loading: false
    };
  }




  componentWillMount() {
    this.setState({ loading: true });
  }

  componentDidMount() {
    firebase.subscribeDb("oxygen", (value) => this.setState({ oxygen: value, loading: false }));
    firebase.subscribeDb("remdesivir", (value) => this.setState({ remdesivir: value }));
    firebase.subscribeDb("fabiflu", (value) => this.setState({ fabiflu: value }));
    firebase.subscribeDb("beds", (value) => this.setState({ beds: value }));
    firebase.subscribeDb("plasma", (value) => this.setState({ plasma: value }));
    firebase.subscribeDb("others", (value) => this.setState({ others: value }));
    firebase.subscribeDb("links", (value) => this.setState({ links: value }));
  }



  loadAppContent() {
    return (
      <AppContext.Provider value={this.state}>
        <AuthContext.Provider value={null}>
          <AppContainer />
        </AuthContext.Provider>
      </AppContext.Provider>
    );
  };

  render() {

    return (
      <div className="application-wrapper">
        { this.state.loading ? <Loading></Loading> : this.loadAppContent()}
      </div>
    );
  }
};

export default withFirebaseAuth(firebase)(App);
