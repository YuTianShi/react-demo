import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons';
import { Avatar, Breadcrumb, Dropdown, Layout, Menu } from 'antd';
import React, { Component } from 'react';
import { Link } from 'umi';
import styles from './Layout.less';

const { Header, Sider, Content } = Layout;

class BasicLayout extends Component {
  state = {
    collapsed: false,
  };

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };

  menu = () => (
    <Menu>
      <Menu.Item>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="http://www.alipay.com/"
        >
          1st menu item
        </a>
      </Menu.Item>
      <Menu.Item>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="http://www.taobao.com/"
        >
          2nd menu item
        </a>
      </Menu.Item>
      <Menu.Item>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="http://www.tmall.com/"
        >
          3rd menu item
        </a>
      </Menu.Item>
    </Menu>
  );

  render() {
    return (
      <Layout>
        <Sider trigger={null} collapsible collapsed={this.state.collapsed}>
          <div className={styles.logo}>LOGO 数据中心</div>
          <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
            <Menu.Item key="1" icon={<UserOutlined />}>
              <Link to="/monitor">监控</Link>
            </Menu.Item>
            <Menu.SubMenu
              key="3"
              icon={<VideoCameraOutlined />}
              title="元数据管理"
            >
              <Menu.Item key="5" icon={<VideoCameraOutlined />}>
                <Link to="/metadata/source">数据源管理</Link>
              </Menu.Item>
              <Menu.Item key="2" icon={<UploadOutlined />}>
                <Link to="/metadata/model">模型管理</Link>
              </Menu.Item>
            </Menu.SubMenu>
            <Menu.Item key="4" icon={<UserOutlined />}>
              <Link to="/user">用户管理</Link>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout className="site-layout">
          <Header style={{ background: '#fff', padding: 0 }}>
            {React.createElement(
              this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
              {
                className: styles.trigger,
                onClick: this.toggle,
              },
            )}
            <Breadcrumb className={styles.breadcrumb}>
              <Breadcrumb.Item>元数据管理</Breadcrumb.Item>
              <Breadcrumb.Item>数据源管理</Breadcrumb.Item>
            </Breadcrumb>
            <Dropdown
              overlay={
                <Menu>
                  <Menu.Item>
                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      href="http://www.alipay.com/"
                    >
                      修改密码
                    </a>
                  </Menu.Item>
                  <Menu.Item>
                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      href="http://www.taobao.com/"
                    >
                      退出登录
                    </a>
                  </Menu.Item>
                </Menu>
              }
              className={styles.userInfo}
              placement="bottomRight"
            >
              <div>
                <Avatar
                  size="small"
                  icon={<UserOutlined />}
                  className={styles.avatar}
                ></Avatar>
                超级管理员
              </div>
            </Dropdown>
          </Header>
          <Content className={styles.content}>{this.props.children}</Content>
        </Layout>
      </Layout>
    );
  }
}

export default BasicLayout;
