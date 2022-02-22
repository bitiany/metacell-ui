import { FC, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { LockOutlined, UserOutlined } from '@ant-design/icons'
import { Form, Input, Button, message, List } from 'antd'
import ReactCanvasNest from 'react-canvas-nest'
import './login.less'
import Logo from '@/assets/img/logo.png'
import { hash } from '@/utils/toolkit'
import { useStorage } from '@/redux'
import { doLogin } from '@/api/uac'
interface Props { }

const LoginForm: FC<Props> = () => {
  const history = useNavigate()
  const [userInfo, setUserInfo] = useStorage("setUserInfo")
  const [tenant, setTenant] = useStorage("setTenant")
  const [selectTenant, setSelectTenant] = useState<any[]>([])

  const onFinish = (values: any): void => {
    const { userName, password } = values
    const pwd = hash.aes(password, userName)
    doLogin({
      username: userName, password: pwd
    }).then((resp: any) => {
      if (resp.code === 401) {
        message.error(resp.message)
        setUserInfo({ userName: null, token: null, permission: [] })
        console.log(userInfo)
      } else {
        const tenants = resp.result?.tenants
        const user = resp.result;
        delete user.tenants;
        setUserInfo(user)
        setSelectTenant(tenants)
        if (tenant && tenant.length >= 2) {
          history('/')
        }
      }

    }).catch(err => {
      console.log(err)
      message.error('用户名或密码不正确')
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
    const system = tenantInfo.systems? tenantInfo.systems[0] : null;
    setTenant({...tenantInfo, currentSystem: system?.systemId})
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
      {selectTenant && selectTenant.length > 0 ? ListView(selectTenant) : FormView}
    </div>
  )
}

export default LoginForm
