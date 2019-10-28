import React, { useContext } from "react";
import {Menu,Icon} from 'antd';
import { Link } from "react-router-dom";
import { appContext } from "../../../../store";
const {SubMenu} =  Menu;

const AdminNavigation = () => {
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

  const NavigationMenu: React.FC = ()=>{
    //  const {isAdmin} = useContext(appContext);
     const isAdmin =  true;
     return (isAdmin ? <AdminNavigation /> : <StudentNavigation/>)
  }

  export  default NavigationMenu;
