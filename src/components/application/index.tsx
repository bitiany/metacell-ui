import React, { useEffect, useState } from 'react'
import { Collapse, Space, Row, Col } from 'antd';
import { MetaLabel } from '@/core/form/MetaLabel';
import { MetaFormItem, MetaGroup } from '@/core/types';
import getComponent from '@/components';
import AsyncProvider from '@/core/provider'
import api from '@/api';
import { Page } from '@/config/page'
import { useEvent, clear } from '@/utils/hooks'
import { useRequest } from '@/utils/requests';
import '@/assets/form.less'
import '@/assets/page.less'
const { Panel } = Collapse;
const Application = (props: any) => {
  const [data, setData] = useState<any>({})
  const [page, setPage] = useState<any>({})
  const [provider, setProvider] = useState<any>({ visible: false, data: {} })
  const { apiKey } = props
  const id = props.data?.id
  const request = useRequest()
  const listener = useEvent("showProvider", { apiKey: "module" })
  useEffect(() => {
    setPage(Page[apiKey])
    request(api(apiKey).get(id)).then((resp: any) => {
      setData(resp.result)
    }).catch((err:any) => {
      console.log(err)
    })
    listener((data: any) => {
      setProvider({ visible: true, ...data })
    })
    return () => { clear("showProvider", { apiKey: "module" }) }
    // eslint-disable-next-line
  }, [])
  const renderRowCol = (items: MetaFormItem[], index: number) => {
    return (
      <Row key={index}>
        {
          items.map((item: MetaFormItem, idx) => {
            return (
              <Col span={8} style={{ display: "flex" }} key={idx}>
                <div >
                  <MetaLabel {...item} />
                </div>
                <div style={{ paddingTop: "15px" }}>{data[item.apiKey || ""]}</div>
              </Col>
            )
          })
        }
      </Row>)
  }
  const renderCollapse = (groups?: MetaGroup[]) => {
    if (page.groups && page.groups.length > 0) {
      return (
        <Collapse defaultActiveKey={["0", "1"]} ghost destroyInactivePanel expandIcon={(props: any) => {
          return (<div className='collapse-icon'><Space /></div>)
        }}>
          {
            page.groups.map((group: MetaGroup, index: number) => {
              const rows: any = []
              if (group.items) {
                while (group.items.length > 0) {
                  rows.push({
                    items: group.items.splice(0, 3)
                  })
                }
              }
              if (group.control) {
                const Component = getComponent({ name: group.control.component, state: {} })
                return <Panel header={group.title} key={index}>
                  {
                    Component ? <React.Suspense fallback={null}>
                      <Component apiKey={group.control.apiKey} data={{ appId: id, modules: data.modules }}></Component>
                    </React.Suspense> : null
                  }
                </Panel>
              } else {
                return (
                  <Panel header={group.title} key={index}>
                    {
                      rows.map((item: any, idx: number) => {
                        return renderRowCol(item.items, idx)
                      })
                    }
                  </Panel>
                )
              }
            })
          }
        </Collapse>
      )
    }
    return (<div></div>)
  }

  const setVisible = (visible: boolean) => {
    setProvider({ visible: visible, appId: id })
  }

  return (<div style={{ width: "100%" }}>
    {renderCollapse(page.groups)}
    <AsyncProvider {...provider} setVisible={setVisible} />
  </div>)
}

export default Application;