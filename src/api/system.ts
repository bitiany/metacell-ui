import {doGet} from '@/utils/requests'

export const getSysConfigMapByHost = (hostname:string) => {
  return doGet("/api/v1/system/config", {hostname});
}