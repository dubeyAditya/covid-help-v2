import * as React from "react";

import { Table, Divider } from "antd";
/** Stylesheet Imports */
import "./ExamsTable.scss";


import FirebaseAdapter from "../../../../firebase/FirebaseAuthAdapter";

const { Column } = Table;


export interface Props {
  children?: React.ReactNode;
}

export interface State {
  isLoading: boolean;
  exams: [];
}

export default class ExamsTable extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      isLoading: true,
      exams: []
    };
  }

  componentWillMount() {
    //fetch data from firebase
    const that = this;
    const db = FirebaseAdapter.firestore;
    let exams: any = [];
    db.collection("exams").get().then((querySnapshot: any) => {
      querySnapshot.forEach((doc: any) => {
        const exam = { key: doc.id, ...doc.data() }
        exams.push(exam);
        console.log(exams);
        that.setState({ exams })
      });
    });

  }

  viewQuestions = ()=> {
   // add code to view questions
  }

  render() {
    const {viewQuestions} = this;
    return (
      <Table dataSource={this.state.exams}>
        <Column title="Exam Name" dataIndex="name" key="name" />
        <Column title="Subject" dataIndex="subject" key="subject" />
        <Column title="Topic" dataIndex="topic" key="topic" />
        {/* <Column
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
        /> */}
        <Column
          title="Action"
          key="action"
          render={(text, record: any) => (
            <span>
              <a href="/myExams" onClick={viewQuestions}>View</a>
              <Divider type="vertical" />
              <a href="/myExams">Delete</a>
            </span>
          )}
        />
      </Table>
    );
  }
}
