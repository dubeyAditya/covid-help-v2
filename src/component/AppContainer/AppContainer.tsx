import * as React from "react";
import "./AppContainer.scss";
import { DashBoard } from ".";
import { BrowserRouter as Router } from "react-router-dom";
export interface Props {
  signOut:any;
}

export interface State {}

const  AppContainer : React.FC<Props> = ({signOut})=>{
  return (
    <div className="application-container">
      <Router>
        <DashBoard signOut={signOut}/>
      </Router>
    </div>
  );
}

export default AppContainer;
