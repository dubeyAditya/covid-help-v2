import * as React from "react";

/** Stylesheet Imports */
import "./Login.scss";

import Icon from "antd/lib/icon";
import Card from "antd/lib/card";
import { Button } from "antd";

const Login = ({ signInWithGoogle }) => {
  return (
    <div className="login-wrapper">
      <Card
        style={{ width: 300 }}
        cover={<img alt="Covid Resourc Volenteer" src="/cvr.jpg" />}
      >
        <div className="btn-google">
          <Button type="primary" block onClick={signInWithGoogle}>
            <Icon type="google" />
            Login
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default Login;
