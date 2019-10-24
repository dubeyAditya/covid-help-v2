import * as React from "react";
import { Drawer } from "antd";
/** Stylesheet Imports */
import "./ViewQuestions.scss";

export interface Props {
  children?: React.ReactNode;
  subject: string;
  showDrawer: boolean;
  hideDrawer: any;
  url: string;
  fileName: string;

}

const viewStyle = { width: "100%", maxHeight: "80vh" };


const ViewQuestions: React.FC<Props> = ({
  subject,
  showDrawer,
  hideDrawer,
  fileName,
  url
}) => {

  const getTypeOfFile = () => {
    return fileName ? fileName.split(".")[1] : null;
  }

  const previewFile = () => {
    const type = getTypeOfFile();
    switch (type) {
      case "pdf":
        return (<object style={viewStyle} data={url}> {fileName} </object>)
      case "jpg":
      case "png":
      case "jpeg":
        return (<img style={viewStyle} src={url} alt={fileName}></img>)
      default:
        return null;
    }
  }


  return (
    <div>
      <Drawer
        width={window.innerWidth / 2}
        title="Questions Preview"
        placement="right"
        closable={false}
        onClose={hideDrawer}
        visible={showDrawer}
      >
        <h1>{subject}</h1>
        {previewFile()}
      </Drawer>
    </div>
  );
};
export default ViewQuestions;
