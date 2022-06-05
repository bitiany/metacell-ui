import React, { useState, useEffect, useCallback } from 'react'
import { JsonEditor as Editor } from 'jsoneditor-react';
// import 'jsoneditor/dist/jsoneditor.css'

/**
 * JsonEditor
 * @param {object} json 用于绑定的json数据
 * @param {func} onChange 变化时的回调
 * @param {func} getJson 为外部提供回去json的方法
 * @param {func} onError 为外部提供json格式错误的回调
 * @param {string} themeBgColor 为外部暴露修改主题色
 */
const MetaPage = (props: any) => {
  const [layout, setLayout] = useState<any>({})

  const { data } = props;
  useEffect(() => {
    console.log(data)
    if (data) {
      setLayout(data.type === "json" ? JSON.parse(data.config) : null)
    }
  }, [data])

  const renderJsonEdit = useCallback(() => {
    const value = {...layout}
    return value && JSON.stringify(value) !== "{}" ? <Editor
      value={value}
      onChange={handleChange}
    /> : null
  }, [layout])
  const handleChange = (e:any) => {
    console.log(e)
   }
  return (
    <div className="jsonEditWrap">
      {renderJsonEdit()}
    </div>
  );
}
export default MetaPage