import React, { useRef } from 'react'
import { Drawer,Button,Space } from 'antd'
import getComponent from '@/components'
const DrawerProvider = (props: any) => {
  const modalRef: any = useRef({ submit: null })
  const { apiKey, component } = props;
  const onClose = () => {
    props.setVisible(false, false);
  };
  const handleOk = () => {
    modalRef.current.submit(()=>{
      props.setVisible(false, true)
    })
  };
  const Component = getComponent({ name: component, state: {} })
  return (
    <div>
      <Drawer
        width={props.width || '50%'}
        title={props.title}
        closable={true}
        placement={"right"}
        onClose={onClose}
        visible={props.visible}
        extra={
          <Space>
            <Button onClick={onClose}>取消</Button>
            <Button onClick={handleOk} type="primary">
              确定
            </Button>
          </Space>
        }
      >
        {
            <React.Suspense fallback={<div>error</div>}>
              {Component ? <Component apiKey={apiKey} refs={modalRef}></Component> : null}
            </React.Suspense>
        }
      </Drawer>
    </div>
  )
}
export default DrawerProvider