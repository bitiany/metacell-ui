import { useState } from "react";
import { Table, Space } from "antd";

import { MetaTableProps, MetaItem } from "@/core/types"
import MetaTableHeader from './MetaTableHeader'
import { filterDropdown } from './Filter'
import "@/assets/table.less";
const MetaTable = (props: MetaTableProps) => {
  const { title, preference, data, pagination } = props;
  const [selectedKeys, setSelectedKeys] = useState<string[]>((props.columns || [])
    .filter((col) => col.selected)
    .map((col: any) => col.apiKey))
  const getColumnSearchProps = (item: MetaItem) => ({
    filterDropdown: item.filterabled
      ? ({ setSelectedKeys, selectedKeys, confirm, clearFilters }: any) => {
        return filterDropdown({
          ...item,
          setSelectedKeys,
          confirm,
          clearFilters,
        });
      }
      : null,
  });
  const setItem = (item: MetaItem) => {
    return {
      ...item,
      title: item.label,
      ellipsis: true,
      dataIndex: item.apiKey,
      key: item.apiKey,
      sorter: item.sortabled,
      fixed: item.primaryProperty ? true : false,
      width: item.primaryProperty ? 150 : 100,
      ...getColumnSearchProps(item),
      // render: (text, record) => this.format(item, text, record),
    };
  }
  const onChange = (pagination: any, filters: any, sorter: any, extra: any) => {
    if (props.onChange) {
      props.onChange(pagination, filters, sorter, extra)
    }
  }

  const columns = (props.columns || [])
    .filter((col) =>
      selectedKeys.find((key) => key === col.apiKey)
    )
    .map((col: any) => setItem(col));
  return (
    <div className="meta-table-wrapper">
      <div className="meta-table-wrapper-header">
        <div className="meta-table-wrapper-header-left">
          <div className="meta-table-wrapper-header-title">
            {title}
          </div>
          {preference && <MetaTableHeader
            columns={props.columns}
            setSelectedKeys={(selectedKeys: string[]) =>
              setSelectedKeys([...selectedKeys])
            }
          />}
        </div>
        <div className="meta-table-wrapper-header-right">
          <Space>
            {/* {this.props.buttons?.map((button) =>
                MetaButton(button, this.props.apiKey)
              )} */}
          </Space>
        </div>
      </div>
      <div className="meta-table-wrapper-table">
        <div className="meta-table">
          <Table
            dataSource={data}
            columns={columns}
            onChange={onChange}
            pagination={{ ...pagination }}
            scroll={{ x: true }}
            bordered
            sticky
          ></Table>
        </div>
      </div>
    </div>
  )
}

export default MetaTable