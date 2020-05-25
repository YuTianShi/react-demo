import { Form, Input, Modal, Select } from 'antd';
import React from 'react';
import { DataSource } from '../data';

const { Option } = Select;

const CreateForm = ({
  modalVisible,
  handleSubmit,
  handleModalVisible,
  updateFormValues,
}: {
  modalVisible: boolean;
  handleSubmit: Function;
  handleModalVisible: Function;
  updateFormValues: Partial<DataSource>;
}) => {
  const [form] = Form.useForm();

  const okHandle = () => {
    form
      .validateFields()
      .then(fieldsValue => {
        const values = {
          ...updateFormValues,
          ...fieldsValue,
        };
        handleSubmit(values);
      })
      .catch(error => {
        console.log('校验失败:', error);
      });
  };

  return (
    <Modal
      destroyOnClose
      title="编辑数据源"
      visible={modalVisible}
      onOk={okHandle}
      width={600}
      onCancel={() => handleModalVisible()}
    >
      <Form
        labelCol={{ span: 6 }}
        form={form}
        name="register"
        initialValues={updateFormValues}
        scrollToFirstError
      >
        <Form.Item
          name="name"
          label="数据库名称"
          rules={[{ required: true, message: '请输入数据源名称!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="type"
          label="类型"
          rules={[{ required: true, message: '请输入数据源名称!' }]}
        >
          <Select placeholder="Please select a country">
            <Option value={1}>Mysql</Option>
            <Option value={0}>Oracle</Option>
          </Select>
        </Form.Item>

        <Form.Item
          name="jdbcUrl"
          label="JDBC URL"
          rules={[{ required: true, message: '请输入数据源地址!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="username"
          label="账号"
          rules={[{ required: true, message: '请输入账号!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item name="password" label="密码">
          <Input.Password />
        </Form.Item>

        <Form.Item
          name="confirm"
          label="确认密码"
          dependencies={['password']}
          rules={[
            ({ getFieldValue }) => ({
              validator(rule, value) {
                if (getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject('两次输入都密码不相同！');
              },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CreateForm;
