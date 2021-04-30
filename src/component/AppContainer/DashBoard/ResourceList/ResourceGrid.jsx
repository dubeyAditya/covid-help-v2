import { Empty, Descriptions, Tag, Divider } from 'antd';
import React, { useContext, useState, useEffect } from 'react';
import { appContext } from "../../../../context/AppContext";
import { GridWrapper,TitleWapeer } from "./style";

const getKey = (value) => value + Math.floor(Math.random() * 100);

const parseContact = (c) => {
  const phoneNumber = c.match(/\d{10}/g);
  const number = phoneNumber ? phoneNumber : ["Not Available"];
  return number;
} 

const getContats = (contact) => typeof contact === "number" ? [contact] : [...parseContact(contact)];

const getPhoneTag = (c) => {
  return (<>
  <Tag color="#87d068"> <a href={`tel:${c}`} > {c} </a> </Tag>
  </>)
}

const getTitle = (id, row) => <TitleWapeer><h3>{`Resource ${id} ${row["State_City"] ? `for ${row["State_City"]}` : "" }`}</h3></TitleWapeer>

const OxygenCards = ({ data, id }) => {


  const getCard = (row, index) => {
    

    return <>
      <Descriptions key={getKey(row["State_City"])}
        title={getTitle(id, row)}
        bordered
        column={{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}
      >
        <Descriptions.Item label="State/City">{row["State_City"] || "N/A"}</Descriptions.Item>
        <Descriptions.Item label="Availability">{row["Availability"] === "Available" ? <Tag color="#87d068"> Yes </Tag> : "N/A"}</Descriptions.Item>
        <Descriptions.Item label="Verified">{row["Verified_Unverified"] === "Verified" ? <Tag color="#87d068"> Yes </Tag> : "N/A"}</Descriptions.Item>
        <Descriptions.Item label="Time">{row["Timestamp"] || "N/A"}</Descriptions.Item>
        <Descriptions.Item label="Contact">
          {getContats(row.Contact).map(getPhoneTag)}
        </Descriptions.Item>
        <Descriptions.Item label="Details">
          {row.Contact}
        </Descriptions.Item>

        <Descriptions.Item label="Remarks">{
          row["Remarks"]
        }</Descriptions.Item>
      </Descriptions>
      { index !== data.length && <Divider></Divider>}
    </>

  }


  return data.length ? data.map(getCard) : <Empty/>;
}





const ResourceGrid = ({ id }) => {

  const { search: appState } = useContext(appContext);

  const [resources, setResource] = useState([]);



  useEffect(() => {
    id && setResource(appState[id]);
  }, [id, appState]);


  const renderGrid = () => {
    switch (id) {
      case "oxygen":
      case "beds":
      case "remdesivir":
      case "fabiflu":
      case "others":
      case "plasma":
        return <OxygenCards key={getKey(id)} id={id} data={resources}></OxygenCards>

      default:
        return <Empty></Empty>;
    }
  }


  return <GridWrapper> {renderGrid()} </GridWrapper>
}

export default ResourceGrid;
