import React,{ useEffect,useState} from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Layout, BackTop } from "antd";
import { useStorage } from '@/redux'
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
  const [userInfo, setUserInfo] = useStorage("setUserInfo")
  const [system, setSystem] = useStorage("setSystem")
  const [systems,setSystems ] = useState<any[]>([])
  const [master, setMaster ] = useState<any[]>([])
    
  const loginOut = () => {
    setUserInfo({})
    window.localStorage.removeItem("persist:root")
    setTimeout(() => {navigate("/login")}, 100)
  }
  useEffect(() => {
    setMaster(system.systems.filter((sys:any) => sys.id === system.systemId)[0])
    setSystems(system.systems.filter((sys:any) => sys.id !== system.systemId))
  // eslint-disable-next-line
  }, [])
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
      <Asider menuToggle={collapsed} master={master} emit={() => {setSystem({...master})}}/>
      <Layout className={styles.content}>
        <Header collapsed={collapsed} menuClick={menuClick} loginOut={loginOut} systems={systems}/>
        <Layout.Content>
          <TabPanes defaultActiveKey="dashboard" activeKey={selectedKeys ? selectedKeys[0] : null} {...props} />         
        </Layout.Content>
      </Layout>
    </Layout>
  );
}
export default MainLayout;