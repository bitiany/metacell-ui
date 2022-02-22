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
          maxLength: 32,
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
        apiKey: "appId",
        itemType: 1,
        required: true,
        hidden: true,
        helpText: "应用编码",
        extInfo: {
          suffix: "",
          prefix: "",
          maxLength: 32,
        },
      },
      {
        label: "模块编码",
        apiKey: "moduleCode",
        itemType: 1,
        required: true,
        helpText: "模块编码",
        extInfo: {
          suffix: "",
          prefix: "",
          maxLength: 32,
        },
      },
      {
        label: "模块名称",
        apiKey: "moduleName",
        itemType: 1,
        required: true,
        helpText: "模块名称",
        extInfo: {
          maxLength: 32,
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
    ]
    },
  menu: {
    apiKey: "menu",
    items:[
      {
        label: "菜单名称",
        apiKey: "id",
        itemType: 1,
        hidden: true,
        helpText: "菜单名称",
        extInfo: {
          suffix: "",
          prefix: "",
          maxLength: 32,
        }
      },
      {
        label: "菜单名称",
        apiKey: "systemId",
        itemType: 1,
        hidden: true,
        helpText: "菜单名称",
        extInfo: {
          suffix: "",
          prefix: "",
          maxLength: 32,
        }
      },
      {
        label: "菜单名称",
        apiKey: "menuName",
        itemType: 1,
        required: true,
        helpText: "菜单名称",
        extInfo: {
          suffix: "",
          prefix: "",
          maxLength: 32,
        }
      },
      {
        label: "菜单编码",
        apiKey: "menuCode",
        itemType: 1,
        required: true,
        helpText: "菜单编码",
        extInfo: {
          suffix: "",
          prefix: "",
          maxLength: 32,
        }
      },
      {
        label: "资源",
        apiKey: "resourceId",
        itemType: 4,
        required: false,
        helpText: "资源",
        // control: {
        //   component: "resource",
        //   apiKey: "resourceId",
        //   format: (data:any) =>{
        //     return {
        //       code: data.id,
        //       name: data.host + ":" + data.port + "/" + data.database
        //     }
        //   }
        // }
      },
      {
        label: "组件名称",
        apiKey: "component",
        itemType: 1,
        required: false,
        helpText: "组件名称",
        extInfo: {
          suffix: "",
          prefix: "",
          maxLength: 32,
        }
      },
      {
        label: "路径",
        apiKey: "path",
        itemType: 1,
        required: false,
        helpText: "路径",
        extInfo: {
          suffix: "",
          prefix: "",
          maxLength: 32,
        }
      }
    ]
  }  ,
  organization: {
    apiKey: "menu",
    items:[
      {
        label: "名称",
        apiKey: "orgName",
        itemType: 1,
        hidden: false,
        helpText: "组织机构名称",
        extInfo: {
          suffix: "",
          prefix: "",
          maxLength: 32,
        }
      },
      {
        label: "组织编码",
        apiKey: "orgCode",
        itemType: 1,
        required: true,
        helpText: "组织编码",
        extInfo: {
          suffix: "",
          prefix: "",
          maxLength: 32,
        }
      },
      {
        label: "拼音简码",
        apiKey: "spellAbbr",
        itemType: 1,
        required: false,
        helpText: "组织编码",
        extInfo: {
          suffix: "",
          prefix: "",
          maxLength: 32,
        }
      },
      {
        label: "拼音",
        apiKey: "spell",
        itemType: 1,
        required: false,
        helpText: "组织编码",
        extInfo: {
          suffix: "",
          prefix: "",
          maxLength: 32,
        }
      },
    ]
    }
}