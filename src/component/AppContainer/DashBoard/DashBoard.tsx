import React, { useEffect, useContext } from "react";
import { QuesionForm, ExamsTable, NavigationMenu, StudentsTable, NavigationHeader, Profile } from ".";
import { Layout, Empty } from "antd";
import { Route, withRouter, RouteComponentProps } from "react-router-dom";

import "./DashBoard.scss";
import { appContext } from "../../../store";

const { Content, Sider } = Layout;

export interface Props extends RouteComponentProps {
  children?: React.ReactNode;
}


const DashBoard: React.FC<Props> = ({ history }) => {

  const app = useContext(appContext);

  const route = (app.isAdmin || app.hasViewAccess) ? "myExam" : "myProfile";

  useEffect(() => {
    history.push(route);
  }, [history, route]);



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
          <Route path="/noData" render={() => <Empty></Empty>}></Route>
        </Content>
      </Layout>
    </Layout>
  );
}

export default withRouter(DashBoard);
