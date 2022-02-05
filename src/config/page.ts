import { MetaPageConfig } from '@/core/types'

export const Page:MetaPageConfig = {
  application: {
    apiKey: "application",
    items:[],
    groups: [
      {
        title: "基本信息",
        items: [{
          label: "应用编码",
          apiKey: "id",
          itemType: 1,
          helpText: "应用编码",
          editabled: false
        },
        {
          label: "应用名称",
          apiKey: "appName",
          itemType: 1,
          helpText: "应用名称",
          editabled: false
        },
        {
          label: "数据源",
          apiKey: "datasourceId",
          itemType: 4,
          helpText: "数据源",
          editabled: false
        },
        {
          label: "版本号",
          apiKey: "version",
          itemType: 4,
          helpText: "版本号",
          editabled: false
        },
        {
          label: "描述",
          apiKey: "decription",
          itemType: 1,
          helpText: "描述",
          editabled: false
        }]
      },
      {
        title: "模块信息",
        items:[],
        control: {
          component : "module",
          apiKey: "module"
        }
      }
    ]
  }
}