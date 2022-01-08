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
        apiKey: "apiKey",
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
        label: "是否外部应用",
        apiKey: "status",
        itemType: 5,
        required: true,
        extInfo: {
          defaultChecked: true,
        },
      },
      {
        label: "系统LOGO",
        apiKey: "logo",
        itemType: 1,
        required: false,
        helpText: "系统LOGO",
        extInfo: {
          suffix: "",
          prefix: "",
          maxLength: 10,
        },
      },
    ]
  }
}