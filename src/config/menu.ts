import { IMenu } from '@/store/types'
export const StaticMenu: { Menus: IMenu[] } = {
  Menus: [
    { apiKey: "dashboard", label: "首页 ", icon: "HomeOutlined", component: "Dashboard", path: "/", sort: 1 },
    { apiKey: "appManager", label: "应用资源管理 ", icon: "FundViewOutlined", sort: 3,
        children: [
          { apiKey: "datasource", label: "数据源管理",component: "Table", path: "/table?apiKey=datasource",  sort: 1 },
          { apiKey: "system", label: "子系统管理",component: "Table", path: "/table?apiKey=system",  sort: 2 },
          { apiKey: "application", label: "应用管理",component: "Table", path: "/table?apiKey=application",  sort: 3 }
        ]
    },
    { apiKey: "setting", label: "系统设置 ", icon: "FundViewOutlined", sort: 3,
      children: [
        { apiKey: "menu", label: "菜单管理",component: "menu", path: "/menu",  sort: 1 },
      ]
    }
  ]
}