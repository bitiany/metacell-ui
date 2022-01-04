
import ModalProvider from '@/core/provider/modal'
const AsyncProvider = (props: any) => {
  // console.log("provider", props)
  return (
    <div>
      <ModalProvider {...props} />
    </div >)
}

export default AsyncProvider