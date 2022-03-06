import { useState, useEffect } from "react";
import { Select } from "antd";
import api from "@/api";
import {evil} from '@/utils/toolkit'
import { useRequest } from '@/utils/requests';
const { Option } = Select;
const MetaDropdown = (props:any) => {
    const [select,setSelect] = useState<any>()
    const request = useRequest()
    const {allowClear, width, loadData, param, control, data} = props
    useEffect(()=> {
      const onChange = (value: any, obj: any) => {
        let data = {};
        data[props.apiKey] = value;
        props.setFieldValue(data, true);
      };
      const renderSelect =(options:any[], defaultValue?: any)=> {
        if(defaultValue){
          let data = {};
          data[props.apiKey] = defaultValue;
          props.setFieldValue(data, true);
        }
        return (
          <Select allowClear={allowClear} onChange={onChange} style={{minWidth: width || "250px"}} defaultValue={defaultValue} placeholder={"请选择"}>
          {options && Array.isArray(options) && options?.map((option) => (
            <Option key={option.code} value={option.code}>
              {option.name}
            </Option>
          ))}
        </Select>
        )
      }  
      if(data && Array.isArray(data)){
        setSelect(renderSelect(data, data.filter((d:any) => d.default)[0].code))  
      }else{
        if ((loadData || loadData === null)) {
          setSelect(null)
          let defaultValue = data.id 
          const format =control?.format ? evil(control.format) : (data:any) => data;
          request(api(control.apiKey).list(param)).then((resp: any) => {
            const data = resp.result?.map((r:any, index: number) => {
              return format(r, index)
            })
            setSelect(renderSelect(data, defaultValue))  
          })   
        }
      }
      return () => {console.log()}
      // eslint-disable-next-line
    }, [param])
    return select || <div></div>;
  }
export default MetaDropdown;