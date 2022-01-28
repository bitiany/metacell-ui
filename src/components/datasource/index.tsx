import { useState } from "react";
import {Select } from "antd";
const { Option } = Select;
const Datasource = (props:any) => {
    const [options, setOptions] = useState([{ tableName: "", name: "" }]);
    const [initialState, setInitialState] = useState(false);

    const toCamelCase = function(str:string) {
      return str.replace("p_", "")
          .replace(/_(\w)/g, function($1, letter) { return letter.toUpperCase(); });
    }
    if (!initialState) {
      setInitialState(true);
      // getTableName()
      //   .then((obj: any) => {
      //     setOptions(obj.data);
      //   })
      //   .catch((data) => {
      //     console.log(data);
      //   });
    }
    const onChange = (value: any, obj: any) => {
      let data = {
        name: obj.children,
        apiKey: toCamelCase(value),
      };
      data[props.apiKey] = value;
      props.setFieldValue(data, true);
    };

    return (
      <Select allowClear onChange={onChange}>
        {options && options?.map((option) => (
          <Option key={option.tableName} value={option.tableName}>
            {option.name}
          </Option>
        ))}
      </Select>
    );
  }
export default Datasource;