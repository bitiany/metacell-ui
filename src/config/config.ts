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
        "label": "系统名称",
        "apiKey": "apiKey",
        "itemType": 1,
        "filterabled": true,
        "sortabled": false,
        "selected": true
      },
      {
        "label": "所属组织",
        "apiKey": "org",
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

    ]
  }
}
export default {
  basename: '/',
}