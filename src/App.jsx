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
      resources: {
        oxygen: [],
        remdesivir: [],
        fabiflu: [],
        beds: [],
        plasma: [],
        others: [],
        links: [],
      },
      search: {
        oxygen: [],
        remdesivir: [],
        fabiflu: [],
        beds: [],
        plasma: [],
        others: [],
        links: [],
      },
      loading: false,
      locations: [],
    };
  }

  componentWillMount() {
    this.setState({ loading: true });
  }

  componentDidMount() {
    firebase.subscribeDb("oxygen", (value) =>
      this.setState((prev) => ({
        resources: { ...prev.resources, oxygen: value },
        loading: false,
      }))
    );
    firebase.subscribeDb("remdesivir", (value) =>
      this.setState((prev) => ({
        resources: { ...prev.resources, remdesivir: value },
      }))
    );
    firebase.subscribeDb("fabiflu", (value) =>
      this.setState((prev) => ({
        resources: { ...prev.resources, fabiflu: value },
      }))
    );
    firebase.subscribeDb("beds", (value) =>
      this.setState((prev) => ({
        resources: { ...prev.resources, beds: value },
      }))
    );
    firebase.subscribeDb("plasma", (value) =>
      this.setState((prev) => ({
        resources: { ...prev.resources, plasma: value },
      }))
    );
    firebase.subscribeDb("others", (value) =>
      this.setState((prev) => ({
        resources: { ...prev.resources, others: value },
      }))
    );
    firebase.subscribeDb("links", (value) =>
      this.setState((prev) => ({
        resources: { ...prev.resources, links: value },
      }))
    );
  }

  setFilter = (value) => {
    if (value.length) {
      this.setState((prev) => {
        const filtred = Object.keys(prev.resources).reduce((result, res) => {
          const resource = prev.resources[res];
          return {
            ...result,
            [res]: resource.filter((ele) =>
              value.includes((ele.State_City || "").toLowerCase())
            ),
          };
        }, {});
        return { search: filtred, locations: value };
      });
    } else {
      this.setState((prev) => {
        return { search: prev.resources, locations: value };
      });
    }
  };

  loadAppContent() {
    return (
      <AppContext.Provider
        value={{
          resources: this.state.resources,
          search: this.state.search,
          setFilter: this.setFilter,
        }}
      >
        <AuthContext.Provider value={null}>
          <AppContainer />
        </AuthContext.Provider>
      </AppContext.Provider>
    );
  }

  render() {
    return (
      <div className="application-wrapper">
        {this.state.loading ? <Loading></Loading> : this.loadAppContent()}
      </div>
    );
  }
}

export default withFirebaseAuth(firebase)(App);
