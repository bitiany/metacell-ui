import { useCallback, useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from 'react-router-dom'
import { Table, Space, Button } from "antd";
import { RedoOutlined } from '@ant-design/icons'
import { MetaTableProps, MetaTableItem, ItemType } from "@/core/types"
import MetaTableHeader from './MetaTableHeader'
import { filterDropdown } from './Filters'
import { useStorage } from '@/redux'
import { useEvent } from '@/utils/hooks'
import * as Formats from '@/core/format'
import * as Controls from '@/components/control'
import "@/assets/table.less";

const MetaTable = (props: MetaTableProps) => {
  const navigate = useNavigate()
  const { title, preference, data, pagination } = props;
  const [selectedKeys, setSelectedKeys] = useState<string[]>([])
  const [panes, addTabPane] = useStorage("addTabPane", "panes")
  const { pathname } = useLocation()
  const showProvider = useEvent("showProvider", { title: "新增", container: "modal", apiKey: props.apiKey, data: {}, component: "form" })
  useEffect(() => {
    setSelectedKeys((props.columns || [])
      .filter((col) => col.selected)
      .map((col: any) => col.apiKey))
  }, [props.columns])
  

  const onChange = (pagination: any, filters: any, sorter: any, extra: any) => {
    if (props.onChange) {
      props.onChange(pagination, filters, sorter, extra)
    }
  }

  const navigateComp = (nav: any) => {
    const { item } = nav
    if (nav.redirect) {
      navigate(props.redirect, { state: { ...nav.record } })
    } else {
      const pane = panes?.filter((p: any) => p.key === item.apiKey)[0]
      const path = pane ? pane.path : pathname + "/" + item.control?.component + "?" + item.apiKey + "=" + nav.record[item.apiKey] + "&apiKey=" + item.control?.apiKey
      navigate(path, { state: { data: { ...nav.record }, apiKey: item.control?.apiKey } })
      if (pane) {
        return
      }
      addTabPane([{
        data: { ...nav.record }, apiKey: item.control?.apiKey,
        title: item.control?.title,
        key: item.apiKey,
        content: item.control?.component,
        closabled: true,
        path: path
      }], "add")
    }
  }
  
  let columns = useMemo(() => {
    const getColumnSearchProps = (item: MetaTableItem) => ({
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
      const format = (item: MetaTableItem, text: any, record: any) => {
        const format = ItemType[item.itemType] + "Format";
        if (item.primaryProperty) {
          return (<span
            className="meta-table-primary"
            onClick={() => navigateComp({ redirect: props.redirect, item: item, record: record })}
          >
            {Formats.default[format](item, text, record)}
          </span>)
        }
        return Formats.default[format](item, text, record);
      };
    const setItem = (item: MetaTableItem) => {
      return {
        ...item,
        title: item.label,
        ellipsis: true,
        dataIndex: item.apiKey,
        key: item.apiKey,
        sorter: item.sortabled,
        fixed: item.primaryProperty ? true : false,
        pagination: {
          defaultCurrent: 1,
          defaultPageSize: 10,
          pageSizeOptions: ["10", "20", "100"],
          ...props.pagination
        },
        ...getColumnSearchProps(item),
        render: (text: any, record: any) => format(item, text, record),
      }
    }
    return (props.columns || []).filter((col) =>
      selectedKeys.find((key) => key === col.apiKey)
    ).map((col: any) => setItem(col))
    // eslint-disable-next-line
  }, [selectedKeys]);

  const renderOperation = useCallback((operation: any[], text: any, record: any) => {
    if (operation?.length >= 3) {
    } else {
      return props.operation?.map(op => {
        const Component = Controls.default[op.type]
        return Component && <Component apiKey={props.apiKey} key={op.type} record={record} content={<Button type="dashed">{op.name}</Button>} emit={() => {onChange(pagination, null, null, null)}} />
      })
    }
    // eslint-disable-next-line
  }, [])
  const operate = props.operation ? [{
    title: "操作", key: "opt", width: 150,
    render: (text: any, record: any) => (
      <Space>
        {renderOperation(props.operation || [], text, record)}
      </Space>
    )
  }] : []
  return (
    <div className="meta-table-wrapper">
      <div className="meta-table-wrapper-header">
        <div className="meta-table-wrapper-header-left">
          <div className="meta-table-wrapper-header-title">
            <Space>{title}</Space><RedoOutlined style={{ marginLeft: "20px", marginTop: "2px" }} onClick={() => { onChange(pagination, null, null, null) }} />
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
            <Button type="primary" onClick={()=>{showProvider(() => { })}}>新增</Button>
          </Space>
        </div>
      </div>
      <div className="meta-table-wrapper-table">
        <div className="meta-table">
          <Table
            dataSource={data}
            columns={[...columns, ...operate]}
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