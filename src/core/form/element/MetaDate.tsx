import { DatePicker } from "antd";
import moment from "moment";

const MetaDate = (props: any) => {
  const onChange = (value: any) => {
    let data = {}
    data[props.apiKey || ""] = moment(value).toDate().getTime()
    props.setFieldValue(data, false)
  }
  const placeholder = "请输入" + props.label;
  const showTime = props.extInfo?.dateType === 2;
  return (
    <div>
      <DatePicker
        allowClear
        name={props.apiKey}
        showTime={showTime}
        placeholder={placeholder}
        disabled={props.editabled}
        onChange={onChange}
        style={{ width: "100%" }}
      />

    </div>
  );
}

export default MetaDate;
