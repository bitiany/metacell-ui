import { Mapper, Autowire } from '@/redux'

class System {
  @Autowire
  store(){
    return {
      systemId: "",
      policy: {}
    }
  } 
  @Mapper()
  setSystem(state: any, system:any){
    return {...state, ...system}
  }
}
export default System