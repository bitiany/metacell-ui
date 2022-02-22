import { Mapper, Autowire } from '@/redux'
class MenuStore {
  @Autowire
  store(){
    return []
  } 

  @Mapper()
  setMenus(state: any, menus:any){
    return [...menus]
  }
}

export default MenuStore