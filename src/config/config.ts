/* eslint import/no-anonymous-default-export: [2, {"allowObject": true}] */
import { MetaTableProps } from '@/core/types'

export  interface TableConfigType{
  [key: string]: MetaTableProps;
}

export const TableConfig:TableConfigType = {
  application: {
    "label": "应用",
    "apiKey": "application",
    "preference": true,
    "columns": [
      {
        "label": "应用编号",
        "apiKey": "id",
        "itemType": 1,
        "filterabled": true,
        "sortabled": true,
        "primaryProperty": true,
        "selected": true,
        "component": "application",
        control: {
          title: "编辑应用",
          component: "application",
          apiKey: "application"
        }
      },
      {
        "label": "名称",
        "apiKey": "appName",
        "itemType": 1,
        "filterabled": true,
        "sortabled": false,
        "selected": true
      },
      {
        "label": "状态",
        "apiKey": "status",
        "itemType": 5,
        "filterabled": true,
        "sortabled": false,
        "selected": true
      },
      {
        "label": "描述",
        "apiKey": "description",
        "itemType": 1,
        "filterabled": false,
        "sortabled": false
      }
    ],
    operation: [
      {
        name:"删除",
        type: "delete"
      }
    ]
  },
  system: {
    "label": "系统",
    "apiKey": "system",
    "preference": true,
    "columns": [
      {
        "label": "名称",
        "apiKey": "systemName",
        "itemType": 1,
        "filterabled": true,
        "sortabled": false,
        "selected": true
      },
      {
        "label": "系统编号",
        "apiKey": "id",
        "itemType": 1,
        "filterabled": true,
        "sortabled": false,
        "selected": true
      },
      {
        "label": "系统图标",
        "apiKey": "systemIcon",
        "itemType": 1,
        "filterabled": false,
        "sortabled": false,
        "selected": true
      },
      {
        "label": "状态",
        "apiKey": "status",
        "itemType": 5,
        "filterabled": true,
        "sortabled": false,
        "selected": true,
      },
      {
        "label": "描述",
        "apiKey": "description",
        "itemType": 1,
        "filterabled": false,
        "sortabled": false,
        "selected": true,
      },
      {
        "label": "版本号",
        "apiKey": "version",
        "itemType": 1,
        "filterabled": false,
        "sortabled": false,
        "selected": true,
      },
    ],
    operation: [
      {
        name:"删除",
        type: "delete"
      }
    ]
  },
  datasource: {
    "label": "数据源",
    "apiKey": "datasource",
    "preference": true,
    "columns": [
      {
        "label": "数据库名",
        "apiKey": "database",
        "itemType": 1,
        "filterabled": true,
        "sortabled": true,
        "primaryProperty": true,
        "selected": true,
        "component": "detail"
      },
      {
        "label": "主机",
        "apiKey": "host",
        "itemType": 1,
        "filterabled": true,
        "sortabled": false,
        "selected": true
      },
      {
        "label": "端口号",
        "apiKey": "port",
        "itemType": 1,
        "filterabled": true,
        "sortabled": false,
        "selected": true
      },
      {
        "label": "数据库类型",
        "apiKey": "databaseType",
        "itemType": 4,
        "filterabled": true,
        "sortabled": false,
        "selected": true,
        "pickOptions": [
          {
            name: "Mysql",
            code: "mysql"
          }
        ]
      },
      {
        "label": "状态",
        "apiKey": "status",
        "itemType": 5,
        "filterabled": true,
        "sortabled": false,
        "selected": true,
      },
      {
        "label": "描述",
        "apiKey": "description",
        "itemType": 1,
        "filterabled": false,
        "sortabled": false
      }
    ],
    operation: [
      {
        name:"删除",
        type: "delete"
      }
    ]
  },
}
export default {
  basename: '/',
}