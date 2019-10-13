import * as React from "react";

/** Stylesheet Imports */
import "./Loading.scss";
import { Spin } from "antd";

const Loading = () => {
  return (
    <div className="loading-wrapper">
      {" "}
      <Spin tip="Loading..." />
    </div>
  );
};
export default Loading;
