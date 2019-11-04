import React, { useEffect, useState } from "react";

import api from "../../../../services";
/** Stylesheet Imports */
import "./StudentsTable.scss";

import { Table, message } from "antd";

import  CustomSwitch from "./Switch";

const { Column } = Table;


const StudentsTable = () => {

  const [users, setUsers] = useState([]);

  const [isLoading, setIsLoading] = useState(false);

  const successCallback = (users: any) => {
    setUsers(users);
  }

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
      message.success(`Exams are ${currentAccess? 'Enabled' : 'Disabled'} for ${record.name}`);

    }).catch((err:any)=>{
      setIsLoading(false);
       record.enabled = currentAccess;
       message.error("Unable to Change Permission !");
       console.error(err);
    });
  }

  useEffect(() => {
    loadUsers();
    // eslint-disable-next-line
  },[]);

  return (
    <Table dataSource={users}>
      <Column title="Name" dataIndex="name" key="name" />
      <Column title="Access" dataIndex="enabled" key="enabled"
        render={(text, record: any) => (
          <CustomSwitch enabled={record.enabled} isLoading={isLoading} changeAccess={changeAccess(record)}></CustomSwitch>
        )} />
    </Table>
  );
}

export default StudentsTable;
