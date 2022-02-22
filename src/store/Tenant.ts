import { Mapper, Autowire } from '@/redux'
class Tenant {
  @Autowire
  store(){
    return {
      tenantId: null,
      tenantName: null,
      currentSystem: null,
      systems:null
    }
  } 

  @Mapper()
  setTenant(state: any, tenant:any){
    return {...tenant}
  }
}

export default Tenant