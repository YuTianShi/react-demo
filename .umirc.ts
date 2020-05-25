import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  routes: [
    { path: '/login', component: '@/pages/login' },
    { path: '/', redirect: '/metadata/source', exact: true },
    {
      path: '/',
      component: '../layouts/Layout',
      routes: [
        { title: '监控', path: 'monitor', component: '@/pages/monitor' },
        {
          title: '元数据管理',
          path: 'metadata',
          routes: [
            {
              title: '数据源管理',
              path: 'source',
              component: '@/pages/metadata/dataSource',
            },
            {
              title: '模型管理',
              path: 'model',
              component: '@/pages/metadata/dataModel',
            },
          ],
        },
        { title: '用户管理', path: 'user', component: '@/pages/user' },
      ],
    },
  ],
  locale: {
    default: 'zh-CN',
    baseNavigator: true,
  },
});
