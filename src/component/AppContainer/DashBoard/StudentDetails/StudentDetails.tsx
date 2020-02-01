import React, { useEffect, useState } from "react";

import api from "../../../../services";

import {message, Table, Tooltip, Switch, Avatar, Tag } from "antd";

// import StudentsGrid from './StudentsGrid';

// import {GridBodyWrapper, GridHeaderWrapper} from './style';
import { Student } from "../../../../models/user.model";
import Column from "antd/lib/table/Column";

// import  CustomSwitch from "./Switch";

// const { Column } = Table;


const StudentsTable = () => {

  const [students, setStudents] = useState<Student[]>([]);

  const [isLoading, setIsLoading] = useState(false);

  const successCallback = (students: Student[]) => setStudents(students);
  

  const errorCallBack = (err: any) => {
    console.error(err);
    message.error("Please Try After Sometime !");
  }

  const loadUsers = async() => {
   await api.get("users")
      .then(successCallback)
      .catch(errorCallBack);
  }

  const changeAccess = (record: any) => (currentAccess:boolean) => {
    record.enabled = currentAccess;
    setIsLoading(true);
    api.update("users", record.key, record)
    .then(()=>{
      setIsLoading(false);
      message.success(`Success..! Permission ${currentAccess? 'Enabled' : 'Disabled'} for ${record.name}`);
      loadUsers();

    }).catch((err:any)=>{
      setIsLoading(false);
       record.enabled = currentAccess;
       message.error("Unable to Change Permission !!");
       console.error(err);
    });
  }

  useEffect(() => {
    loadUsers();
    // eslint-disable-next-line
  },[]);

  return (
  //  <>
  //   <GridHeaderWrapper>
  //     <Icon type="setting" key="setting" />
  //   </GridHeaderWrapper>
  //   <GridBodyWrapper>
  //       <StudentsGrid students={students} isLoading={isLoading} changeAccess={changeAccess}></StudentsGrid>
  //   </GridBodyWrapper>
  //  </>
   <Table dataSource={students} size="small" loading={isLoading}>
      <Column title="" dataIndex="photoURL" key="photoURL" render={(text,record:any)=>(<><Avatar src={record.photoURL}></Avatar></>)}/>
      <Column title="Name" dataIndex="name" key="name" />
      <Column title="Contact" dataIndex="phoneNumber" key="phoneNumber" />
      <Column title="Class" dataIndex="className" key="className" render={(text)=>(text.length < 3 ? <Tag color="purple">{text} <sup>th</sup></Tag> : <Tag color="green">{text}</Tag>)} />
      <Column title="Course" dataIndex="course" key="course" />
      <Column title="Access" dataIndex="enabled" key="enabled"
        render={(text, record: any) => (
          <Tooltip placement='bottom' title="Change Permission"> <Switch size="small" checked={record.enabled} onChange={changeAccess(record)} /></Tooltip>
        )} />
    </Table>
  );
}

export default StudentsTable;
