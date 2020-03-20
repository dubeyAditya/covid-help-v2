import React, { useEffect, useState, useContext } from "react";

import { Table, Divider, Button, Icon, Skeleton, message, Popconfirm, Tooltip, Empty, Alert } from "antd";

/** Stylesheet Imports */
import "./ExamsTable.scss";

import api from "../../../../services";

import { appContext, AuthContext } from "../../../../store";

const { Column } = Table;


const ExamsTable = () => {

  const [exams, setExams] = useState([]);

  const [isReady, setIsReady] = useState(false);

  const { isAdmin, hasViewAccess } = useContext(appContext);

  const { user } = useContext(AuthContext);

  useEffect(() => {
    isAdmin
      ? api.get("exams").then(successCallback).catch(failiureCallback)
      : api.filter("exams", user.uid).then(successCallback).catch(failiureCallback);
  }, [isAdmin, user.uid]);

  const preview = (record: any) => () => {
    window.open(record.url);
  }

  const successCallback = (exams: []) => {
    setExams(exams);
    setIsReady(true);
  }

  const failiureCallback = (err: any) => {
    console.log("Error in Feating Exams :", err);
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
      <Popconfirm
        title="Are you sure delete this Exam?"
        onConfirm={discard(record)}
        okText="Yes"
        cancelText="No"
      >
        <Tooltip placement='bottom' title='Delete'>  <Button type="link"> <Icon type="delete" /></Button></Tooltip>
      </Popconfirm></>) : null;
  }

  return (
    <>
      {
        (!isAdmin && !hasViewAccess)
          ? <><Alert
            message={`Hello , ${user.displayName}`}
            description="You Don't have permission to view Exams for now. Please connect to your class Coordinator"
            type="info"
          /><Divider>
            </Divider>
            <Empty />
          </>
          : isReady
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
                      <Tooltip placement='bottom' title='View Exam'> <Button type="link" onClick={preview(record)}><Icon type="eye" key="details" /></Button> </Tooltip>
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
