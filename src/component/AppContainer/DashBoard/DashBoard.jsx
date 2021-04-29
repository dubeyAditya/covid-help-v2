import React from "react";
import { Layout, Divider } from "antd";
import { Redirect, Route, withRouter } from "react-router-dom";
import { NavigationMenu } from "../DashBoard";
import Filter from "./Filters";
import "./DashBoard.scss";
import ResourceList from "./ResourceList";

const { Content, Sider } = Layout;

const DashBoard = () => {
  return (
    <Layout
      style={{
        overflowX: "auto",
      }}
    >
      <Sider breakpoint="md" collapsedWidth="0" style={{ background: "#fff" }}>
        <div className="logo">
          <img width="180px" height="150px" src="/cvr.jpg" alt="" />
        </div>
        <Divider></Divider>
        <NavigationMenu />
      </Sider>
      <Layout style={{ minHeight: "100%", padding: "0 24px 24px" }}>
        <Filter></Filter>
        {/* <NavigationHeader /> */}
        <Content
          style={{
            background: "#fff",
            padding: 24,
            margin: 0,
            minHeight: 280,
            height: "100%",
            overflowY: "auto",
          }}
        >
          <Route exact path="/">
            <Redirect to="oxygen"></Redirect>
          </Route>
          <Route
            path="/oxygen"
            render={(props) => <ResourceList id="oxygen" {...props} />}
          ></Route>
          <Route
            path="/beds"
            render={(props) => <ResourceList id="beds" {...props} />}
          ></Route>
          <Route
            path="/remdesivir"
            render={(props) => <ResourceList id="remdesivir" {...props} />}
          ></Route>
          <Route
            path="/fabiflu"
            render={(props) => <ResourceList id="fabiflu" {...props} />}
          ></Route>
          <Route
            path="/plasma"
            render={(props) => <ResourceList id="plasma" {...props} />}
          ></Route>
          <Route
            path="/others"
            render={(props) => <ResourceList id="others" {...props} />}
          ></Route>
          <Route
            path="/links"
            render={(props) => <ResourceList id="links" {...props} />}
          ></Route>
        </Content>
      </Layout>
    </Layout>
  );
};

export default withRouter(DashBoard);
