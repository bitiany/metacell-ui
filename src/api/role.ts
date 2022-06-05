import {doGet} from '@/utils/requests'

export const getRoleList = ()=>{
  return doGet("/api/v1/role");
}