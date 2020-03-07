import React, { useEffect, useContext } from "react";
import { QuesionForm, ExamsTable, NavigationMenu, StudentsTable, NavigationHeader, Profile, QuizTable, MyQuiz } from ".";
import { Layout, Empty } from "antd";
import { Route, withRouter, RouteComponentProps } from "react-router-dom";

import "./DashBoard.scss";
import { appContext } from "../../../context";

const { Content, Sider } = Layout;


const DashBoard = ({ history }) => {

  const app = useContext(appContext);

  const route = app.isAdmin ? "myQuizs" :  app.hasViewAccess ? "myQuizs" : "myProfile";

  useEffect(() => {
    history.push(route);
  }, []);

  return (
    <Layout>
      <Sider breakpoint="lg"
        collapsedWidth="0"
        style={{ background: "#fff" }}>
        <div className="logo">
          <img width="180px" height="75px" src="/Newton Logo.png" alt="" />
        </div>
        <NavigationMenu />
      </Sider>
      <Layout
        className="display-container"
        style={{ minHeight: "100%", padding: "0 24px 24px" }}>
        <NavigationHeader />
        <Content
          style={{
            background: "#fff",
            padding: 24,
            margin: 0,
            minHeight: 280,
            height: "100%",
            overflowY: "auto"
          }}
        >
          <Route path="/students" component={StudentsTable}></Route>
          <Route path="/myExam" component={ExamsTable}></Route>
          <Route path="/addExam" component={QuesionForm}></Route>
          <Route path="/myProfile" component={Profile}></Route>
          <Route path="/myQuizs" component={QuizTable}></Route>
          <Route path="/noData" component={Empty}></Route>
          <Route path="/quiz" component={MyQuiz}></Route>
        </Content>
      </Layout>
    </Layout>
  );
}

export default withRouter(DashBoard);
