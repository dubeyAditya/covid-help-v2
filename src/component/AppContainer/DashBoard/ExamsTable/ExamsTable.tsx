import React, { useEffect, useState } from "react";

import { Table, Divider } from "antd";
/** Stylesheet Imports */
import "./ExamsTable.scss";


import api from "../../../../services";

const { Column } = Table;


const ExamsTable = () => {

  const [exams, setExams] = useState([]);

  useEffect(() => {
    api.get("exams").then((exams: []) => {
      setExams(exams);
    }).catch((err: any) => {
      console.log(err);
    });
  }, []);

  return (
    <Table dataSource={exams}>
      <Column title="Exam Name" dataIndex="name" key="name" />
      <Column title="Subject" dataIndex="subject" key="subject" />
      <Column title="Topic" dataIndex="topic" key="topic" />
      <Column
        title="Action"
        key="action"
        render={(text, record: any) => (
          <span>
            <a href="/myExams" >View</a>
            <Divider type="vertical" />
            <a href="/myExams">Delete</a>
          </span>
        )}
      />
    </Table>
  );
}
export default ExamsTable;
