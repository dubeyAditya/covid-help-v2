import React, { useContext, useEffect, useState } from 'react';
import { Table } from "antd";
import { appContext } from '../../../../context';
const { Column } = Table;
const ResourceList = ({ id }) => {
    const appState = useContext(appContext);

    const [resources, setResource] = useState([]);

    useEffect(() => {
        id && setResource(appState[id]);
        console.log(id);
    }, [id, appState]);


    return id && id === "links"
        ? <Table dataSource={resources} >
            <Column title="Links" dataIndex="Links" key="link" render={(text)=> <a href={text}  rel="noopener noreferrer" target="_blank" title={text}>{text}</a> } />
            <Column title="Resource" dataIndex="Resource" key="resource" />
            <Column title="State_City" dataIndex="State_City" key="city" />
        </Table>
        : <Table dataSource={resources} >
            {resources[0] && Object.keys(resources[0]).map((key) => <Column title={key} dataIndex={key} key={key} />)}
        </Table>
}

export default ResourceList;