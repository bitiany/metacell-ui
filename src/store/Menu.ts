import { Mapper, Autowire } from '@/redux'
class MenuStore {
  @Autowire("menu")
  store(){
    return []
  } 

  @Mapper()
  setMenus(state: any, menus:any){
    return [...menus]
  }
}

export default MenuStore