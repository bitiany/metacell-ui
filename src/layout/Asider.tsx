import {useEffect} from 'react'
import { Link } from 'react-router-dom'
import { Layout } from 'antd'
import { GithubOutlined } from "@ant-design/icons";
import Menu from './Menu';
import { useStorage } from '@/redux'
import { getMenuTree } from '@/api/menu';
import styles from './module/Home.module.less'
const { Sider } = Layout

const AppAsider = (props: any) => {
  let { menuToggle } = props
  const [state] = useStorage("changeTheme")
  // eslint-disable-next-line
  const [menus, setMenus] = useStorage("setMenus")
  const [tenant] = useStorage("setTenant")
  const {currentSystem} = tenant
  useEffect(() => {
    getMenuTree({ systemId: currentSystem }).then((resp: any) => {
      setMenus(resp.result)
    })
  // eslint-disable-next-line
  }, [currentSystem])

  return (
    <Sider collapsed={menuToggle} className={styles.aside}
      width={220}>
      <div className={styles.logo}>
        <Link to="/">
          <GithubOutlined style={{ fontSize: '3.2rem', color: '#fff' }} />
          {!menuToggle && <span style={{color:"#ffff", marginLeft:"10px"}}>MetaCell</span>}
        </Link>
      </div>
      <div style={{ marginBottom: "20px" }} />
      <Menu menus={menus} theme={state.theme}/>
    </Sider>
  );
}

export default AppAsider;