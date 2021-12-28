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
  table: {
    "label": "表格",
    "apiKey": "metaObject",
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
        "label": "API名称",
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
      }, {
        "label": "创建时间",
        "apiKey": "gmtCreated",
        "itemType": 3,
        "filterabled": false,
        "sortabled": true,
        "extInfo": {
          "dateType": 1
        }
      }
    ]
  }
}



export const TableDemo: MetaTableProps = {
  "label": "表格",
  "apiKey": "metaObject",
  "preference": true,
  // "redirect":"/_table/detail",
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
      "label": "API名称",
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
    }, {
      "label": "创建时间",
      "apiKey": "gmtCreated",
      "itemType": 3,
      "filterabled": false,
      "sortabled": true,
      "extInfo": {
        "dateType": 1
      }
    }
  ]
}


export default {
  basename: '/',
}