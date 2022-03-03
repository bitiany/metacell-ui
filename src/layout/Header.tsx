import React from "react";
import { useNavigate } from 'react-router-dom'
import { Menu, Dropdown, Layout, Badge, Avatar } from "antd";
import Icon, {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  BellFilled,
  EditFilled,
  LoginOutlined
} from "@ant-design/icons";
import * as Icons from "@ant-design/icons";
import {ReactComponent as UserInfo} from '@/assets/img/user.svg'
import { useStorage } from '@/redux'
import style from './module/Header.module.less'
const { Header } = Layout;

const AppHeader = (props: any) => {
  let { loginOut, systems } = props;
  const navigate = useNavigate();
  const [panes, addTabPane] = useStorage("addTabPane", "panes")
  const [system, setSystem] = useStorage("setSystem")

  const menu = (
    <Menu>
      <Menu.ItemGroup title="用户设置">
        <Menu.Divider />
        <Menu.Item key="1">
          <EditFilled />
          个人设置
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
  const changeSystem = (sys: any) => {
    if(panes) panes.length = 0
    addTabPane([], "clear")
    setSystem({systemId: sys.systemId})
    console.log("change system", system,sys)
    navigate("/")
  }
  const renderMenuItemIcon = (sys:any) => {
    const Icon = Icons[sys.icon];
    return <Icon key={sys.systemId} onClick={() => changeSystem(sys)}/>;
  };

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
      <div className={style.right}>
        {systems ? systems.map((sys: any) => {
          return (
            <div className="mr15" style={{ paddingTop: "5px" }} key={sys.systemId}>
              {sys.icon ? renderMenuItemIcon(sys) :(<a className="fr webTheme" onClick={() => changeSystem(sys)}>{sys.name}</a>)}
            </div>
        )}) : null}

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
              <Avatar size={28} icon={<Icon component={UserInfo} size={32}/>} alt='avatar' style={{ cursor: 'pointer' }} />
            </div>
          </Dropdown>
        </div>
      </div>
    </Header>
  );
};

export default React.memo(AppHeader);
