const env = process.env.NODE_ENV || 'development'
const port = process.env.PORT || 3000

function getPublicUrl() {
  if (process.env.PUBLIC_URL) return process.env.PUBLIC_URL
  if (process.env.HEROKU_APP_NAME) return `https://${process.env.HEROKU_APP_NAME}.herokuapp.com`
  return `http://localhost:${port}`
}

module.exports = {
  /** Development server port */
  port,

  /** The environment to use when building the project */
  env,

  /** The full path to the project's root directory */
  basePath: __dirname,

  /** The name of the directory containing the application source code */
  srcDir: 'src',

  /** The file name of the application's entry point */
  main: 'index.js',

  /** The name of the directory in which to emit compiled assets */
  outDir: 'dist',

  /** The name of the reports directory */
  reportDir: 'reports',

  /** The base path for all projects assets (relative to the website root) */
  publicPath: '/',

  /** Whether to generate sourcemaps */
  sourcemaps: true,

  usePreact: !('USE_REACT' in process.env),

  /** A hash map of keys that the compiler should treat as external to the project */
  externals: {},

  /** A hash map of variables and their values to expose globally */
  globals: {
  },

  /** A hash map of environment variables to retrieve and their default values */
  environment: {
    PUBLIC_URL: getPublicUrl(),

    DATAGOUV_API_URL: 'https://inspire.data.gouv.fr/dgv/proxy-api/1',
    DATAGOUV_API_KEY: null,

    PUBLICATION_API_URL: 'https://inspire.data.gouv.fr/dgv/api',
    INSPIRE_API_URL: 'https://inspire.data.gouv.fr/api/geogw',

    PIWIK_URL: null,
    PIWIK_SITE_ID: null
  },

  /** The list of modules to bundle separately from the core application code */
  vendors: [
    'i18next',
    'i18next-browser-languagedetector',
    'marked',
    'moment',
    'piwik-react-router',
    'preact',
    'preact-compat',
    'react-helmet',
    'react-i18next',
    'react-loadable',
    'react-loadable-visibility',
    'react-paginate',
    'react-redux',
    'react-router-dom',
    'reactable',
    'redux',
    'redux-thunk'
  ]
}
