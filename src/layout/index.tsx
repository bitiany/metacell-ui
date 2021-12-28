import { useEffect, useRef } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Layout, BackTop } from "antd";
import { useStorage } from '@/redux'
import { StaticMenu } from '@/store/menu'
import classNames from 'classnames'
import Asider from "./Asider";
import Header from "./Header";
import TabPanes from './TabPanes'
import { at, queryParam } from '@/utils/toolkit'
import styles from './module/Home.module.less'

const uri_parse = (url: string) => {
  return url?.split('?')[0]
}

const menu = StaticMenu.Menus
const noNewTab = ['/login']
const MainLayout = (props: any) => {
  const navigate = useNavigate();
  const pathRef: any = useRef<string>('')
  const { pathname, search } = useLocation()
  const [collapsed, menuClick] = useStorage("menuToggle", "collapsed")
  const [panes, addTabPane] = useStorage("addTabPane", "panes")
  const [selectedKeys, setSelectedKeys] = useStorage("setSelectedKeys", "selectedKeys")
  const [userInfo, setUserInfo] = useStorage("setUserInfo")
  useEffect(() => {
    if (noNewTab.includes(pathname)) {
      return
    }
    if (!userInfo.token) {
      navigate("/login")
    }
    const para = queryParam(search) || {}
    const pane = panes?.filter((p: any) => (uri_parse(p.path) === pathname && (!para["apiKey"] || para["apiKey"] ===  p.key)))[0]
    if (pane) {
      if (pathRef.current !== pathname + search) {
        setSelectedKeys([pane.key])
      }
    } else {
      let item = at.find(menu, (m: any) => (uri_parse(m.path) === pathname && (!para["apiKey"] || para["apiKey"] ===  m.apiKey)), "children")
      if (!item || selectedKeys?.includes(item.apiKey)) { return }
      addTabPane([{
        title: item.label,
        key: item.apiKey,
        content: item.component,
        closabled: true,
        path: item.path
      }], "add")
    }
    pathRef.current = pathname + search
  })
  const loginOut = () => {
    setUserInfo({ userName: null, token: null, permission: [] })
    setSelectedKeys(["dashboard"])
    addTabPane([], "clear")
    navigate("/login")
  }
  return (
    <Layout className={styles.container} style={{ display: pathname.includes('/login') ? 'none' : 'flex' }}>
      <BackTop />
      <Asider menuToggle={collapsed} menu={menu} />
      <Layout className={classNames(styles.content)}>
        <Header collapsed={collapsed} menuClick={menuClick} loginOut={loginOut} />
        <Layout.Content>
          <TabPanes defaultActiveKey="dashboard" activeKey={selectedKeys ? selectedKeys[0] : null} {...props} />
        </Layout.Content>
      </Layout>
    </Layout>
  );
}
export default MainLayout;