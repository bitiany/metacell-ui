import { IMenu } from '@/store/types'
export const StaticMenu: { Menus: IMenu[] } = {
  Menus: [
    { apiKey: "dashboard", name: "首页 ", icon: "HomeOutlined", component: "Dashboard", path: "/", sort: 1 }
  ]
}