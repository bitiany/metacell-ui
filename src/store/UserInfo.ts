import { Mapper, Autowire } from '@/redux'
// import { UserType } from './types'
class UserInfo {
  @Autowire("userInfo")
  store(){
    return {
      tokenType: null,
      accessToken: null,
      userInfo: null
    }
  } 

  @Mapper()
  setUserInfo(state: any, userInfo:any){
    if(JSON.stringify(userInfo) === "{}"){
      return userInfo;
    }
    return {...state,...userInfo}
  }
  // @Mapper()
  // selectTenant(state: any, tenantId: number){
  //   console.log(state,  tenantId)
  //   return {...state, tenantId}
  // }
}

export default UserInfo