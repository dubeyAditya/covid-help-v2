import * as React from "react";
import "./AppContainer.scss";
import { DashBoard } from ".";
import { BrowserRouter as Router } from "react-router-dom";
export interface Props {}

export interface State {}

class AppContainer extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {};
    console.log(this.context);
  }

  render() {
    return (
      <div className="application-container">
        <Router>
          <DashBoard />
        </Router>
      </div>
    );
  }
}

export default AppContainer;
