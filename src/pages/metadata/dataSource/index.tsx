import { GlobalModelStateType } from '@/models/global';
import { PlusOutlined, SearchOutlined } from '@ant-design/icons';
import { Button, Col, Divider, Input, Modal, Row, Table } from 'antd';
import { ColumnProps } from 'antd/es/table';
import { connect } from 'dva';
import React, { Component, Fragment } from 'react';
import CreateForm from './components/CreateForm';
import UpdateForm from './components/UpdateForm';
import { DataSource, TableListState } from './data';
import styles from './index.less';
import { queryDataSource } from './service';

interface TableListProps {
  global: GlobalModelStateType;
}

@connect(({ global }: { global: GlobalModelStateType }) => ({ global }))
class index extends Component<TableListProps, TableListState> {
  state: TableListState = {
    modalVisible: false,
    updateModalVisible: false,
    data: [],
    pagination: {
      pageSize: 20,
      current: 1,
    },
    searchCondition: {
      name: '',
    },
    updateFormValues: {},
    loading: false,
  };

  //表格列属性
  columns: ColumnProps<DataSource>[] = [
    {
      title: '数据库名称',
      dataIndex: 'name',
    },
    {
      title: '类型',
      dataIndex: 'type',
      render: (val: number) => (val ? 'mysql' : 'oralce'),
    },
    {
      title: 'JDBC URL',
      dataIndex: 'jdbcUrl',
    },
    {
      title: '用户',
      dataIndex: 'username',
    },
    {
      title: '操作',
      render: (text, record) => (
        <Fragment>
          <a onClick={() => this.handleUpdateModalVisible(true, record)}>
            修改
          </a>
          <Divider type="vertical" />
          <a onClick={() => this.handleDeleteVisible(record.id)}>删除</a>
        </Fragment>
      ),
    },
  ];

  componentDidMount() {
    const { pagination, searchCondition } = this.state;
    queryDataSource({ ...pagination, ...searchCondition }).then(res => {
      this.setState({
        data: res.data,
        pagination: { ...pagination, total: res.total },
      });
    });
  }
  //显示新增表单
  handleModalVisible = (flag?: boolean) => {
    this.setState({
      modalVisible: !!flag,
    });
  };
  //显示更新表单
  handleUpdateModalVisible = (flag?: boolean, record?: Partial<DataSource>) => {
    this.setState({
      updateModalVisible: !!flag,
      updateFormValues: record || {},
    });
  };
  //显示删除提示
  handleDeleteVisible = (id?: number) => {
    const that = this;
    Modal.confirm({
      title: '确定删除此景区?',
      onOk() {
        //执行删除代码
        alert('删除');
      },
      onCancel() {},
    });
  };
  //提交表单
  handleSubmit = (object: DataSource) => {
    console.log(object);
  };

  //查询输入框内容变化
  nameOnChange = (e: any) => {
    this.setState({
      searchCondition: {
        ...this.state.searchCondition,
        name: e.target.value,
      },
    });
  };

  //分页条件查询
  pageChange = (pagination: any) => {
    const { searchCondition } = this.state;
    this.setState({ pagination });
    queryDataSource({ ...pagination, ...searchCondition }).then(res => {
      this.setState({
        data: res.data,
        pagination: { ...pagination, total: res.total },
      });
    });
  };

  //查询条件查询
  search = () => {
    const { pagination, searchCondition } = this.state;
    this.setState({
      pagination: { ...pagination, current: 0 },
    });
    queryDataSource({ ...pagination, ...searchCondition }).then(res => {
      this.setState({
        data: res.data,
        pagination: { ...pagination, total: res.total },
      });
    });
  };

  render() {
    const {
      global: { height },
    } = this.props;
    const {
      loading,
      data,
      pagination,
      modalVisible,
      updateModalVisible,
      updateFormValues,
    } = this.state;
    return (
      <Fragment>
        <div className={styles.tableList}>
          <div className="search-box">
            <div className="label">名称：</div>
            <div className="input">
              <Input
                value={this.state.searchCondition.name}
                onPressEnter={() => this.search()}
                onChange={e => this.nameOnChange(e)}
                allowClear={true}
                width={100}
              />
            </div>
            <Button
              icon={<SearchOutlined />}
              type="primary"
              onClick={() => this.search()}
            >
              查询
            </Button>
          </div>

          <div className="table-list-operator">
            <Button
              icon={<PlusOutlined />}
              type="primary"
              onClick={() => this.handleModalVisible(true)}
            >
              新建
            </Button>
          </div>
          <Table
            tableLayout="fixed"
            loading={loading}
            rowKey="id"
            dataSource={data}
            columns={this.columns}
            pagination={{ ...pagination, position: ['bottomCenter'] }}
            scroll={{ y: height - 342 }}
            onChange={pagination => this.pageChange(pagination)}
          />
        </div>
        <CreateForm
          modalVisible={modalVisible}
          handleModalVisible={this.handleModalVisible}
          handleSubmit={this.handleSubmit}
        />
        {updateModalVisible &&
          updateFormValues &&
          Object.keys(updateFormValues).length !== 0 && (
            <UpdateForm
              modalVisible={updateModalVisible}
              handleModalVisible={this.handleUpdateModalVisible}
              handleSubmit={this.handleSubmit}
              updateFormValues={updateFormValues}
            />
          )}
      </Fragment>
    );
  }
}

export default index;
