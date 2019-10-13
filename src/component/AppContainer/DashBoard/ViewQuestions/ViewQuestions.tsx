import * as React from "react";
import { Drawer, List } from "antd";
/** Stylesheet Imports */
import "./ViewQuestions.scss";

export interface Props {
  children?: React.ReactNode;
  questionList: [];
  subject: string;
  showDrawer: boolean;
  hideDrawer: any;
}
const ViewQuestions: React.FC<Props> = ({
  subject,
  showDrawer,
  hideDrawer,
  questionList
}) => {
  return (
    <div>
      <Drawer
        width={600}
        title="Questions Preview"
        placement="right"
        closable={false}
        onClose={hideDrawer}
        visible={showDrawer}
      >
        <List
          size="large"
          header={<h2>{subject}</h2>}
          bordered
          dataSource={questionList}
          renderItem={(item: any) => <List.Item>{item}</List.Item>}
        />
      </Drawer>
    </div>
  );
};
export default ViewQuestions;
