module.exports = {
  test: function (config) {
    return {
      entry: 'webpack.tests.js',
      output: _.assign({}, config.output, {
        // client assets are output to dist/test/
        path: path.join(config.output.path, 'test'),
        publicPath: undefined // no assets CDN
      }),
      loader: 'babel',
      query: {
        presets: ['react']
      },
      devtool: 'inline-source-map', // sourcemap support
      plugins: config.plugins.concat(
        new webpack.DefinePlugin({
          'typeof window': JSON.stringify("object")
        })
      )
    };
  },
};
