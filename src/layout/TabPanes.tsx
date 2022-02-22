import React, { FC,useRef, useState, useEffect, useMemo } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Tabs, Dropdown, Alert, Spin } from 'antd'
import { SyncOutlined } from '@ant-design/icons'
import { useStorage } from '@/redux'
import TabMenu from './TabMenu';
import Components from "@/page";
import { at,queryParam } from '@/utils/toolkit'
import getComponent from '@/components';
import style from './module/TabPanes.module.less'
interface Props {
  defaultActiveKey?: string;
  panes?: any;
  activeKey?: string
}
const uri_parse = (url: string) => {
  return url?.split('?')[0]
}
const { TabPane } = Tabs;

const TabPanes: FC<Props> = (props: any) => {
  const {
    activeKey,
    defaultActiveKey,
  } = props
  const pathRef: any = useRef<string>('')
  const { pathname, search } = useLocation()
  const navigate = useNavigate();
  const [isReload, setIsReload] = useState<boolean>(false)
  const [panes, addTabPane] = useStorage("addTabPane", "panes")
  const [menus] = useStorage("setMenus")
  const [selectedKeys, setSelectedKeys] = useStorage("setSelectedKeys", "selectedKeys")
  const para:any = useMemo(() => {
    return queryParam(search) || {}
  }, [search])
  const {apiKey} = para

  const pane = panes?.filter((p: any) => (uri_parse(p.path) === pathname && (!apiKey || apiKey === p.key)))[0]
  let item = at.find(menus, (m: any) => (uri_parse(m.path) === pathname && (!apiKey || apiKey === m.apiKey)), "children")
  useEffect(() => {
    if (pane) {
      if (pathRef.current !== pathname + search) {
        setSelectedKeys([pane.key])
      }
    } else {
      if (!item || selectedKeys?.includes(item.apiKey)) { return }
      addTabPane([{
        title: item.name,
        key: item.apiKey,
        content: item.component,
        closabled: true,
        path: item.path
      }], "add")
    }
    pathRef.current = pathname + search
  })

  const onEdit = (targetKey: any, action: any) => {
    switch (action) {
      case 'remove':
        let idx = at.indexOf(panes, (pane: any) => targetKey === pane.key)
        at.remove(panes, (pane: any) => targetKey === pane.key)
        addTabPane(panes, "remove")
        if (selectedKeys.includes(targetKey)) {
          navigate(panes[idx - 1].path)
          setSelectedKeys([panes[idx - 1].key])
        }
        break;
      case 'other':
        const i = at.indexOf(panes, (pane: any) => targetKey === pane.key)
        const pane = panes[i]
        panes.splice(1, panes.length - 1)
        if (pane.key !== 'dashboard') {
          panes.push(pane)
        }
        addTabPane([], "clear")
        navigate(pane.path)
        break;
      case 'all':
        panes.splice(1, panes.length - 1)
        addTabPane([], "clear")
        navigate(panes[0].path)
        break;
      default:
    }
  }
  const onTabClick = (targetKey: any) => {
    const pane = panes.filter((p: any) => p.key === targetKey)[0]
    if (pane) {
      const [parent, item] = at.findParent(menus, (m: any) => m.apiKey === targetKey, "children")
      navigate(pane.path)
      setSelectedKeys(item ? [item.apiKey, parent.apiKey] : [pane.key])
    }
  }
  // 阻止右键默认事件
  const preventDefault = (e: any, panel: object) => {
    e.preventDefault()
  }
  // 刷新当前 tab
  const refreshTab = (): void => {
    setIsReload(true)
    setTimeout(() => {
      setIsReload(false)
    }, 1000)
  }

  return (<div>
    <Tabs activeKey={activeKey} defaultActiveKey={defaultActiveKey}
      className={style.tabs}
      hideAdd
      onEdit={onEdit}
      onTabClick={onTabClick}
      type="editable-card">
      {
        panes?.map((pane: any) => {
          const tabMenu = TabMenu({ ...props, pane: pane, onEdit, refreshTab })
          let Component = pane.content && Components[pane.content]
          Component = Component || getComponent({ name: pane.content?.toLowerCase(), state: {} })
          return Component && (
            <TabPane tab={
              <Dropdown overlay={tabMenu} placement="bottomLeft" trigger={['contextMenu']}>
                <span onContextMenu={(e) => preventDefault(e, pane)}>
                  {isReload &&
                    selectedKeys?.includes(pane.key) &&
                    pane.path !== '/403' && (
                      <SyncOutlined title="刷新" spin={isReload} />
                    )}
                  {pane.title}
                </span>
              </Dropdown>
            } key={pane.key} closable={pane.closabled} >
              {!isReload && selectedKeys?.includes(pane.key) ? (
                <div className={"content"} style={{ paddingTop: 10,minHeight:"88vh" }}>
                  <React.Suspense fallback={<div>loading...</div>}>
                    <Component {...pane}/>
                  </React.Suspense>
                </div>
              ) : (
                <div style={{ height: '100vh' }}>
                  <Spin spinning={isReload}>
                    <Alert message="刷新中..." type="info" />
                  </Spin>
                  
                </div>
              )}
            </TabPane>)
        })
      }
  </Tabs>
  </div >)
}
export default TabPanes