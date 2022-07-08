import { defineConfig } from 'umi';

export default defineConfig({
  title: 'MetaOne',
  favicon: '/favicon.ico',
  locale: {
    default: 'en-US',
  },
  // mfsu: {},
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
    config.module
      .rule('woff')
      .test(/.(woff|eot|woff2|otf)$/)
      .use('file-loader')
      .loader('file-loader');
  },
  fastRefresh: {},
  hash: true,
  proxy: {
    '/center': {
      // target: 'http://47.106.90.119:8000',
      target: 'https://metaone.gg',
      changeOrigin: true,
    },
  },
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
