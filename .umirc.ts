import { defineConfig } from 'umi';

export default defineConfig({
  title: 'META ONE',
  locale: {
    default: 'en-US',
  },
  nodeModulesTransform: {
    type: 'none',
  },
  fastRefresh: {},
  hash: true,
  proxy: {
    '/center': {
      target: 'http://47.106.90.119:8000',
      changeOrigin: true,
    },
  },
  // mfsu: {},
  sass: {
    prependData: `
    @import "~@/themes/common.scss";
  `,
  },

  theme: {
    'primary-color': '#00cacb',
  },
  targets: {
    ie: 10,
    edge: 12,
    firefox: 42,
  },
});
