import React, { useEffect, useState, useContext } from "react";

import { Table, Divider, Button, Icon, Skeleton, message, Popconfirm } from "antd";

/** Stylesheet Imports */
import "./ExamsTable.scss";

import api from "../../../../services";

import { appContext } from "../../../../store";


const { Column } = Table;


const ExamsTable = () => {

  const [exams, setExams] = useState([]);

  const [isReady, setIsReady] = useState(false);

  const { isAdmin } = useContext(appContext);

  useEffect(() => {
    api.get("exams").then((exams: []) => {
      setExams(exams);
      setIsReady(true);
    }).catch((err: any) => {
      console.log("Error in Feating Exams :", err);
    });
  }, []);

  const preview = (record: any) => () => {
    window.open(record.url);
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

  const getDeleteBtn = (record: any) => {
    return isAdmin ? (<>
      <Divider type="vertical" />
      <Popconfirm
        title="Are you sure delete this Exam?"
        onConfirm={discard(record)}
        okText="Yes"
        cancelText="No"
      >
        <Button type="link"> <Icon type="delete" /></Button>
      </Popconfirm></>) : null;
  }

  return (
    <>
      {
        isReady
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
                    {getDeleteBtn(record)}
                  </span>
                )}
              />
            </Table>
          )
          : <Skeleton active />
      }
    </>
  );
}
export default ExamsTable;
