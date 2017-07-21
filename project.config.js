const env = process.env.NODE_ENV || 'development'
const port = process.env.PORT || 3000

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

  /** A hash map of keys that the compiler should treat as external to the project */
  externals: {},

  /** A hash map of variables and their values to expose globally */
  globals: {
  },

  /** A hash map of environment variables to retrieve and their default values */
  environment: {
    PUBLIC_URL: `http://localhost:${port}`,

    INSPIRE_DATAGOUV_API_URL: 'https://next.data.gouv.fr/api',
    INSPIRE_DATAGOUV_API_KEY: null,

    PIWIK_URL: null,
    PIWIK_SITE_ID: null
  },

  /** The list of modules to bundle separately from the core application code */
  vendors: [
    'marked',
    'moment',
    'piwik-react-router',
    'preact',
    'preact-compat',
    'qs',
    'react-chartjs-2',
    'react-document-title',
    'react-leaflet',
    'react-paginate',
    'react-router',
    'react-router-scroll',
    'react-sticky',
    'reactable'
  ]
}
