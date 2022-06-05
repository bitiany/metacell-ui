import React, {  } from 'react';
import { Layout, Menu } from 'antd';
const { Header} = Layout;


const Application:React.FC = (props:any) => {
    console.log(props)
    // const [menu, setMenu] = useState<any>([])
    // const items = [
    //   { label: '菜单项一', key: 'item-1' }, // 菜单项务必填写 key
    //   { label: '菜单项二', key: 'item-2' },
    //   {
    //     label: '子菜单',
    //     key: 'submenu',
    //     children: [{ label: '子菜单项', key: 'submenu-item-1' }],
    //   },
    // ];
    return (<div>
      <Layout className="layout">
      <Header>
      <div className="logo" />
      <Menu
        theme="dark"
        mode="horizontal"
        defaultSelectedKeys={['2']}
      ><Menu.Item>菜单项一</Menu.Item>
      <Menu.Item>菜单项二</Menu.Item></Menu>
    </Header>
      </Layout>
    </div>)
}
export default Application