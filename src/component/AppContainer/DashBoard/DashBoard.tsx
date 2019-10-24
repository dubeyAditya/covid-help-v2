import * as React from "react";
import { QuesionForm, ExamsTable } from ".";
import "./DashBoard.scss";
import { Layout, Menu, Breadcrumb, Icon } from "antd";
import { Link, Route, withRouter, RouteComponentProps } from "react-router-dom";
import StudentsTable from "./StudentsTable";
import UserContext from "../../../store/userContext";
const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

export interface Props extends RouteComponentProps {
  children?: React.ReactNode;
}

export interface State {}

class DashBoard extends React.Component<Props, State> {
  static contextType = UserContext;

  constructor(props: Props) {
    super(props);

    this.state = {};
  }

  componentDidMount() {
    this.props.history.push("/myExam");
  }

  renderAdminNavigation = () => {
    return (
      <Menu
        mode="inline"
        defaultSelectedKeys={["2"]}
        defaultOpenKeys={["sub2"]}
        style={{ height: "100%", borderRight: 0 }}
      >
        <SubMenu
          key="sub1"
          title={
            <span>
              <Icon type="user" />
              Students
            </span>
          }
        >
          <Menu.Item key="1">
            <Link to="/students">Students Details</Link>
          </Menu.Item>
        </SubMenu>
        <SubMenu
          key="sub2"
          title={
            <span>
              <Icon type="laptop" />
              Exams
            </span>
          }
        >
          <Menu.Item key="1">
            <Link to="/addExam"> Add Exam </Link>
          </Menu.Item>
          <Menu.Item key="2">
            <Link to="/myExam">My Exams</Link>
          </Menu.Item>
          <Menu.Item key="3">All Exams</Menu.Item>
        </SubMenu>
        <SubMenu
          key="sub3"
          title={
            <span>
              <Icon type="notification" />
              Announcements
            </span>
          }
        >
          <Menu.Item key="9">Holidays</Menu.Item>
          <Menu.Item key="10">New Batches</Menu.Item>
          <Menu.Item key="11">Extra Classes</Menu.Item>
        </SubMenu>
      </Menu>
    );
  };

  renderStudentMenu = () => {
    return (
      <Menu
        mode="inline"
        defaultSelectedKeys={["1"]}
        defaultOpenKeys={["sub1"]}
        style={{ height: "100%", borderRight: 0 }}
      >
        <SubMenu
          key="sub1"
          title={
            <span>
              <Icon type="laptop" />
              Exams
            </span>
          }
        >
          <Menu.Item key="1">
            <Link to="/myExam">My Exams</Link>
          </Menu.Item>
        </SubMenu>
        <SubMenu
          key="sub2"
          title={
            <span>
              <Icon type="notification" />
              Announcements
            </span>
          }
        >
          <Menu.Item key="9">Holidays</Menu.Item>
          <Menu.Item key="10">New Batches</Menu.Item>
          <Menu.Item key="11">Extra Classes</Menu.Item>
        </SubMenu>
      </Menu>
    );
  };

  showNavigation = () => {
    const { email } = this.context;
    return ["rkarma1044@gmail.com", "dubey.aditya092@gmail.com","mayank.dubey726@gmail.com"].includes(
      email
    )
      ? this.renderAdminNavigation()
      : this.renderStudentMenu();
  };

  render() {
    const { showNavigation } = this;
    const { displayName } = this.context;
    return (
      //   <div className="dashboard-wrapper">
      <Layout>
        <Header className="header">
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={["1"]}
            style={{ lineHeight: "64px" }}
          >
            <Menu.Item key="1">Newton Academy</Menu.Item>
            <Menu.Item key="2" disabled={true}>
              Hi! {displayName}
            </Menu.Item>
          </Menu>
        </Header>
        <Layout>
          <Sider width={200} style={{ background: "#fff" }}>
            {showNavigation()}
          </Sider>
          <Layout
            className="display-container"
            style={{ minHeight: "100%", padding: "0 24px 24px" }}
          >
            <Breadcrumb style={{ margin: "16px 0" }}>
              <Breadcrumb.Item>Home</Breadcrumb.Item>
              <Breadcrumb.Item>Exams</Breadcrumb.Item>
              <Breadcrumb.Item>My Exams</Breadcrumb.Item>
            </Breadcrumb>
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
            </Content>
          </Layout>
        </Layout>
      </Layout>
      //   </div>
    );
  }
}

export default withRouter(DashBoard);
