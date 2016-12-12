module.exports = {
  plugins: [
    require('postcss-import')(),
    require('postcss-url')(),
    require('postcss-cssnext')(),
    // add your 'plugins' here
    // ...
    // and if you want to compress
    // Disable autoprefixer, because it's already included in cssnext
    // require('cssnano')({ autoprefixer: false }),
    require('postcss-browser-reporter')(),
    require('postcss-reporter')(),
  ]
}
