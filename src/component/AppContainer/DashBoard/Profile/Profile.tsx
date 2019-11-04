import * as React from "react";
import { Alert, Empty, Divider, Button } from 'antd';
import { AuthContext } from "../../../../store";

import "./Profile.scss";
const Profile = () => {
  
    const {user} = React.useContext(AuthContext);

    return (
        <div>
            <Alert
                message={`Welcome ${user.displayName}`}
                description="You are not registerd with Newton Academy. Please Register below !"
                type="info"
                showIcon
            />
            <div className="register-btn">
            <Button type='primary' block>Register</Button>
            </div>
            <Divider></Divider>
            <Empty></Empty>
        </div>
    )
}
export default Profile;