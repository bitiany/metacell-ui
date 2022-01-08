
import ModalProvider from '@/core/provider/modal'
import DrawerProvider  from './drawer'
const AsyncProvider = (props: any) => {
  let Provider = null;
  if(props.container && props.container === "drawer"){
    Provider = DrawerProvider
  }else{
    Provider =  ModalProvider
  }
  return (
    <div>
      <Provider {...props} />
    </div >)
}
export default AsyncProvider