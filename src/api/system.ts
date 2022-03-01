import {doGet} from '@/utils/requests'

export const getSysConfigMapByHost = (hostname:string) => {
  return doGet("/api/msc/v1/system/config", {hostname});
}