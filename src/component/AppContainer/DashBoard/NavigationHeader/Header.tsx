import React, { useContext } from "react";
import { Breadcrumb, Divider, Avatar, Dropdown, Menu, Icon } from "antd";
import { AuthContext } from "../../../../store";


const NavigationHeader = () => {

    const auth = useContext(AuthContext);

    const {displayName, photoURL} = auth.user;

    const menu = (<Menu>
        <Menu.Item key="1" onClick={auth.signOut}>
            <Icon type="poweroff" />
            Logout
        </Menu.Item>
    </Menu>);

    return (
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
                <Dropdown overlay={menu}>
                    <Avatar src={photoURL}></Avatar>
                </Dropdown>
            </div>
        </div>
    )
}

export default NavigationHeader;