import React, { useContext, useState, useEffect } from "react";
import { Avatar, Dropdown, Menu, Icon, Select } from "antd";
import { appContext } from "../../../../context";
const { Option } = Select;

const Filter = () => {
  const { resources, setFilter } = useContext(appContext);
  const [locations, setLoactions] = useState({});

  function handleChange(value) {
    setFilter(value);
  }

  useEffect(() => {
    setLoactions(() => {
      return Object.keys(resources).reduce((result, ele) => {
        const more = (resources[ele] || []).reduce((res, item) => {
          return { ...res, [(item.State_City || "").toLowerCase()]: {} };
        }, {});
        return { ...result, ...more };
      }, {});
    });
    handleChange([]);
  }, [resources]);
  return (
    <div className="navigation-header">
      <div>State or City</div>
      <div>
        <Select
          mode="multiple"
          style={{ width: "100%" }}
          placeholder="select or type one location"
          defaultValue={[]}
          onChange={handleChange}
          optionLabelProp="label"
        >
          {Object.keys(locations).map((ele) => {
            return (
              <Option key={ele} value={ele} label={ele}>
                <div className="demo-option-label-item">{ele}</div>
              </Option>
            );
          })}
        </Select>
      </div>
    </div>
  );
};

export default Filter;
