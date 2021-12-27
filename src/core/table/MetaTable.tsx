import { useState } from "react";
import {useLocation, useNavigate} from 'react-router-dom'
import { Table, Space } from "antd";
import { MetaTableProps, MetaItem, ItemType } from "@/core/types"
import MetaTableHeader from './MetaTableHeader'

import * as Formats from '@/core/format'
import { filterDropdown } from './Filters'
import { useStorage } from '@/redux'
import "@/assets/table.less";

const MetaTable = (props: MetaTableProps) => {
  const navigate = useNavigate()
  const { title, preference, data, pagination } = props;
  const [selectedKeys, setSelectedKeys] = useState<string[]>((props.columns || [])
  .filter((col) => col.selected)
  .map((col: any) => col.apiKey))
  const [panes, addTabPane] = useStorage("addTabPane", "panes")
  const { pathname } = useLocation()
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

  const onChange = (pagination: any, filters: any, sorter: any, extra: any) => {
    console.log(filters)
    if (props.onChange) {
      props.onChange(pagination, filters, sorter, extra)
    }
  }
  const navigateComp = (nav: any) =>{
    const {item} = nav
    if(nav.redirect){
      navigate(props.redirect, {state: {...nav.record}})
    }else{
      const pane = panes?.filter((p: any) => p.key === item.apiKey)[0]
      const path = pane? pane.path : pathname + "/" + item.component + "?" + item.apiKey + "=" + nav.record[item.apiKey]
      navigate(path, {state: {...nav.record}})
      if(pane){
        return
      }
      addTabPane([{
        title: item.label,
        key: item.apiKey,
        content: item.component,
        closabled: true,
        path: path
      }], "add")
    }
  }
  const format = (item: MetaItem, text: any, record: any) => {
    const format = ItemType[item.itemType] + "Format";
    if (item.primaryProperty) {
      return (<span
        className="meta-table-primary"
        onClick = {() => navigateComp({redirect: props.redirect, item: item, record: record})}
      >
        {Formats.default[format](item, text, record)}
      </span>)
    }
    return Formats.default[format](item, text, record);
  };
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
      render: (text:any, record:any) => format(item, text, record),
    };
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