import { defineConfig } from 'umi';

export default defineConfig({
  title: 'MetaOne',
  locale: {
    default: 'en-US',
  },
  nodeModulesTransform: {
    type: 'none',
  },
  chainWebpack: (config) => {
    config.module
      .rule('mp4')
      .test(/\.(mp4|zip)(\?.*)?$/)
      .use('file-loader')
      .loader(require.resolve('file-loader'))
      .options({
        name: 'static/[name].[hash:8].[ext]',
        esModule: false,
      });
  },
  fastRefresh: {},
  hash: true,
  proxy: {
    '/center': {
      // target: 'http://119.8.171.8/', //生产
      target: 'http://47.106.90.119:8000/', //开发
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
