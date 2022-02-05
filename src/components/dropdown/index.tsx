import { useState } from "react";
import {Select } from "antd";
import api from "@/api";
import {toCamelCase} from '@/utils/toolkit'

const { Option } = Select;
const MetaDropdown = (props:any) => {
    const [options, setOptions] = useState([{ code: "", name: "" }]);
    const [initialState, setInitialState] = useState(false);
    const [defaultValue, setDefaultValue] = useState<string>("")
    if (!initialState) {
      setInitialState(true);
      console.log(props.apiKey)
      api(props.apiKey).list(props.apiKey).then((resp: any) => {
        setOptions(resp.result?.map((r:any, index: number) => {
          if(props.control?.format){
            const op = props.control?.format(r, index)
            if(op.default){
              setDefaultValue(op.code)
            }
            return op
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
    const {allowClear} = props
    console.log(defaultValue, options)
    return (
      <Select allowClear={allowClear} onChange={onChange} style={{minWidth: "150px"}} defaultValue={"aps"}>
        {options && options?.map((option) => (
          <Option key={option.code} value={option.code}>
            {option.name}
          </Option>
        ))}
      </Select>
    );
  }
export default MetaDropdown;