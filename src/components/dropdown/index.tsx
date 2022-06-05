import { useState, useEffect } from "react";
import { Select } from "antd";
import api from '@/api/api2'
import {evil} from '@/utils/toolkit'
import { useRequest } from '@/utils/requests';
const { Option } = Select;
const MetaDropdown = (props:any) => {
    const [select,setSelect] = useState<any>()
    const request = useRequest()
    const {apiKey, allowClear, width, loadData, param, control, data, editabled} = props
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
          <Select allowClear={allowClear} onChange={onChange} style={{minWidth: width || "250px"}} defaultValue={defaultValue} placeholder={"请选择"} disabled={!editabled}>
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
            let defaultValue = props.dataType === 10 ? data[apiKey]?.id : data[apiKey]
            const format =control?.format ? evil(control.format) : (data:any) => data;
            if(editabled){
              request(api.list(control.apiKey, param)).then((resp: any) => {
                const data = resp.result.records?.map((r:any, index: number) => {
                  return format(r, index)
                })
                setSelect(renderSelect(data, defaultValue))  
              })   
            }else{
              setSelect(renderSelect([{code: defaultValue, name: props.dataType === 10 ? data[apiKey]?.name : data[apiKey]}], defaultValue))  
            }
        }
      }
      return () => {console.log()}
      // eslint-disable-next-line
    }, [param])
    return select || <div></div>;
  }
export default MetaDropdown;