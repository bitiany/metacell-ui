import { MetaFormConfig } from '@/core/types'

export const Layout:MetaFormConfig = {
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
  // menu: {
  //   apiKey: "menu",
  //   items:[
  //     {
  //       label: "菜单名称",
  //       apiKey: "id",
  //       itemType: 1,
  //       hidden: true,
  //       helpText: "菜单名称",
  //       extInfo: {
  //         suffix: "",
  //         prefix: "",
  //         maxLength: 32,
  //       }
  //     },
  //     {
  //       label: "菜单名称",
  //       apiKey: "systemId",
  //       itemType: 1,
  //       hidden: true,
  //       helpText: "菜单名称",
  //       extInfo: {
  //         suffix: "",
  //         prefix: "",
  //         maxLength: 32,
  //       }
  //     },
  //     {
  //       label: "菜单名称",
  //       apiKey: "menuName",
  //       itemType: 1,
  //       required: true,
  //       helpText: "菜单名称",
  //       extInfo: {
  //         suffix: "",
  //         prefix: "",
  //         maxLength: 32,
  //       }
  //     },
  //     {
  //       label: "菜单编码",
  //       apiKey: "menuCode",
  //       itemType: 1,
  //       required: true,
  //       helpText: "菜单编码",
  //       extInfo: {
  //         suffix: "",
  //         prefix: "",
  //         maxLength: 32,
  //       }
  //     },
  //     {
  //       label: "资源",
  //       apiKey: "resourceId",
  //       itemType: 4,
  //       required: false,
  //       helpText: "资源",
  //       control: {
  //         component: "resource",
  //         apiKey: "resourceId",
  //         format: (data:any) =>{
  //           return {
  //             code: data.id,
  //             name: data.host + ":" + data.port + "/" + data.database
  //           }
  //         }
  //       }
  //     },
  //     {
  //       label: "组件名称",
  //       apiKey: "component",
  //       itemType: 1,
  //       required: false,
  //       helpText: "组件名称",
  //       extInfo: {
  //         suffix: "",
  //         prefix: "",
  //         maxLength: 32,
  //       }
  //     },
  //     {
  //       label: "路径",
  //       apiKey: "path",
  //       itemType: 1,
  //       required: false,
  //       helpText: "路径",
  //       extInfo: {
  //         suffix: "",
  //         prefix: "",
  //         maxLength: 32,
  //       }
  //     }
  //   ]
  // }  ,
  organization: {
    apiKey: "organization",
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