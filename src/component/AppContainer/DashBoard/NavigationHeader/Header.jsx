import React, { useContext } from "react";
import { Divider, Avatar, Dropdown, Menu, Icon } from "antd";
import { AuthContext } from "../../../../context";


const NavigationHeader = () => {

    const auth = useContext(AuthContext);

    const { displayName, photoURL } = auth.user;

    const menu = (<Menu>
        <Menu.Item key="1" onClick={auth.signOut}>
            <Icon type="poweroff" />
            Logout
        </Menu.Item>
    </Menu>);

    return (
        <div className="flex-center-all navigation-header">
            <div>
                
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