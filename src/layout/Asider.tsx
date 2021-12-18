import { Link } from 'react-router-dom'
import { Layout } from 'antd'
import { GithubOutlined } from "@ant-design/icons";
import Menu from './Menu';
import { useStorage } from '@/redux'
import styles from './module/Home.module.less'
const { Sider } = Layout

const AppAsider = (props: any) => {
  let { menuToggle, menu } = props
  const [state] = useStorage("changeTheme")
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
      <Menu menus={menu} theme={state.theme}/>
    </Sider>
  );
}

export default AppAsider;