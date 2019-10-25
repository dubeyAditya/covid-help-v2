import * as React from "react";
import { QuesionForm, ExamsTable } from ".";
import "./DashBoard.scss";
import { Layout, Menu, Breadcrumb, Icon, Divider, Avatar, Dropdown } from "antd";
import { Link, Route, withRouter, RouteComponentProps } from "react-router-dom";
import StudentsTable from "./StudentsTable";
import UserContext from "../../../store/userContext";
const { SubMenu } = Menu;
const { Content, Sider } = Layout;

export interface Props extends RouteComponentProps {
  children?: React.ReactNode;
  signOut:any;
}

export interface State { }

class DashBoard extends React.Component<Props, State> {
  static contextType = UserContext;

  constructor(props: Props) {
    super(props);

    this.state = {};
  }

  componentDidMount() {
    this.props.history.push("/myExam");
    console.log("Context", this.context);
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
    // TODO : Add uid verification insted of email
    const { email } = this.context;
    return ["rkarma1044@gmail.com", "dubey.aditya092@gmail.com", "mayank.dubey726@gmail.com"].includes(
      email
    )
      ? this.renderAdminNavigation()
      : this.renderStudentMenu();
  };


 menu = () => {
   
  return( <Menu>
    <Menu.Item key="1">
      <Icon onClick={this.props.signOut} type="poweroff" />
      Logout 
    </Menu.Item>
  </Menu>)
 };
  

  render() {
    const { showNavigation } = this;
    const { displayName, photoURL } = this.context;
    return (
      <Layout>
        <Sider breakpoint="lg"
          collapsedWidth="0"
          onBreakpoint={broken => {
            console.log(broken);
          }}
          onCollapse={(collapsed, type) => {
            console.log(collapsed, type);
          }} style={{ background: "#fff" }}>
          <div className="logo">
            <img width="180px" height="75px" src="/Newton Logo.png" alt="" />
          </div>
          {showNavigation()}
        </Sider>
        <Layout
          className="display-container"
          style={{ minHeight: "100%", padding: "0 24px 24px" }}
        >
          <div className="flex-center-all navigation-header">
            <div>
              <Breadcrumb style={{ margin: "16px 0" }}>
                <Breadcrumb.Item>Home</Breadcrumb.Item>
                <Breadcrumb.Item>Exams</Breadcrumb.Item>
                <Breadcrumb.Item>My Exams</Breadcrumb.Item>
              </Breadcrumb>
            </div>
            <div>
              {displayName} 
              <Divider type="vertical" />
              <Dropdown overlay={this.menu()}>
              <Avatar src={photoURL}></Avatar>
              </Dropdown>
              {/* <Divider type="vertical"></Divider> */}
              {/* <Icon type="bell" /> */}
            </div>
          </div>
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
    );
  }
}

export default withRouter(DashBoard);
