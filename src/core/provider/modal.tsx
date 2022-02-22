import React, {useRef} from "react";
import { Modal } from "antd";
import getComponent from '@/components'

interface ModalProps {
  visible: boolean;
  title: string;
  apiKey: string;
  setVisible: (v: boolean) => void;
  component?:string;
  data?:any;
}

const ModalProvider = (props: ModalProps) => {
  const modalRef: any = useRef({submit: null})
  const handleOk = () => {
    modalRef.current.submit(()=>{
      props.setVisible(false)
    })
  };
  const handleCancel = () => {
    props.setVisible(false);
  };

  const {apiKey, component} = props;
  const Component = getComponent({name: component, state: {}})
  return (
    <div>
      <Modal
        title={props.title}
        visible={props.visible}
        onOk={handleOk}
        onCancel={handleCancel}
        width={"45%"} >
        {
          Component ? (
            <React.Suspense fallback={null}>
              <Component apiKey={apiKey} refs= {modalRef} data={props.data}></Component>
            </React.Suspense>
          ) :null 
        }
      </Modal>
    </div>
  )
}

export default ModalProvider;