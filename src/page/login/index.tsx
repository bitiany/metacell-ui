import {  FC } from 'react'
import { useNavigate } from 'react-router-dom'
import { LockOutlined, UserOutlined } from '@ant-design/icons'
import { Form, Input, Button, message } from 'antd'
import ReactCanvasNest from 'react-canvas-nest'
import './login.less'
import Logo from '@/assets/img/logo.png'

import { useStorage } from '@/redux'
interface Props {}

const LoginForm: FC<Props> = () => {
  const history = useNavigate()
  const [userInfo, setUserInfo] = useStorage("setUserInfo")

  // 触发登录方法
  const onFinish = (values: any): void => {
    const { userName, password } = values
    if (userName !== 'admin' && password !== '123456') {
      message.error('用户名或密码错误')
      return
    }

    // 登录后返回的数据，包括权限
    const res = {
      userName,
      token: 'asdfghjkl',
      permission: [
        {
          code: 'user:list:view',
          name: '查看用户列表'
        },
        {
          code: 'user:list:add',
          name: '新增用户列表'
        },
        {
          code: 'user:list:edit',
          name: '编辑用户列表'
        },
        {
          code: 'role:list:view',
          name: '查看角色列表'
        },
        {
          code: 'auth:test:view',
          name: '查看权限测试页'
        }
      ]
    }
    setUserInfo(res)
    console.debug("===>",userInfo)
    history('/')
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
      {FormView}
    </div>
  )
}

export default LoginForm
