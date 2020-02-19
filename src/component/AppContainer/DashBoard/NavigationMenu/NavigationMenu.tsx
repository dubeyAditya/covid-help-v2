import React, { useContext } from "react";
import { Menu, Icon } from 'antd';
import { Link } from "react-router-dom";
import { appContext } from "../../../../store";
const { SubMenu } = Menu;

const AdminNavigation = () => {
  return (
    <Menu
      mode="inline"
      defaultSelectedKeys={["3"]}
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
            Quizs
            </span>
        }
      >
        <Menu.Item key="3">
          <Link to="/myQuizs"> All Quizs </Link>
        </Menu.Item>
      </SubMenu>  


      {/* <SubMenu
        key="sub3"
        title={
          <span>
            <Icon type="laptop" />
            Exams
            </span>
        }
      >
        <Menu.Item key="5">
          <Link to="/addExam"> Add Exam </Link>
        </Menu.Item>
        <Menu.Item key="6">
          <Link to="/myExam"> All Exams </Link>
        </Menu.Item>
      </SubMenu> */}
      
      
      
      <SubMenu
        key="sub4"
        title={
          <span>
            <Icon type="notification" />
            Announcements
          </span>
        }
      >
        <Menu.Item key="9">
          <Link to="/noData">Holidays</Link>
        </Menu.Item>
        <Menu.Item key="10">
          <Link to="/noData">New Batches</Link>
        </Menu.Item>
        <Menu.Item key="11">
          <Link to="/noData">Extra Classes</Link>
        </Menu.Item>
      </SubMenu>
    </Menu>
  );
};

const StudentNavigation = () => {
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
          <Link to="/myQuizs"> My Quizs </Link>
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
        <Menu.Item key="9">
          <Link to="/noData">Holidays</Link>
        </Menu.Item>
        <Menu.Item key="10">
          <Link to="/noData">New Batches</Link>
        </Menu.Item>
        <Menu.Item key="11">
          <Link to="/noData">Extra Classes</Link>
        </Menu.Item>
      </SubMenu>
    </Menu>
  );
};

const GuestNavigation = () => {
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
            <Icon type="user" />
            Profile
          </span>
        }
      >
        <Menu.Item key="1">
          <Link to="/myProfile">My Profile</Link>
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
        <Menu.Item key="9">
          <Link to="/noData">Holidays</Link>
        </Menu.Item>
        <Menu.Item key="10">
          <Link to="/noData">New Batches</Link>
        </Menu.Item>
        <Menu.Item key="11">
          <Link to="/noData">Extra Classes</Link>
        </Menu.Item>
      </SubMenu>
    </Menu>
  );
}

const NavigationMenu: React.FC = () => {
  const { isAdmin, hasViewAccess } = useContext(appContext);
  return (isAdmin ? <AdminNavigation /> : hasViewAccess ? <StudentNavigation /> : <GuestNavigation />)
}

export default NavigationMenu;
