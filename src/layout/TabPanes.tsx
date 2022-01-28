import React, { FC, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Tabs, Dropdown, Alert, Spin } from 'antd'
import TabMenu from './TabMenu';
import { useStorage } from '@/redux'
import style from './module/TabPanes.module.less'
import { SyncOutlined } from '@ant-design/icons'
import { StaticMenu } from '../store/menu';
import Components from "@/page";
import { at } from '@/utils/toolkit'
import getComponent from '@/components';
const { TabPane } = Tabs;

const menu = StaticMenu.Menus;
interface Props {
  defaultActiveKey?: string;
  panes?: any;
  activeKey?: string
}

const TabPanes: FC<Props> = (props: any) => {
  const {
    activeKey,
    defaultActiveKey,
  } = props
  const navigate = useNavigate();
  const [isReload, setIsReload] = useState<boolean>(false)
  const [panes, addTabPane] = useStorage("addTabPane", "panes")
  const [selectedKeys, setSelectedKeys] = useStorage("setSelectedKeys", "selectedKeys")
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
      const [parent, item] = at.findParent(menu, (m: any) => m.apiKey === targetKey, "children")
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
          Component = Component || getComponent({ name: pane.content.toLowerCase(), state: {} })
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
                    <Component {...pane} />
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