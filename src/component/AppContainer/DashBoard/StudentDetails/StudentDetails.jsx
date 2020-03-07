import React, { useEffect, useState } from "react";

import api from "../../../../services";

import { message, Table, Tooltip, Switch, Tag, Icon, Radio, Skeleton } from "antd";

import StudentsGrid from './StudentsGrid';

import { GridBodyWrapper, GridHeaderWrapper } from './style';
import Column from "antd/lib/table/Column";

const StudentsTable = () => {

  const [students, setStudents] = useState([]);

  const [isLoading, setIsLoading] = useState(false);

  const [isList, setList] = useState(true);

  const [isReady, setIsReady] = useState(false);

  const successCallback = (students) => {
    setStudents(students);
    setIsReady(true);
  }

  const errorCallBack = (err) => {
    console.error(err);
    setIsReady(true);
    message.error("Please Try After Sometime !");
  }

  const loadUsers = async () => {
    await api.get("users")
      .then(successCallback)
      .catch(errorCallBack);
  }

  const toggleView = (e) => {
    const isList = e.target.value === "list" ? true : false;
    setList(isList);
  }

  const changeAccess = (record) => (currentAccess) => {
    record.enabled = currentAccess;
    setIsLoading(true);
    api.update("users", record.key, record)
      .then(() => {
        setIsLoading(false);
        message.success(`Success..! Permission ${currentAccess ? 'Enabled' : 'Disabled'} for ${record.name}`);
        loadUsers();

      }).catch((err) => {
        setIsLoading(false);
        record.enabled = currentAccess;
        message.error("Unable to Change Permission !!");
        console.error(err);
      });
  }

  useEffect(() => {
    loadUsers();
    // eslint-disable-next-line
  }, []);

  return (
    isReady ? <>
      <GridHeaderWrapper>
        <div>
          <Radio.Group defaultValue="list" buttonStyle="solid" onChange={toggleView}>
            <Radio.Button value="list"> <Icon type="unordered-list" /></Radio.Button>
            <Radio.Button value="grid"> <Icon type="table" /></Radio.Button>
          </Radio.Group>
        </div>
      </GridHeaderWrapper>
      {isList ?
        <Table dataSource={students} size="small" loading={isLoading} pagination={{ pageSize: 20 }} scroll={{ y: 400 }}>
          <Column title="Name" dataIndex="name" key="name" />
          <Column title="Contact" dataIndex="phoneNumber" key="phoneNumber" />
          <Column title="Class" dataIndex="className" key="className" render={(text) => (text.length < 3 ? <Tag color="purple">{text} <sup>th</sup></Tag> : <Tag color="green">{text}</Tag>)} />
          <Column title="Course" dataIndex="course" key="course" />
          <Column title="Access" dataIndex="enabled" key="enabled"
            render={(text, record) => (
              <Tooltip placement='bottom' title="Change Permission"> <Switch size="small" checked={record.enabled} onChange={changeAccess(record)} /></Tooltip>
            )} />
        </Table>
        : <>
          <GridBodyWrapper>
            <StudentsGrid students={students} isLoading={isLoading} changeAccess={changeAccess}></StudentsGrid>
          </GridBodyWrapper>
        </>}
    </>
    : <Skeleton active />

  );
}

export default StudentsTable;
