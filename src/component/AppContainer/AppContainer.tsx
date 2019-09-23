import * as React from "react";
import "./AppContainer.scss";
import { DashBoard } from ".";

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
        <DashBoard />
      </div>
    );
  }
}

export default AppContainer;
