const path = require("path");
const webpack = require('webpack');
const resolve = dir => path.resolve(__dirname, dir);
const packageName = require(path.join(process.cwd(), 'package.json')).name;
const SRC_PATH = path.join(process.cwd(), 'src');
const CracoLessPlugin = require('craco-less');
const CracoAntDesignPlugin = require('craco-antd');
const AntdDayjsWebpackPlugin = require('antd-dayjs-webpack-plugin');
const FastRefreshCracoPlugin = require('craco-fast-refresh')
const CircularDependencyPlugin = require('circular-dependency-plugin')
const SimpleProgressWebpackPlugin = require('simple-progress-webpack-plugin')
const {
  BundleAnalyzerPlugin
} = require("webpack-bundle-analyzer");
const CompressionWebpackPlugin = require('compression-webpack-plugin');

module.exports = {
  devServer: {
    proxy: {
      '/api': {
        // target: 'http://metacell.extrasky.cn',
        target: 'http://localhost:9101',
        changeOrigin: true,
        pathRewrite: {
          "^/api": '/'
        }
      }
    }
  },
  webpack: {
    configure: (config, {
      env,
      paths
    }) => {
      config.module.rules.push({
        test: /\.svg$/,
        use: ["@svgr/webpack"]
      });
      return config;
    },
    // 设置别名
    alias: {
      '@': resolve("src"),
      'components': resolve("src/components"),
    },
    plugins: [
      new BundleAnalyzerPlugin(),
      new AntdDayjsWebpackPlugin(),
      new SimpleProgressWebpackPlugin(),
      new CircularDependencyPlugin({
        exclude: /node_modules/,
        include: /src/,
        failOnError: true,
        allowAsyncCycles: false,
        cwd: process.cwd()
      }),
      new CompressionWebpackPlugin({
        algorithm: 'gzip',
        test: new RegExp(
          '\\.(' + ['js', 'css'].join('|') +
          ')$'
        ),
        threshold: 1024,
        minRatio: 0.8
      }),
      new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),      
    ]
  },
  babel: {
    plugins: [
      // 支持装饰器
      ['@babel/plugin-proposal-decorators', {
        legacy: true
      }]
    ]
  },
  plugins: [{
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: {
              'hack': `true;@import "${require.resolve('antd/lib/style/color/colorPalette.less')}";`,
              compact: true,
              '@primary-color': '#1DA57A',
            },
            javascriptEnabled: true,
          },
        },
      },
    },
    {
      plugin: CracoAntDesignPlugin,
      options: {
        customizeTheme: {
          '@primary-color': '#1DA57A',
        },
        babelPluginImportOptions: {
          libraryDirectory: 'es',
        },
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: {
              packageName,
            },
          },
        },
        modifyLessRule: function (lessRule, _context) {
          // src 中less交给 CracoLessPlugin 处理
          lessRule.exclude = SRC_PATH;
          return lessRule;
        },
      },
    },
    {
      plugin: FastRefreshCracoPlugin
    },
  ],
}
