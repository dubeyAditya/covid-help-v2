import * as React from "react";
import { Alert } from "antd";

export interface Props {
    children?: React.ReactNode
}


const RegistrationForm = () => {
    return (
        <div>
            <Alert
                message="Welcome Guest !!"
                description="You are not registerd with us Please contact Newton Academy."
                type="info"
                showIcon
            />
        </div>
    )
}

export default RegistrationForm;
