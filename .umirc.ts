import { defineConfig } from 'umi';

export default defineConfig({
  locale: {},
  nodeModulesTransform: {
    type: 'none',
  },
  fastRefresh: {},
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
});
