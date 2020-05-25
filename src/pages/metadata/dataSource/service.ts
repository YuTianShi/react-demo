import request from '@/utils/request';

export async function queryDataSource(params?: { [key: string]: any }) {
  return request('/api/dataSource', {
    params,
  });
}
