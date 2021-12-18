import React from "react";
import { Menu, Dropdown, Layout, Badge, Avatar } from "antd";
import {
  UserOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  GithubOutlined,
  BellFilled,
  EditFilled,
  SettingFilled,
  LoginOutlined,
} from "@ant-design/icons";
import style from './module/Header.module.less'

const { Header } = Layout;

const AppHeader = (props: any) => {
  let { loginOut } = props;
  const menu = (
    <Menu>
      <Menu.ItemGroup title="用户设置">
        <Menu.Divider />
        <Menu.Item key="1">
          <EditFilled />
          个人设置
        </Menu.Item>
        <Menu.Item key="2">
          <SettingFilled />
          系统设置
        </Menu.Item>
      </Menu.ItemGroup>
      <Menu.Divider />
      <Menu.Item key="3">
        <span onClick={loginOut}>
          <LoginOutlined /> 退出登录
        </span>
      </Menu.Item>
    </Menu>
  );
  let { menuClick } = props
  const changeMenu = (
    <Menu>
      <Menu.Item key="dark" >
        <span>暗黑主题</span>
      </Menu.Item>
      <Menu.Item key="light">
        <span>亮白主题</span>
      </Menu.Item>
    </Menu>
  )
  return (
    <Header className={style.header}>
      <div className="toggleMenu">
        <div className="mr15">
          {React.createElement(
            props.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
            {
              className: "trigger",
              onClick: props.menuClick,
            }
          )}
        </div>
      </div>
      {/* <Breadcrumb /> */}
      <div className={style.right}>
        <div className="mr15" style={{ paddingTop: "5px" }}>
          <Dropdown overlay={changeMenu}  >
            <div title="更换主题" className="fr webTheme"></div>
          </Dropdown>
        </div>
        <div className="mr15" style={{ paddingTop: "8px" }}>
          <GithubOutlined style={{ fontSize: '2.3rem' }} onClick={menuClick} />
        </div>
        <div className="mr15" style={{ paddingTop: "8px" }}>
          <Badge dot={true} offset={[-2, 0]} >
            <a
              href="https://github.com/ltadpoles/react-admin"
              style={{ color: "#000" }}
            >
              <BellFilled style={{ fontSize: '2.3rem' }} />
            </a>
          </Badge>
        </div>
        <div className="mr15">
          <Dropdown overlay={menu} overlayStyle={{ width: "20rem" }}>
            <div className="ant-dropdown-link">
              <Avatar size={28} icon={<UserOutlined />} alt='avatar' style={{ cursor: 'pointer' }} />
            </div>
          </Dropdown>
        </div>
      </div>
    </Header>
  );
};

export default React.memo(AppHeader);
