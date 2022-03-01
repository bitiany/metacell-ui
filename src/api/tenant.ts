import {doGet} from '@/utils/requests'

export const getSystemByTenantId = () => {
  return doGet("/api/uac/v1/tenant/system");
}