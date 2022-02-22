import { Mapper, Autowire } from '@/redux'
import { UserType } from './types'
class UserInfo {
  @Autowire
  store(){
    return {
      userName: null,
      accessToken: null,
      userId: null,
      passportId: null,
      tenants: null
    }
  } 

  @Mapper()
  setUserInfo(state: any, userInfo:UserType){
    return {...userInfo}
  }
}

export default UserInfo