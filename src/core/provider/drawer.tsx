import React, { useRef } from 'react'
import { Drawer,Button,Space } from 'antd'
import getComponent from '@/components'
const DrawerProvider = (props: any) => {
  const modalRef: any = useRef({ submit: null })
  const { apiKey, component } = props;
  const onClose = () => {
    props.setVisible(false);
  };
  const handleOk = () => {
    modalRef.current.submit(()=>{
      props.setVisible(false)
    })
    // props.setVisible(false)
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
          Component ? (
            <React.Suspense fallback={null}>
              <Component apiKey={apiKey} refs={modalRef}></Component>
            </React.Suspense>
          ) : null
        }
      </Drawer>
    </div>
  )
}
export default DrawerProvider