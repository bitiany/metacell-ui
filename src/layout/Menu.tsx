import React from "react";
import { Menu } from "antd";
import * as Icons from "@ant-design/icons";
import { Link } from 'react-router-dom';
import { IMenu } from '@/store/types';
import { useStorage } from '@/redux'

type MenuProps = {
  theme?: string;
  menus: IMenu[];
};

const renderMenuItemIcon = (icon: string) => {
  const Icon = Icons[icon];
  return <Icon />;
};

const renderMenuItem = (item: IMenu) => (
  item.hidden ? null : <Menu.Item
    key={item.apiKey}
    icon={item.icon ? renderMenuItemIcon(item.icon) : null}
  >
    <Link to={item.path || item.apiKey} >
      {<span className="nav-text">{item.label}</span>}
    </Link>
  </Menu.Item>
);

const renderSubMenu = (item: IMenu) => {
  if (item.children?.length === 0) {
    delete item.children
  }
  return (
    <Menu.SubMenu
      key={item.apiKey}
      title={item.label}
      icon={item.icon ? renderMenuItemIcon(item.icon) : null}
    >
      {item.children?.map((child) => {
        if (child.children?.length === 0) {
          delete child.children
        }
        child.children?.sort((l, r) => {
          if (l.sort && r.sort) {
            return l.sort - r.sort
          }
          return 0;
        })
        return child.children ? renderSubMenu(child) : renderMenuItem(child)
      }
      )}
    </Menu.SubMenu>
  );
};

const MenuComp = (props: MenuProps) => {
  const state = {
    menus: [...props.menus].sort((l, r) => {
      if (l.sort && r.sort) {
        return l.sort - r.sort
      }
      return 0;
    })
  };
  const [selectedKeys] = useStorage("setSelectedKeys", "selectedKeys")
  return (
    <Menu
      mode='inline'
      theme={'dark'}
      defaultSelectedKeys={['dashboard']}
      selectedKeys={selectedKeys}
      style={{ borderRight: 0 }}
    >
      {state.menus!.map((item: any) => {
        if (item.children?.length === 0) {
          delete item.children
        }
        return item.children ? renderSubMenu(item) : renderMenuItem(item)
      }
      )}
    </Menu>
  )
}

export default MenuComp