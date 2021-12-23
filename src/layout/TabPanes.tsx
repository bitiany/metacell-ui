
import { FC } from 'react'
import { useNavigate } from 'react-router-dom'
import { Tabs, Dropdown } from 'antd'
import TabMenu from './TabMenu';
import { useStorage } from '@/redux'
import style from './module/TabPanes.module.less'
import { StaticMenu } from '../store/menu';
import Components from "@/page";
import { at } from '@/utils/toolkit'
const { TabPane } = Tabs;

const menu = StaticMenu.Menus;
interface Props {
  defaultActiveKey?: string;
  panes?: any;
  activeKey?: string
}

const TabPanes: FC<Props> = (props) => {
  const {
    activeKey,
    defaultActiveKey,
  } = props

  const navigate = useNavigate();
  const [panes, addTabPane] = useStorage("addTabPane", "panes")
  const [selectedKeys, setSelectedKeys] = useStorage("setSelectedKeys", "selectedKeys")
  const onEdit = (targetKey: any, action: any) => {
    switch (action) {
      case 'remove':
        const idx = at.indexOf(panes, (pane: any) => targetKey === pane.key)
        at.remove(panes, (pane: any) => targetKey === pane.key)
        addTabPane(panes, "remove")
        if (selectedKeys.includes(targetKey)) {
          navigate(panes[idx - 1].path)
          setSelectedKeys([panes[idx - 1].key])
        }
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
  return (<div>
    <Tabs activeKey={activeKey} defaultActiveKey={defaultActiveKey}
      className={style.tabs}
      hideAdd
      onEdit={onEdit}
      onTabClick={onTabClick}
      type="editable-card">
      {
        panes?.map((pane: any) => {
          const tabMenu = TabMenu({...props, pane:pane, onEdit})
          const Component = pane.content && Components[pane.content]
          return Component && (
            <TabPane tab={
              <Dropdown overlay={tabMenu} placement="bottomLeft" trigger={['contextMenu']}>
                <span onContextMenu={(e) => preventDefault(e, pane)}>{pane.title}</span>
              </Dropdown>
            } key={pane.key} closable={pane.closabled} >
              <div style={{paddingTop: 10}}>
                <Component path={pane.path} />
              </div>
            </TabPane>)
        }
        )
      }
    </Tabs>

  </div>)
}
export default TabPanes