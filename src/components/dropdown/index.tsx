import { useState, useEffect } from "react";
import { Select } from "antd";
import api from "@/api";
import {toCamelCase} from '@/utils/toolkit'

const { Option } = Select;
const MetaDropdown = (props:any) => {
    const [initialState, setInitialState] = useState(false);
    const [select,setSelect] = useState<any>()
    
    useEffect(()=> {
      const {apiKey, allowClear, width, loadData, param, control, data, defaultSelected} = props
      const onChange = (value: any, obj: any) => {
        let data = {
          name: obj.children,
          apiKey: toCamelCase(value),
        };
        data[props.apiKey] = value;
        props.setFieldValue(data, true);
      };
      
      const renderSelect =(options:any[], defaultValue?: any)=> {
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
        if ((loadData || loadData === null)  && !initialState) {
          setInitialState(true);
          api(apiKey).list(param).then((resp: any) => {
            let defaultValue = defaultSelected 
            const data = resp.result?.map((r:any, index: number) => {
              if(control?.format){
                const op = control?.format(r, index)
                if(!defaultValue && op.default){
                  defaultValue =op.code
                }
                return op
              }
              return r
            })
            setSelect(renderSelect(data, defaultValue)   )  
          })   
        }
      }
      return () => {console.log()}
    }, [props, initialState])

    return select || (<div></div>);
  }
export default MetaDropdown;