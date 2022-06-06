import React, { FC, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Form, Input, Button, List } from 'antd'
import { LockOutlined, UserOutlined } from '@ant-design/icons'
import ReactCanvasNest from 'react-canvas-nest'
import Base64 from 'base-64';
// import { hash } from '@/utils/toolkit'
import { useStorage } from '@/redux'
import { useRequest } from '@/utils/requests'
import { doLogin, findUserInfo, getTenant } from '@/api/uac'
import Logo from '@/assets/img/logo.png'
import './login.less'
interface Props { }

const LoginForm: FC<Props> = () => {
  const history = useNavigate()
  const [userInfo, setUserInfo] = useStorage("setUserInfo")
  const [system, setSystem] = useStorage("setSystem")
  const [selectTenants] = useState<any[]>([])
  const request = useRequest()
  useEffect(() => {
    setUserInfo({})
    if (userInfo.accessToken) {
      history('/')
      return;
    }
    // eslint-disable-next-line
  }, [history])

  const onFinish = (values: any): void => {
    const { userName, password } = values
    // const pwd = hash.aes(password, userName)
    const Authorization = "Basic " + Base64.encode( "ipaas:ipaas")

    request(doLogin({
      username: userName, password: password,
      grant_type: "password"
    }, { Authorization })).then((resp: any) => {
      if (resp.code === 401) {
        setUserInfo({ userName: null, token: null, permission: [] })
      } else {
        const user = resp.result;
        request(findUserInfo(user.access_token, user.token_type)).then((res: any) => {
          setUserInfo({accessToken: user.access_token, tokenType: user.token_type, userInfo: res.result })
          console.log("success login:",  userInfo, {accessToken: user.access_token, tokenType: user.token_type, userInfo: res.result })
          request(getTenant(user.access_token, user.token_type)).then((res:any) => {
            const tenant = res.result
            setSystem({systemId: tenant.masterSystemId, systems: [...tenant.systems]})
            console.log(system)
            history('/')

          })
        })
      }

    }).catch((err:any) => {
      console.log(err)
      setUserInfo({ userName: null, accessToken: null, permission: [] })
    })
  }

  const FormView = (
    <Form className="login-form" name="login-form" onFinish={onFinish}>
      <Form.Item
        name="userName"
        rules={[{ required: true, message: '请输入用户名' }]}
      >
        <Input placeholder="用户名" prefix={<UserOutlined />} size="large" />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[{ required: true, message: '请输入密码' }]}
        extra="用户名：admin 密码：123456"
      >
        <Input.Password
          placeholder="密码"
          prefix={<LockOutlined />}
          size="large"
        />
      </Form.Item>
      <Form.Item>
        <Button
          className="login-form-button"
          htmlType="submit"
          size="large"
          type="primary"
        >
          登录
        </Button>
      </Form.Item>
    </Form>
  )
  const changeTenant = (tenantInfo: any) => {
    // selectTenant(tenantInfo.tenantId)
    // console.log("changeTenant:", tenant)
    history('/')
  }
  const ListView = (tenant: any[]) => {
    return (
      <Form className="login-form" name="login-form">
        <List
          itemLayout="horizontal"
          dataSource={tenant}
          renderItem={item => (
            <List.Item>
              <List.Item.Meta
                title={<a onClick={() => changeTenant(item)} >{item.tenantName}</a>}
              />
            </List.Item>
          )}
        />
      </Form>
    )
  }

  const floatColor = '110,65,255'
  // const floatColor = theme === 'default' ? '24,144,255' : '110,65,255'
  return (
    <div className="login-layout" id="login-layout">
      <ReactCanvasNest
        config={{
          pointColor: floatColor,
          lineColor: floatColor,
          pointOpacity: 0.6
        }}
        style={{ zIndex: 1 }}
      />
      <div className="logo-box">
        <img alt="" className="logo" src={Logo} />
        <span className="logo-name">Meta-Cell</span>
      </div>
      {selectTenants && selectTenants.length > 0 ? ListView(selectTenants) : FormView}
    </div>
  )
}

export default LoginForm
