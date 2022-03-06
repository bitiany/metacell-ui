import { useEffect,useState} from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Layout, BackTop } from "antd";
import { useStorage } from '@/redux'
import Asider from "./Asider";
import Header from "./Header";
import TabPanes from './TabPanes'
import {getSystemByTenantId} from '@/api/tenant'
import { useRequest } from '@/utils/requests';

import styles from './module/Home.module.less'

const noNewTab = ['/login']
const MainLayout = (props: any) => {
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const [collapsed, menuClick] = useStorage("menuToggle", "collapsed")
  const [selectedKeys] = useStorage("setSelectedKeys", "selectedKeys")
  const [userInfo, setUserInfo] = useStorage("setUserInfo")
  const [system, setSystem] = useStorage("setSystem")
  const [systems, setSystems ] = useState<any[]>([])
  const [master, setMaster ] = useState<any[]>([])
  const request = useRequest()
  const loginOut = () => {
    setUserInfo({})
    window.localStorage.clear()
    setTimeout(() => {navigate("/login")}, 1000)
  }
  useEffect(() => {
    request(getSystemByTenantId()).then((resp:any) => {
      if(resp.success){
        const systems:any[] = resp.result.systems
        setSystems(systems.filter(sys => sys.systemId !== resp.result.masterSystem))
        setMaster(systems.filter(sys => sys.systemId === resp.result.masterSystem)[0])
      }
    })
  // eslint-disable-next-line
  }, [])
  useEffect(() => {
    if (noNewTab.includes(pathname)) {
      console.log(system)
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