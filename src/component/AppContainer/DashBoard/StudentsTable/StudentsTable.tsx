import * as React from "react";

/** Stylesheet Imports */
import "./StudentsTable.scss";

import { Table, Divider, Tag } from "antd";

import json from "../../../../store/students";

const { Column, ColumnGroup } = Table;

const { students } = json;

export interface Props {
  children?: React.ReactNode;
}

export interface State {}

export default class StudentsTable extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <Table dataSource={students}>
        <ColumnGroup title="Name">
          <Column title="First Name" dataIndex="firstName" key="firstName" />
          <Column title="Last Name" dataIndex="lastName" key="lastName" />
        </ColumnGroup>
        <Column title="Class" dataIndex="class" key="class" />
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
        <Column title="Address" dataIndex="address" key="address" />
        <Column
          title="Action"
          key="action"
          render={(text, record: any) => (
            <span>
              <a href="/students">View {record.firstName}</a>
              <Divider type="vertical" />
              <a href="/students"> Delete</a>
            </span>
          )}
        />
      </Table>
    );
  }
}
