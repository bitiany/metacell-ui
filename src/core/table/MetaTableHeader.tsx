import { UnorderedListOutlined } from "@ant-design/icons";
import { Popover, Checkbox, Space, Button } from "antd";

const CheckboxGroup = Checkbox.Group;

const renderTableHeader = (columns?: any, setSelectedKeys?: (v: string[]) => void) => {
  const options = columns?.map((col: any) => {
    return {
      label: col.label,
      value: col.apiKey,
      disabled: col.primaryProperty
    };
  });
  const selectedKeys = columns?.filter((col: any) => col.selected).map((col: any) => col.apiKey)
  const onChange = (list: any) => {
    setSelectedKeys && setSelectedKeys(list)
  }

  return (
    <div className="meta-table-header">
      <div className="meta-table-header-wrapper">
        <div className="meta-table-header-wrapper-title">
          选择列表中要展示的信息
        </div>
        <div className="meta-table-filter">
          <CheckboxGroup options={options} className="CheckboxGroup" defaultValue={selectedKeys} onChange={onChange} />
        </div>
        <div className="meta-table-header-wrapper-button">
          <Space><Button >重置</Button></Space>
        </div>
      </div>
    </div>
  )
}
const MetaTableHeader = (props: any) => {
  return (
    <div>
      <Popover
        placement="rightTop"
        trigger="click"
        content={renderTableHeader(props.columns, props.setSelectedKeys)}
      >
        <div className="meta-table-wrapper-header-icon">
          <UnorderedListOutlined />
        </div>
      </Popover>
    </div>
  );
};
export default MetaTableHeader;
