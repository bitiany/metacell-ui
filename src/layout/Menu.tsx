import { Menu } from "antd";
import * as Icons from "@ant-design/icons";
import { Link } from 'react-router-dom';
import { IMenu } from '@/store/types';
import { useStorage } from '@/redux'
import { queryParam } from '@/utils/toolkit';
type MenuProps = {
  theme?: string;
  menus: IMenu[];
};

const renderMenuItemIcon = (icon: string) => {
  const Icon = Icons[icon];
  return <Icon />;
};

const renderMenuItem = (item: IMenu) => {
  const idx = item.path?.indexOf("?") || -1;
  const path = item.path?.substring(0, (idx > -1 ? idx : item.path?.length));
  return (
    item.hidden ? null : <Menu.Item
      key={item.apiKey}
      icon={item.icon ? renderMenuItemIcon(item.icon) : null}
    >
      <Link to={path || item.apiKey} state={{ ...queryParam(item.path || "") }}>
        {<span className="nav-text">{item.label}</span>}
      </Link>
    </Menu.Item>
  )
};

const renderSubMenu = (item: IMenu) => {
  return (
    <Menu.SubMenu
      key={item.apiKey}
      title={item.label}
      icon={item.icon ? renderMenuItemIcon(item.icon) : null}
    >
      {item.children?.map((child) => {
        return child.children ? renderSubMenu(child) : renderMenuItem(child)
      }
      )}
    </Menu.SubMenu>
  );
};

const MenuComp = (props: MenuProps) => {
  const [selectedKeys] = useStorage("setSelectedKeys", "selectedKeys")
  const menus = JSON.parse(JSON.stringify(props.menus))
  return (
    <Menu
      mode='inline'
      theme={'dark'}
      defaultSelectedKeys={['dashboard']}
      selectedKeys={selectedKeys}
      style={{ borderRight: 0 }}
    >
      {menus!.map((item: any) => {
        item.children = item.children?.filter((it:any) => !it.hidden).sort((l:any, r:any) => {
          if (l.sort && r.sort) {
            return l.sort - r.sort
          }
          return 0;
        })
        return item.children && item.children.length > 0 ? renderSubMenu(item) : renderMenuItem(item)
      }
      )}
    </Menu>
  )
}

export default MenuComp