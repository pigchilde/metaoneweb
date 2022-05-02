import { defineConfig } from 'umi';

export default defineConfig({
  locale: {},
  nodeModulesTransform: {
    type: 'none',
  },
  fastRefresh: {},
  proxy: {
    '/api-docs': {
      target: 'http://47.106.90.119:8000/v2',
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
});
