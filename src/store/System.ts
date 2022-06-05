import { Mapper, Autowire } from '@/redux'

class System {
  @Autowire("system")
  store(){
    return {
      systemId: "",
      policy: {},
      systems: []
    }
  } 
  @Mapper()
  setSystem(state: any, system:any){
    return {...state, ...system}
  }
}
export default System