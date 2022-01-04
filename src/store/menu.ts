import { IMenu } from '@/store/types'
export const StaticMenu: { Menus: IMenu[] } = {
  Menus: [
    { apiKey: "dashboard", label: "首页 ", icon: "HomeOutlined", component: "Dashboard", path: "/", sort: 1 },
    { apiKey: "appManager", label: "应用资源管理 ", icon: "FundViewOutlined", sort: 3,
        children: [
          { apiKey: "system", label: "系统管理",component: "Table", path: "/table?apiKey=system",  sort: 1 },
          { apiKey: "application", label: "应用管理",component: "Table", path: "/table?apiKey=application",  sort: 2 }
        ]
    },
    { apiKey: "bpmn", label: "bpmn ", icon: "UserOutlined", component: "Dashboard", path: "/bpmn", sort: 3 },
  ]
}