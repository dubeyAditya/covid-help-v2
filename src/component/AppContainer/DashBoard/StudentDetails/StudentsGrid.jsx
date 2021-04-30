import React, { useState } from "react";
import { Card, Icon, Switch, Tooltip } from "antd";
import { GridWrapper } from "./style";


const Grid = ({ students, changeAccess, isLoading }) => {

  const [loading, setLoading] = useState(false);


  const toggleAccess = (student) => (value) =>{
    setLoading(true);
    changeAccess(student)(value);
  }


  const getCardList = (student) => (
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
