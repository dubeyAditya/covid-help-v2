import React from "react";
import { Menu, Icon } from "antd";
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

const GuestNavigation = () => {
  return (
    <Menu
      mode="inline"
      defaultSelectedKeys={["1"]}
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
            <Icon type="laptop" />
            Resources
          </span>
        }
      >
        <Menu.Item key="1">
          <Link to="/oxygen"> Oxygen </Link>
        </Menu.Item>
        <Menu.Item key="2">
          <Link to="/beds"> Bed </Link>
        </Menu.Item>
        <Menu.Item key="3">
          <Link to="/remdesivir"> Remdesivir </Link>
        </Menu.Item>
        <Menu.Item key="4">
          <Link to="/fabiflu"> Fabiflu </Link>
        </Menu.Item>
        <Menu.Item key="5">
          <Link to="/plasma"> Plasma </Link>
        </Menu.Item>
        <Menu.Item key="6">
          <Link to="/others"> Meals/Tests </Link>
        </Menu.Item>
        <Menu.Item key="7">
          <Link to="/links"> More Links </Link>
        </Menu.Item>
      </SubMenu>
    </Menu>
  );
};

const NavigationMenu = () => {
  return <GuestNavigation />;
};

export default NavigationMenu;
