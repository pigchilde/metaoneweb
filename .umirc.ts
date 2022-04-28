import { defineConfig } from 'umi';

export default defineConfig({
  locale: {},
  nodeModulesTransform: {
    type: 'none',
  },
  fastRefresh: {},
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
