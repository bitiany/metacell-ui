import { useEffect} from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Layout, BackTop } from "antd";
import { useStorage } from '@/redux'
import classNames from 'classnames'
import Asider from "./Asider";
import Header from "./Header";
import TabPanes from './TabPanes'

import styles from './module/Home.module.less'
const noNewTab = ['/login']
const MainLayout = (props: any) => {
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const [collapsed, menuClick] = useStorage("menuToggle", "collapsed")
  const [selectedKeys] = useStorage("setSelectedKeys", "selectedKeys")
  const [userInfo] = useStorage("setUserInfo")

  const loginOut = () => {
    window.localStorage.clear()
    navigate("/login")
  }

  useEffect(() => {
    if (noNewTab.includes(pathname)) {
      return
    }
    if (!userInfo.accessToken) {
      navigate("/login")
    }
  })

  return (
    <Layout className={styles.container} style={{ display: pathname.includes('/login') ? 'none' : 'flex' }}>
      <BackTop />
      <Asider menuToggle={collapsed}/>
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