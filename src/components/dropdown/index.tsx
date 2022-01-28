import { useState } from "react";
import {Select } from "antd";
import api from "@/api";
import {toCamelCase} from '@/utils/toolkit'

const { Option } = Select;
const MetaDropdown = (props:any) => {
    const [options, setOptions] = useState([{ code: "", name: "" }]);
    const [initialState, setInitialState] = useState(false);

    if (!initialState) {
      setInitialState(true);
      api().list(props.apiKey).then((resp: any) => {
        setOptions(resp.result?.map((r:any) => {
          if(props.control?.format){
            return props.control?.format(r)
          }
          return r
        }))
      })
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
          <Option key={option.code} value={option.name}>
            {option.name}
          </Option>
        ))}
      </Select>
    );
  }
export default MetaDropdown;