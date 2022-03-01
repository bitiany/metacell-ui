import {useEffect} from 'react'
import { Link } from 'react-router-dom'
import { Layout } from 'antd'
import * as Icons from "@ant-design/icons";
import Menu from './Menu';
import { useStorage } from '@/redux'
import { getMenuTree } from '@/api/menu';
import styles from './module/Home.module.less'
import { useRequest } from '@/utils/requests';
const { Sider } = Layout

const AppAsider = (props: any) => {
  let { menuToggle, master, emit } = props
  const [state] = useStorage("changeTheme")
  // eslint-disable-next-line
  const [menus, setMenus] = useStorage("setMenus")
  const [system] = useStorage("setSystem")
  const {systemId} = system
  const request = useRequest()
  useEffect(() => {
    if(systemId){
      request(getMenuTree({ systemId: systemId })).then((resp: any) => {
        setMenus(resp.result || [])
      })
    }
  // eslint-disable-next-line
  }, [systemId, request])

  const renderMenuItemIcon = (sys:any) => {
    if(!sys.icon){
      return null;
    }
    const Icon = Icons[sys.icon];
    return <Icon key={sys.systemId} onClick={() =>{}}/>;
  };
  return (
    <Sider collapsed={menuToggle} className={styles.aside}
      width={220}>
      <div className={styles.logo}>
        <Link to="/">
          {renderMenuItemIcon(master)}
          {!menuToggle && <span style={{color:"#ffff", marginLeft:"10px"}} onClick={()=>{emit()}}>{master.name}</span>}
        </Link>
      </div>
      <div style={{ marginBottom: "20px" }} />
      <Menu menus={menus || []} theme={state.theme}/>
    </Sider>
  );
}

export default AppAsider;