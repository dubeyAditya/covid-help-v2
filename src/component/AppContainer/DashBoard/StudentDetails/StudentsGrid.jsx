import React, { useState } from "react";
import { Card, Icon, Switch, Tooltip } from "antd";
import { GridWrapper } from "./style";
import { Student } from "../../../../models/user.model";

const Grid = ({ students, changeAccess, isLoading }: any) => {

  const [loading, setLoading] = useState(false);


  const toggleAccess = (student:Student) => (value:any) =>{
    setLoading(true);
    changeAccess(student)(value);
  }


  const getCardList = (student: Student) => (
    <Card
      size="small"
      hoverable
      key={student.uid}
      cover={<img alt="user" src={student.photoURL} />}
      actions={[
        <Tooltip placement='bottom' title='Details'><Icon type="eye" key="details" /></Tooltip>,
        <Tooltip placement='bottom' title="Edit"><Icon type="edit" key="edit" /></Tooltip>,
        <Tooltip placement='bottom' title="Change Permission"> <Switch loading={loading && isLoading} size="small" checked={student.enabled} onChange={toggleAccess(student)} /></Tooltip>]} >
      <Card.Meta
        title={student.name}
        description={student.email}
      />
    </Card>
  );
  return <GridWrapper>{students.map(getCardList)}</GridWrapper>
};


export default Grid;
