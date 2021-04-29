import { Card, Empty, Descriptions, Tag, Divider } from 'antd';
import React, { useContext, useState, useEffect } from 'react';
import { appContext } from "../../../../context/AppContext";
import { GridWrapper } from "./style";

const OxygenCards = ({ data }) => {


  const getCard = (row, index) => {
    return <><Descriptions key={row["State/City"]+ index}
      title={<Tag color="#87d068"> Resource for {row["State_City"]} </Tag> }
      bordered
      column={{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}
    >
      <Descriptions.Item label="State/City">{row["State_City"] || "N/A"}</Descriptions.Item>
      <Descriptions.Item label="Availability">{row["Availability"] === "Available" ? <Tag color="#87d068"></Tag> : "N/A"}</Descriptions.Item>
      <Descriptions.Item label="Verified">{row["Verified_Unverified"] || "N/A"}</Descriptions.Item>
      <Descriptions.Item label="Details">
        {row.Contact}
      </Descriptions.Item>
      <Descriptions.Item label="Time">{row["Timestamp"] || "N/A"}</Descriptions.Item>
      <Descriptions.Item label="Remarks">{
        row["Remarks"]
      }</Descriptions.Item>
    </Descriptions>
    { index !== data.length && <Divider></Divider> }
    </>
    
  }


  return data.map(getCard);
}





const ResourceGrid = ({ id }) => {

  const { search: appState } = useContext(appContext);

  const [resources, setResource] = useState([]);



  useEffect(() => {
    id && setResource(appState[id]);
    console.log(id);
  }, [id, appState]);


  const renderGrid = () => {
    switch (id) {
      case "oxygen":
      case "beds":
      case "remdesivir":
      case "fabiflu" : 
      case "others": 
      case "plasma":    
      return <OxygenCards data={resources}></OxygenCards>

      default:
        return <Empty></Empty>;
    }
  }


  return <GridWrapper> {renderGrid()} </GridWrapper>
}

export default ResourceGrid;
