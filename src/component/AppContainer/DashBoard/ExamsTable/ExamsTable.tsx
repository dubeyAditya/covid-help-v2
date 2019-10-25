import React, { useEffect, useState } from "react";

import { Table, Divider, Button, Icon, Skeleton, message, Popconfirm } from "antd";

import ViewQuestions from "../ViewQuestions";

/** Stylesheet Imports */
import "./ExamsTable.scss";


import api from "../../../../services";


const { Column } = Table;


const ExamsTable = () => {

  const [exams, setExams] = useState([]);

  const [isVisible, setIsVisible] = useState(false);

  const [isReady, setIsReady] = useState(false);

  const [current, setCurrent] = useState({ fileName: "", subject: "", url: "" })

  useEffect(() => {



    api.get("exams").then((exams: []) => {
      setExams(exams);
      setIsReady(true);
    }).catch((err: any) => {
      console.log(err);
    });
  }, []);

  const preview = (record: any) => () => {
    const current = {
      subject: record.subject,
      url: record.url,
      fileName: record.file.fileName
    }
    setCurrent(current);
    setIsVisible(true);
  }

  const discard = (record: any) => () => {
    console.log(record);
    api.remove("exams", record.key).then(() => {
      message.success("Exam Deleted !")
      setExams(exams.filter((exam: any) => exam.key !== record.key))
    }).catch((err) => {
      message.error("Delete Failed !");
      console.error(err);
    });
  }

  return (
    <>
      {isReady
        ? (
          <Table dataSource={exams}>
            <Column title="Exam Name" dataIndex="name" key="name" />
            <Column title="Subject" dataIndex="subject" key="subject" />
            <Column title="Topic" dataIndex="topic" key="topic" />
            <Column
              title="Action"
              key="action"
              render={(text, record: any) => (
                <span>
                  <Button type="link" onClick={preview(record)}> <Icon type="eye" /></Button>
                  <Divider type="vertical" />
                  <Popconfirm
                    title="Are you sure delete this Exam?"
                    onConfirm={discard(record)}
                    okText="Yes"
                    cancelText="No"
                  >
                  <Button type="link"> <Icon type="delete" /></Button>
                  </Popconfirm>
                </span>
              )}
            />
          </Table>
        ) : (<Skeleton active />)
      }
      <ViewQuestions {...current} showDrawer={isVisible} hideDrawer={() => setIsVisible(false)} />
    </>
  );
}
export default ExamsTable;
