import { Mapper, Autowire } from '@/redux'
import { UserType } from './types'
class UserInfo {
  @Autowire("userInfo")
  store(){
    return {
      userName: null,
      accessToken: null,
      userId: null,
      passportId: null,
      tenants: null,
      selectTenant: null
    }
  } 

  @Mapper()
  setUserInfo(state: any, userInfo:UserType){
    return {...userInfo}
  }
  @Mapper()
  selectTenant(state: any, tenantId: number){
    return {...state, tenantId}
  }
}

export default UserInfo