import React from "react";
import { Switch } from "antd";

interface Ipops {
    isLoading: boolean;
    enabled: boolean;
    changeAccess: any;
}

const CustonSwitch: React.FC<Ipops> = ({ isLoading, enabled, changeAccess }) => {

    return (
        <div> <Switch size="small" loading={isLoading} checked={enabled} onChange={changeAccess} /></div>
    )

}

export default CustonSwitch;
