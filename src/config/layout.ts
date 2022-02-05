import { MetaFormConfig } from '@/core/types'

export const Layout:MetaFormConfig = {
  system: {
    apiKey: "system",
    title: "",
    items:[
      {
        label: "系统名称",
        apiKey: "systemName",
        itemType: 1,
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
        apiKey: "id",
        itemType: 1,
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
        apiKey: "systemIcon",
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
        label: "描述",
        apiKey: "decription",
        itemType: 1,
        required: false,
        helpText: "描述",
        extInfo: {
          suffix: "",
          prefix: "",
          maxLength: 10,
        },
      }
    ]
  },
  datasource: {
    apiKey: "datasource",
    title: "",
    items:[
      {
        label: "数据库类型",
        apiKey: "databaseType",
        itemType: 4,
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
  },
  application: {
    apiKey: "application",
    title: "",
    items:[
      {
        label: "基本信息",
        itemType: 0,
      },
      {
        label: "应用编码",
        apiKey: "id",
        itemType: 1,
        required: true,
        helpText: "应用编码",
        extInfo: {
          suffix: "",
          prefix: "",
          maxLength: 32,
        },
      },
      {
        label: "应用名称",
        apiKey: "appName",
        itemType: 1,
        required: true,
        helpText: "应用名称",
        extInfo: {
          maxLength: 32,
        }
      },
      {
        label: "数据源",
        apiKey: "datasourceId",
        itemType: 4,
        required: false,
        helpText: "数据源",
        control: {
          component: "dropdown",
          apiKey: "datasource",
          format: (data:any) =>{
            return {
              code: data.id,
              name: data.host + ":" + data.port + "/" + data.database
            }
          }
        }
      },
      {
        label: "描述",
        apiKey: "decription",
        itemType: 1,
        required: false,
        helpText: "描述",
        extInfo: {
          suffix: "",
          prefix: "",
          maxLength: 10,
        },
      },
      {
        label: "应用路由",
        itemType: 0,
      },
      {
        label: "路由",
        apiKey: "uri",
        required: false,
        itemType: 1,
        helpText: "数据源",
      },
      {
        label: "路由断言",
        apiKey: "predicates",
        required: false,
        itemType: 1,
        helpText: "数据源",
      },
      
    ]
  },
  module: {
    apiKey: "module",
    title: "",
    items:[
      {
        label: "应用编码",
        apiKey: "id",
        itemType: 1,
        required: true,
        helpText: "应用编码",
        extInfo: {
          suffix: "",
          prefix: "",
          maxLength: 32,
        },
      },]
    },
  menu: {
    apiKey: "menu",
    items:[
      {
        label: "应用编码",
        apiKey: "id",
        itemType: 1,
        required: true,
        helpText: "应用编码",
        extInfo: {
          suffix: "",
          prefix: "",
          maxLength: 32,
        }
      }
    ]
  }  
}