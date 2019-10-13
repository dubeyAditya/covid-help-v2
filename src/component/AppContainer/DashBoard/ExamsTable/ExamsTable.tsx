import * as React from "react";

import { Table, Divider, Tag } from "antd";
/** Stylesheet Imports */
import "./ExamsTable.scss";

// import json from "../../../../store/exams";

const { Column } = Table;

const exams: any = [];

export interface Props {
  children?: React.ReactNode;
}

export interface State {}

export default class ExamsTable extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {};
  }

  componentDidMount() {
    //fetch data from firebase
  }

  render() {
    return (
      <Table dataSource={exams}>
        <Column title="Exam Name" dataIndex="name" key="name" />
        <Column title="Subject" dataIndex="subject" key="subject" />
        <Column title="Topic" dataIndex="topic" key="topic" />
        <Column
          title="Medium"
          dataIndex="medium"
          key="medium"
          render={tags => (
            <span>
              {tags.map((tag: any) => (
                <Tag color="blue" key={tag}>
                  {tag}
                </Tag>
              ))}
            </span>
          )}
        />
        <Column
          title="Action"
          key="action"
          render={(text, record: any) => (
            <span>
              <a href="/myExams">View</a>
              <Divider type="vertical" />
              <a href="/myExams">Delete</a>
            </span>
          )}
        />
      </Table>
    );
  }
}
