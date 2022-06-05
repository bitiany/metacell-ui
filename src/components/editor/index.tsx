import { useEffect, useState } from 'react'
import { Form } from 'antd'
import AceEditor from 'react-ace';
import 'ace-builds/src-noconflict/mode-jsx';// jsx模式的包
import 'ace-builds/src-noconflict/theme-monokai';// monokai的主题样式
import 'ace-builds/src-noconflict/ext-language_tools'; // 代码联想
const Editor = (props: any) => {
  const [value, setValue] = useState("")
  const { data, editabled } = props
  // const value = props.data[props.control.apiKey]
  useEffect(() => {
    setValue(data && data[props.control.apiKey])
    props.setFieldValue(data, false)
    // eslint-disable-next-line
  }, [props.data])
  const onChange = (value: any) => {
    let data = {}
    setValue(value)
    data[props.control.apiKey || ""] = value
    props.setFieldValue(data, false)
  }
  return (<div>
    <Form.Item name={props.control.apiKey} style={{ marginBottom: "20px" }} validateFirst={false}>
      <AceEditor
        mode='jsx'
        theme="monokai"
        fontSize={14}
        showPrintMargin
        height="850px"
        width="100%"
        showGutter
        onChange={value => onChange(value)}
        value={value}
        editorProps={{ $blockScrolling: true }}
        wrapEnabled
        highlightActiveLine  //突出活动线
        enableSnippets  //启用代码段
        setOptions={{
          enableBasicAutocompletion: true,   //启用基本自动完成功能
          enableLiveAutocompletion: true,   //启用实时自动完成功能 （比如：智能代码提示）
          enableSnippets: true,  //启用代码段
          showLineNumbers: true,
          tabSize: 2,
        }}
      // annotations={[{ row: 0, column: 2, type: 'error', text: 'Some error.' }]} // 错误，警告
      />
    </Form.Item>

  </div>)
}

export default Editor;