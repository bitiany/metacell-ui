import { IMenu } from '@/store/types'
export const StaticMenu: { Menus: IMenu[] } = {
  Menus: [
    { apiKey: "dashboard", label: "首页 ", icon: "HomeOutlined", component: "Dashboard", path: "/", sort: 1 },
    { apiKey: "table", label: "表格 ", icon: "CloudUploadOutlined", component: "Table", path: "/table?apiKey=table", sort: 2 ,
      children: [
      ]
    },
    { apiKey: "appManager", label: "应用资源管理 ", icon: "FundViewOutlined", sort: 3,
        children: [
          { apiKey: "system", label: "系统管理",component: "Table", path: "/table?apiKey=system",  sort: 1 },
          { apiKey: "application", label: "应用管理",component: "Table", path: "/table?apiKey=application",  sort: 2 }
        ]
    },
    { apiKey: "kline", label: "Kline ", icon: "FundViewOutlined", component: "Demo", path: "/kline", sort: 5 },
    {
      apiKey: "comp", label: "组件", icon: "GroupOutlined", sort: 6,
      children: [
        { apiKey: "metaObject", label: "实体管理", icon: "NotificationOutlined", component: "Dashboard", path: "/_table/metaObject", sort: 1 },
        { apiKey: "metaItem", component: "MetaObjectDetail", path: "/_table/metaItem", hidden: true, sort: 1 }
      ]
    },
    { apiKey: "bpmn", label: "bpmn ", icon: "UserOutlined", component: "Dashboard", path: "/bpmn", sort: 3 },
  ]
}