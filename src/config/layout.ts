import { MetaFormConfig } from '@/core/types'

export const Layout:MetaFormConfig = {
  system: {
    title: "",
    items:[
      {
        label: "系统名称",
        apiKey: "systemName",
        itemType: 1,
        sortabled: false,
        selected: true,
        required: true,
        helpText: "系统名称",
        extInfo: {
          suffix: "",
          prefix: "",
          maxLength: 10,
        },
      },
      {
        label: "系统编码",
        apiKey: "systemCode",
        itemType: 1,
        sortabled: false,
        selected: true,
        required: true,
        helpText: "系统编码",
        extInfo: {
          suffix: "",
          prefix: "",
          maxLength: 10,
        },
      },
      {
        label: "系统ICON",
        apiKey: "logo",
        itemType: 1,
        required: false,
        helpText: "系统ICON",
        extInfo: {
          suffix: "",
          prefix: "",
          maxLength: 10,
        },
      },
      {
        label: "版本",
        apiKey: "version",
        itemType: 1,
        required: false,
        helpText: "版本",
        extInfo: {
          suffix: "",
          prefix: "",
          maxLength: 10,
        },
      },
      {
        label: "状态",
        apiKey: "status",
        itemType: 5,
        required: true,
        extInfo: {
          defaultChecked: true,
        },
      },
      
    ]
  },
  datasource: {
    title: "",
    items:[
      {
        label: "数据库类型",
        apiKey: "databaseType",
        itemType: 4,
        sortabled: false,
        selected: true,
        required: true,
        helpText: "数据库类型",
        extInfo: {},
        pickOptions: [
          {
            name: "Mysql",
            code: "mysql",
            defaultOption: true
          }
        ]
      },
      {
        label: "数据库名",
        apiKey: "database",
        itemType: 1,
        sortabled: false,
        selected: true,
        required: true,
        helpText: "数据库名",
        extInfo: {
          suffix: "",
          prefix: "",
          maxLength: 32,
        },
      },
      {
        label: "主机",
        apiKey: "host",
        itemType: 1,
        sortabled: false,
        selected: true,
        required: true,
        helpText: "主机",
        extInfo: {
          suffix: "",
          prefix: "",
          maxLength: 32,
        },
      },
      {
        label: "端口号",
        apiKey: "port",
        itemType: 2,
        required: true,
        helpText: "端口号",
        extInfo: {
          suffix: "",
          prefix: "",
          maxLength: 10,
        },
      },
      {
        label: "用户名",
        apiKey: "username",
        itemType: 1,
        required: true,
        helpText: "用户名",
        extInfo: {
          suffix: "",
          prefix: "",
          maxLength: 32,
        },
      },
      {
        label: "密码",
        apiKey: "password",
        itemType: 1,
        required: true,
        extInfo: {
          suffix: "",
          prefix: "",
          maxLength: 32,
        },
      },
      
    ]
  }
}