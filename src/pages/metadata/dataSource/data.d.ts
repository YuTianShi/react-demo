import { TableListPagination } from '@/global';

export interface DataSource {
  id: number;
  name: string;
  type: number;
  jdbcUrl: string;
  username: string;
  password?: string;
}

interface TableListState {
  modalVisible: boolean; //新建表单是否显示
  updateModalVisible: boolean; //更新表单是否显示
  data: DataSource[]; //数据源数组
  pagination: TableListPagination; //分页对象
  searchCondition: { [key: string]: any }; //查询条件
  updateFormValues: Partial<DataSource>; //新增和更新时存放数据
  loading: boolean; //是否加载中
}
