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
        "label": "编号",
        "apiKey": "objectId",
        "itemType": 1,
        "filterabled": true,
        "sortabled": true,
        "primaryProperty": true,
        "selected": true,
        "component": "detail"
      },
      {
        "label": "名称",
        "apiKey": "name",
        "itemType": 1,
        "filterabled": true,
        "sortabled": false,
        "selected": true
      },
      {
        "label": "应用名称",
        "apiKey": "apiKey",
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
        "selected": true,
      },
      {
        "label": "描述",
        "apiKey": "description",
        "itemType": 1,
        "filterabled": false,
        "sortabled": false
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
        "apiKey": "systemCode",
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
        "sortabled": false
      },
      {
        "label": "版本号",
        "apiKey": "version",
        "itemType": 1,
        "filterabled": false,
        "sortabled": false
      },
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