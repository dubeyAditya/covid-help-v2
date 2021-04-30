import React, { useEffect, useState } from "react";
import { Menu } from "antd";
import { Link } from "react-router-dom";
const { SubMenu } = Menu;

// const AdminNavigation = () => {
//   return (
//     <Menu
//       mode="inline"
//       defaultSelectedKeys={["1"]}
//       defaultOpenKeys={["sub2"]}
//       style={{ height: "100%", borderRight: 0 }}
//     >
//       <SubMenu
//         key="sub1"
//         title={
//           <span>
//             <Icon type="user" />
//             Volunteers
//             </span>
//         }
//       >
//         <Menu.Item key="0">
//           <Link to="/students">Volunteer Details</Link>
//         </Menu.Item>
//       </SubMenu>

//       <SubMenu
//         key="sub2"
//         title={
//           <span>
//             <Icon type="laptop" />
//             Resource Leads
//             </span>
//         }
//       >
//         <Menu.Item key="0">
//           <Link to="/"> Oxygen </Link>
//         </Menu.Item>
//         <Menu.Item key="2">
//           <Link to="/beds"> Bed </Link>
//         </Menu.Item>
//         <Menu.Item key="3">
//           <Link to="/remdesivir"> Remdesivir </Link>
//         </Menu.Item>
//         <Menu.Item key="4">
//           <Link to="/fabiflu"> Fabiflu </Link>
//         </Menu.Item>
//       </SubMenu>
//     </Menu>
//   );
// };

const GuestNavigation = ({route}) => {
  return (
    <Menu
      mode="inline"
      defaultSelectedKeys={route}
      defaultOpenKeys={["sub1"]}
      style={{
        borderRight: 0,
        marginTop: "1rem",
        overflow: "auto",
        height: "calc(100% - 150px)",
      }}
    >
      <SubMenu
        key="sub1"
        title={
          <span>
            Resources
          </span>
        }
      >
        <Menu.Item key="oxygen">
          <Link to="/oxygen"> Oxygen </Link>
        </Menu.Item>
        <Menu.Item key="beds">
          <Link to="/beds"> Bed </Link>
        </Menu.Item>
        <Menu.Item key="remdesivir">
          <Link to="/remdesivir"> Remdesivir </Link>
        </Menu.Item>
        <Menu.Item key="fabiflu">
          <Link to="/fabiflu"> Fabiflu </Link>
        </Menu.Item>
        <Menu.Item key="plasma">
          <Link to="/plasma"> Plasma </Link>
        </Menu.Item>
        <Menu.Item key="others">
          <Link to="/others"> Meals/Tests </Link>
        </Menu.Item>
        <Menu.Item key="links">
          <Link to="/links"> More Links </Link>
        </Menu.Item>
      </SubMenu>
    </Menu>
  );
};

const NavigationMenu = ({history}) => {
  
  const [route, setRoute]= useState("oxygen");

  useEffect(()=> {
    history.listen(({pathname}) => setRoute(pathname.substr(1)));
  },[history]);


  return <GuestNavigation route={route}/>;
};

export default NavigationMenu;
