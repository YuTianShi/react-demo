import { DataSource } from '@/pages/metadata/dataSource/data';
import { Request, Response } from 'express';
import { parse } from 'url';

const genList = (current: number, pageSize: number) => {
  const tableListDataSource: DataSource[] = [];

  for (let i = 0; i < pageSize; i++) {
    const index = (current - 1) * 10 + i;
    tableListDataSource.push({
      id: index,
      name: 'bigd线上库' + index,
      type: index % 2,
      jdbcUrl: 'jdbc://192.168.0.' + index,
      username: 'hebei' + index,
    });
  }
  // console.log(tableListDataSource);
  tableListDataSource.reverse();
  return tableListDataSource;
};

let tableListDataSource = genList(1, 100);

function getDataSource(req: Request, res: Response, u: string) {
  let realUrl = u;
  if (
    !realUrl ||
    Object.prototype.toString.call(realUrl) !== '[object String]'
  ) {
    realUrl = req.url;
  }
  const { current = 1 as number, pageSize = 10 } = req.query;
  const params = (parse(realUrl, true).query as unknown) as DataSource;
  const currentNum = current as number;
  const pageSizeNum = pageSize as number;
  let dataSource = [...tableListDataSource].slice(
    (currentNum - 1) * pageSizeNum,
    currentNum * pageSizeNum,
  );

  if (params.name) {
    dataSource = dataSource.filter(data =>
      data.name.includes(params.name || ''),
    );
  }
  const result = {
    data: dataSource,
    total: tableListDataSource.length,
    success: true,
    pageSize,
    current: current || 1,
  };

  return res.json(result);
}

export default {
  'GET /api/dataSource': getDataSource,
};
