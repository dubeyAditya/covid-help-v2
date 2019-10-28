import * as React from "react";
import "./AppContainer.scss";
import { DashBoard } from ".";
import { BrowserRouter as Router } from "react-router-dom";


const  AppContainer = ()=>{
  return (
    <div className="application-container">
      <Router>
        <DashBoard/>
      </Router>
    </div>
  );
}

export default AppContainer;
